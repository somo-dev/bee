import { existsSync, promises as fs } from "fs";
import path from "path";
import chalk from "chalk";
import { Command } from "commander";
import { execa } from "execa";
import ora from "ora";
import prompts from "prompts";

import {
  getConfig,
  rawConfigSchema,
  resolveConfigPaths,
  type Config,
} from "../utils/get-config.js";
import { getPackageManager } from "../utils/get-package-manager.js";
import { handleError } from "../utils/handle-error.js";
import { logger } from "../utils/logger.js";

const PROJECT_DEPENDENCIES = [
  "lucide-react",
  "clsx",
  "tailwind-merge",
  "class-variance-authority",
  "@radix-ui/react-slot",
];

export const init = new Command()
  .name("init")
  .description("initialize your project and install dependencies")
  .option("-y, --yes", "skip confirmation prompt.", false)
  .option("-d, --defaults,", "use default configuration.", false)
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .action(async (opts) => {
    try {
      const cwd = path.resolve(opts.cwd);

      // Ensure target directory exists.
      if (!existsSync(cwd)) {
        logger.error(`The path ${cwd} does not exist. Please try again.`);
        process.exit(1);
      }

      // Read config.
      const existingConfig = await getConfig(cwd);
      const rawConfig = await promptForConfig(cwd, existingConfig, opts.defaults);
      const config = await resolveConfigPaths(cwd, rawConfig);

      await runInit(cwd, config);

      logger.info("");
      logger.info(
        `${chalk.green("Success!")} Project initialization completed.`
      );
      logger.info("");
    } catch (error) {
      handleError(error);
    }
  });

export async function promptForConfig(
  cwd: string,
  defaultConfig: Config | null = null,
  skip = false
) {
  if (skip) {
    return {
      style: "default",
      rsc: false,
      tsx: false,
      typescript: true,
      tailwind: {
        config: "./tailwind.config.js",
        css: "./src/app/globals.css",
        baseColor: "slate",
        cssVariables: true,
        prefix: "",
      },
      aliases: {
        components: "@/components",
        utils: "@/lib/utils",
      },
    };
  }

  const spinner = ora("Setting up project...").start();

  const config = await prompts([
    {
      type: "select",
      name: "style",
      message: "Which style would you like to use?",
      choices: [
        { title: "Default", value: "default" },
        { title: "New York", value: "new-york" },
      ],
      initial: defaultConfig?.style === "new-york" ? 1 : 0,
    },
    {
      type: "confirm",
      name: "typescript",
      message: "Would you like to use TypeScript (recommended)?",
      initial: defaultConfig?.typescript ?? true,
    },
    {
      type: "confirm",
      name: "tailwindCssVariables",
      message: "Would you like to use CSS variables for colors?",
      initial: defaultConfig?.tailwind.cssVariables ?? true,
    },
    {
      type: "text",
      name: "tailwindConfig",
      message: "Where is your global CSS file?",
      initial: defaultConfig?.tailwind.config ?? "./tailwind.config.js",
    },
    {
      type: "text",
      name: "tailwindCss",
      message: "Where is your global CSS file?",
      initial: defaultConfig?.tailwind.css ?? "./src/app/globals.css",
    },
    {
      type: "text",
      name: "components",
      message: "Configure the import alias for components:",
      initial: defaultConfig?.aliases.components ?? "@/components",
    },
    {
      type: "text",
      name: "utils",
      message: "Configure the import alias for utils:",
      initial: defaultConfig?.aliases.utils ?? "@/lib/utils",
    },
  ]);

  spinner.succeed();

  return {
    style: config.style,
    rsc: false,
    tsx: false,
    typescript: config.typescript,
    tailwind: {
      config: config.tailwindConfig,
      css: config.tailwindCss,
      baseColor: "slate",
      cssVariables: config.tailwindCssVariables,
      prefix: "",
    },
    aliases: {
      components: config.components,
      utils: config.utils,
    },
  };
}

export async function runInit(cwd: string, config: Config) {
  const spinner = ora(`Initializing project...`)?.start();

  // Ensure all directories exist.
  for (const [key, resolvedPath] of Object.entries(config.resolvedPaths)) {
    // Determine if the path is a file or directory.
    let dirname = path.extname(resolvedPath)
      ? path.dirname(resolvedPath)
      : resolvedPath;

    // If the utils alias is set to something like "@/lib/utils",
    // assume this is a file and remove the "utils" file name.
    if (key === "utils" && resolvedPath.endsWith("/utils")) {
      // Remove /utils at the end.
      dirname = dirname.replace(/\/utils$/, "");
    }

    if (!existsSync(dirname)) {
      await fs.mkdir(dirname, { recursive: true });
    }
  }

  const extension = config.typescript ? "ts" : "js";

  // Write components.json
  await fs.writeFile(
    path.join(cwd, "components.json"),
    JSON.stringify(
      {
        $schema: "https://bee-ui.com/schema.json",
        style: config.style,
        rsc: config.rsc,
        tsx: config.tsx,
        typescript: config.typescript,
        tailwind: config.tailwind,
        aliases: config.aliases,
      },
      null,
      2
    ),
    "utf8"
  );

  spinner?.succeed();

  // Install dependencies.
  const dependenciesSpinner = ora(`Installing dependencies...`)?.start();
  const packageManager = await getPackageManager(cwd);

  await execa(
    packageManager,
    [
      packageManager === "npm" ? "install" : "add",
      ...PROJECT_DEPENDENCIES,
    ],
    {
      cwd,
    }
  );

  dependenciesSpinner?.succeed();
}
