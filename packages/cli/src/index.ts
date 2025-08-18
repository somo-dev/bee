#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import { init } from "./commands/init.js";
import { add } from "./commands/add.js";
import { diff } from "./commands/diff.js";
import { getPackageInfo } from "./utils/get-package-info.js";

process.on("SIGINT", process.exit);
process.on("SIGTERM", process.exit);

async function main() {
  const packageInfo = await getPackageInfo();

  const program = new Command()
    .name("beeui")
    .description("Add components and dependencies to your project")
    .version(
      packageInfo.version || "1.0.0",
      "-v, --version",
      "display the version number"
    );

  program.addCommand(init).addCommand(add).addCommand(diff);

  program.parse();
}

main();
