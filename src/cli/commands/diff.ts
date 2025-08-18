import { Command } from "commander";
import { handleError } from "../utils/handle-error.js";

export const diff = new Command()
  .name("diff")
  .description("check for updates against the registry")
  .argument("[component]", "the component name")
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .action(async (name, opts) => {
    try {
      // TODO: Implement diff functionality
      console.log("Diff functionality coming soon...");
    } catch (error) {
      handleError(error);
    }
  });
