import chalk from "chalk";

export function handleError(error: unknown) {
  if (error instanceof Error) {
    console.error(chalk.red("Error:"), error.message);
    if (error.stack) {
      console.error(chalk.gray(error.stack));
    }
  } else {
    console.error(chalk.red("An unknown error occurred:"), error);
  }
  process.exit(1);
}
