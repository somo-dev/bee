import { Command } from "commander";
import chalk from "chalk";
import { logger } from "../utils/logger.js";

export const diff = new Command()
  .name("diff")
  .description("check for updates to components")
  .action(async () => {
    logger.info(chalk.yellow("Diff functionality coming soon!"));
    logger.info("This will show differences between installed and latest versions.");
  });
