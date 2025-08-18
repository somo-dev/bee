import { existsSync, promises as fs } from "fs";
import path from "path";
import { Command } from "commander";
import { execa } from "execa";
import ora from "ora";
import prompts from "prompts";
import chalk from "chalk";

import { getConfig } from "../utils/get-config.js";
import { getPackageManager } from "../utils/get-package-manager.js";
import { handleError } from "../utils/handle-error.js";
import { logger } from "../utils/logger.js";
import {
  fetchTree,
  getItemTargetPath,
  getRegistryIndex,
} from "../utils/registry.js";
import { transform } from "../utils/transformers/index.js";

export const add = new Command()
  .name("add")
  .description("add a component to your project")
  .argument("[components...]", "the components to add")
  .option("-y, --yes", "skip confirmation prompt.", true)
  .option("-o, --overwrite", "overwrite existing files.", false)
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .option("-a, --all", "add all available components", false)
  .option("-p, --path <path>", "the path to add the component to.")
  .action(async (components, opts) => {
    try {
      const cwd = path.resolve(opts.cwd);

      if (!existsSync(cwd)) {
        logger.error(`The path ${cwd} does not exist. Please try again.`);
        process.exit(1);
      }

      const config = await getConfig(cwd);
      if (!config) {
        logger.warn(
          `Configuration is missing. Please run ${chalk.green(
            `init`
          )} to create a components.json file.`
        );
        process.exit(1);
      }

      const registryIndex = await getRegistryIndex();

      let selectedComponents = opts.all
        ? registryIndex.map((entry: any) => entry.name)
        : components;

      if (!selectedComponents?.length) {
        const { components } = await prompts({
          type: "multiselect",
          name: "components",
          message: "Which components would you like to add?",
          hint: "Space to select. A to toggle all. Enter to submit.",
          instructions: false,
          choices: registryIndex.map((entry: any) => ({
            title: entry.name,
            value: entry.name,
            selected: opts.all ? true : false,
          })),
        });
        selectedComponents = components;
      }

      if (!selectedComponents?.length) {
        logger.warn("No components selected. Exiting.");
        process.exit(0);
      }

      const tree = await fetchTree(config.style, selectedComponents);
      const payload = tree.filter((item: any) =>
        selectedComponents.includes(item.name)
      );

      if (!payload.length) {
        logger.warn("Selected components not found. Exiting.");
        process.exit(0);
      }

      if (!opts.yes) {
        const { proceed } = await prompts({
          type: "confirm",
          name: "proceed",
          message: `Ready to install components and dependencies. Proceed?`,
          initial: true,
        });

        if (!proceed) {
          process.exit(0);
        }
      }

      const spinner = ora(`Installing components...`).start();
      for (const item of payload) {
        spinner.text = `Installing ${item.name}...`;
        const targetDir = await getItemTargetPath(
          config,
          item,
          opts.path ? path.resolve(cwd, opts.path) : undefined
        );

        if (!targetDir) {
          continue;
        }

        if (!existsSync(targetDir)) {
          await fs.mkdir(targetDir, { recursive: true });
        }

        const existingComponent = item.files.filter((file: any) =>
          existsSync(path.resolve(targetDir, file.name))
        );

        if (existingComponent.length && !opts.overwrite) {
          if (selectedComponents.includes(item.name)) {
            spinner.stop();
            const { overwrite } = await prompts({
              type: "confirm",
              name: "overwrite",
              message: `Component ${item.name} already exists. Would you like to overwrite?`,
              initial: false,
            });

            if (!overwrite) {
              logger.info(
                `Skipped ${item.name}. To overwrite, run with the ${chalk.green(
                  "--overwrite"
                )} flag.`
              );
              continue;
            }

            spinner.start(`Installing ${item.name}...`);
          }
        }

        for (const file of item.files) {
          let filePath = path.resolve(targetDir, file.name);

          // Run transformers.
          const content = await transform({
            filename: file.name,
            raw: file.content,
            config,
            baseColor: config.tailwind.baseColor,
          });

          if (!config.typescript) {
            filePath = filePath.replace(/\.ts$/, ".js");
            filePath = filePath.replace(/\.tsx$/, ".jsx");
          }

          await fs.writeFile(filePath, content);
        }

        const packageManager = await getPackageManager(cwd);

        // Install dependencies.
        if (item.dependencies?.length) {
          await execa(
            packageManager,
            [
              packageManager === "npm" ? "install" : "add",
              ...item.dependencies,
            ],
            {
              cwd,
            }
          );
        }

        // Install devDependencies.
        if (item.devDependencies?.length) {
          await execa(
            packageManager,
            [
              packageManager === "npm" ? "install" : "add",
              packageManager === "npm" ? "--save-dev" : "--dev",
              ...item.devDependencies,
            ],
            {
              cwd,
            }
          );
        }
      }
      spinner.succeed(`Done.`);
    } catch (error) {
      handleError(error);
    }
  });
