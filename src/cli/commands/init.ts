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
      const config = await promptForConfig(cwd, existingConfig, opts.defaults);

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
  const highlight = (text: string) => chalk.cyan(text);

  const options = await prompts([
    {
      type: "toggle",
      name: "typescript",
      message: `Would you like to use ${highlight(
        "TypeScript"
      )} (recommended)?`,
      initial: defaultConfig?.typescript ?? true,
      active: "yes",
      inactive: "no",
    },
    {
      type: "select",
      name: "style",
      message: `Which ${highlight("style")} would you like to use?`,
      choices: [
        { title: "Default", value: "default" },
        { title: "New York", value: "new-york" },
      ],
      initial: 0,
    },
    {
      type: "select",
      name: "tailwindBaseColor",
      message: `Which color would you like to use as ${highlight(
        "base color"
      )}?`,
      choices: [
        { title: "Slate", value: "slate" },
        { title: "Gray", value: "gray" },
        { title: "Zinc", value: "zinc" },
        { title: "Neutral", value: "neutral" },
        { title: "Stone", value: "stone" },
      ],
      initial: 0,
    },
    {
      type: "text",
      name: "tailwindCss",
      message: `Where is your ${highlight("global CSS")} file?`,
      initial: defaultConfig?.tailwind?.css ?? "./src/app/globals.css",
    },
    {
      type: "toggle",
      name: "tailwindCssVariables",
      message: `Would you like to use ${highlight(
        "CSS variables"
      )} for colors?`,
      initial: defaultConfig?.tailwind?.cssVariables ?? true,
      active: "yes",
      inactive: "no",
    },
    {
      type: "text",
      name: "tailwindPrefix",
      message: `Are you using a custom ${highlight(
        "tailwind prefix eg. tw-"
      )}? (Leave blank if not)`,
      initial: "",
    },
    {
      type: "text",
      name: "tailwindConfig",
      message: `Where is your ${highlight("tailwind.config.js")} located?`,
      initial: defaultConfig?.tailwind?.config ?? "./tailwind.config.js",
    },
    {
      type: "text",
      name: "components",
      message: `Configure the import alias for ${highlight("components")}?`,
      initial: defaultConfig?.aliases?.components ?? "@/components",
    },
    {
      type: "text",
      name: "utils",
      message: `Configure the import alias for ${highlight("utils")}?`,
      initial: defaultConfig?.aliases?.utils ?? "@/lib/utils",
    },
  ]);

  const config = rawConfigSchema.parse({
    $schema: "https://ui.shadcn.com/schema.json",
    style: options.style,
    rsc: true,
    typescript: options.typescript,
    tailwind: {
      config: options.tailwindConfig,
      css: options.tailwindCss,
      baseColor: options.tailwindBaseColor,
      cssVariables: options.tailwindCssVariables,
      prefix: options.tailwindPrefix || "",
    },
    aliases: {
      components: options.components,
      utils: options.utils,
    },
  });

  if (!skip) {
    const { proceed } = await prompts({
      type: "confirm",
      name: "proceed",
      message: `Write configuration to ${highlight(
        "components.json"
      )}. Proceed?`,
      initial: true,
    });

    if (!proceed) {
      process.exit(0);
    }
  }

  // Write components.json.
  logger.info("");
  const spinner = ora(`Writing components.json...`).start();
  const targetPath = path.resolve(cwd, "components.json");
  await fs.writeFile(targetPath, JSON.stringify(config, null, 2), "utf8");
  spinner.succeed();

  return config;
}

export async function runInit(cwd: string, config: Config) {
  const spinner = ora(`Initializing project...`)?.start();

  // Ensure all directories exist.
  for (const [key, resolvedPath] of Object.entries(config.resolvedPaths)) {
    // Determine if the path is a file or directory.
    // TODO: is there a better way to do this?
    let dirname = path.extname(resolvedPath as string)
      ? path.dirname(resolvedPath as string)
      : resolvedPath as string;

    // If the utils alias is set to something like "@/lib/utils",
    // assume this is a file and remove the "utils" file name.
    // TODO: In future releases we should add support for individual utils.
    if (key === "utils" && (resolvedPath as string).endsWith("/utils")) {
      // Remove /utils at the end.
      dirname = (dirname as string).replace(/\/utils$/, "");
    }

    if (!existsSync(dirname)) {
      await fs.mkdir(dirname, { recursive: true });
    }
  }

  const extension = config.typescript ? "ts" : "js";

  // Write tailwind config.
  await fs.writeFile(
    config.resolvedPaths.tailwindConfig,
    getTailwindConfig({
      typescript: config.typescript,
      tailwindCssVariables: config.tailwind.cssVariables,
      tailwindPrefix: config.tailwind.prefix,
    }),
    "utf8"
  );

  // Write css file.
  const baseColor = config.tailwind.baseColor || "slate";
  await fs.writeFile(
    config.resolvedPaths.tailwindCss,
    getBaseStyles(baseColor, config.tailwind.cssVariables),
    "utf8"
  );

  // Write cn file.
  await fs.writeFile(
    `${config.resolvedPaths.utils}.${extension}`,
    getUtilsConfig(config.typescript),
    "utf8"
  );

  spinner?.succeed();

  // Install dependencies.
  const dependenciesSpinner = ora(`Installing dependencies...`)?.start();
  const packageManager = await getPackageManager(cwd);

  // TODO: add support for other icon libraries.
  const deps = [
    ...PROJECT_DEPENDENCIES,
    config.style === "new-york" ? "@radix-ui/react-icons" : "lucide-react",
  ];

  await execa(
    packageManager,
    [packageManager === "npm" ? "install" : "add", ...deps],
    {
      cwd,
    }
  );
  dependenciesSpinner?.succeed();
}

function getTailwindConfig({
  typescript,
  tailwindCssVariables,
  tailwindPrefix,
}: {
  typescript: boolean;
  tailwindCssVariables: boolean;
  tailwindPrefix: string;
}) {
  const config = `import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{${typescript ? "ts,tsx" : "js,jsx"}}',
    './components/**/*.{${typescript ? "ts,tsx" : "js,jsx"}}',
    './app/**/*.{${typescript ? "ts,tsx" : "js,jsx"}}',
    './src/**/*.{${typescript ? "ts,tsx" : "js,jsx"}}',
  ],
  prefix: "${tailwindPrefix}",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      ${
        tailwindCssVariables
          ? `colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },`
          : ""
      }
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config`;

  return config;
}

function getBaseStyles(baseColor: string, cssVariables: boolean) {
  if (!cssVariables) {
    return `@tailwind base;
@tailwind components;
@tailwind utilities;
`;
  }

  return `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 84% 4.9%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 94.1%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}`;
}

function getUtilsConfig(typescript: boolean) {
  const extension = typescript ? "ts" : "js";

  if (!typescript) {
    return `import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
`;
  }

  return `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`;
}
