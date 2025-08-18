import { existsSync, promises as fs } from "fs";
import path from "path";
import { z } from "zod";

const rawConfigSchema = z.object({
  $schema: z.string().optional(),
  style: z.string().default("default"),
  rsc: z.boolean().default(false),
  tsx: z.boolean().default(false),
  typescript: z.boolean().default(false),
  tailwind: z.object({
    config: z.string().default("./tailwind.config.js"),
    css: z.string().default("./src/app/globals.css"),
    baseColor: z.string().default("slate"),
    cssVariables: z.boolean().default(true),
    prefix: z.string().default(""),
  }),
  aliases: z.object({
    components: z.string().default("@/components"),
    utils: z.string().default("@/lib/utils"),
  }),
});

const configSchema = rawConfigSchema.extend({
  resolvedPaths: z.object({
    tailwindConfig: z.string(),
    tailwindCss: z.string(),
    utils: z.string(),
  }),
});

export type Config = z.infer<typeof configSchema>;
export type RawConfig = z.infer<typeof rawConfigSchema>;

export async function getConfig(cwd: string): Promise<Config | null> {
  const configPath = path.join(cwd, "components.json");

  if (!existsSync(configPath)) {
    return null;
  }

  try {
    const configContent = await fs.readFile(configPath, "utf8");
    const config = rawConfigSchema.parse(JSON.parse(configContent));
    return await resolveConfigPaths(cwd, config);
  } catch (error) {
    console.error("Error reading config:", error);
    return null;
  }
}

export async function resolveConfigPaths(
  cwd: string,
  config: RawConfig
): Promise<Config> {
  const resolvedPaths = {
    tailwindConfig: path.resolve(cwd, config.tailwind.config),
    tailwindCss: path.resolve(cwd, config.tailwind.css),
    utils: path.resolve(cwd, config.aliases.utils),
  };

  return {
    ...config,
    resolvedPaths,
  };
}
