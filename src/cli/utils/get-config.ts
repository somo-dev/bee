import { promises as fs } from 'fs';
import path from 'path';
import { z } from 'zod';
import { loadConfig } from 'tsconfig-paths';
import { resolveImport } from './resolve-import.js';

export const DEFAULT_STYLE = 'default';
export const DEFAULT_COMPONENTS = '@/components';
export const DEFAULT_UTILS = '@/lib/utils';
export const DEFAULT_TAILWIND_CSS = './src/app/globals.css';
export const DEFAULT_TAILWIND_CONFIG = './tailwind.config.js';
export const DEFAULT_TAILWIND_BASE_COLOR = 'slate';

// TODO: Figure out if we want to support all cosmiconfig formats.
// A simple components.json file would be nice.
export const rawConfigSchema = z
  .object({
    $schema: z.string().optional(),
    style: z.string(),
    typescript: z.coerce.boolean().default(true),
    rsc: z.coerce.boolean().default(false),
    tsx: z.coerce.boolean().default(true),
    tailwind: z.object({
      config: z.string(),
      css: z.string(),
      baseColor: z.string().default(DEFAULT_TAILWIND_BASE_COLOR),
      cssVariables: z.boolean().default(true),
      prefix: z.string().default('').optional(),
    }),
    aliases: z.object({
      components: z.string(),
      utils: z.string(),
    }),
  })
  .strict();

export type RawConfig = z.infer<typeof rawConfigSchema>;

export const configSchema = rawConfigSchema.extend({
  resolvedPaths: z.object({
    tailwindConfig: z.string(),
    tailwindCss: z.string(),
    utils: z.string(),
    components: z.string(),
  }),
});

export type Config = z.infer<typeof configSchema>;

export async function getConfig(cwd: string): Promise<Config | null> {
  const config = await getRawConfig(cwd);

  if (!config) {
    return null;
  }

  return await resolveConfigPaths(cwd, config);
}

export async function resolveConfigPaths(
  cwd: string,
  config: RawConfig
): Promise<Config> {
  // Read tsconfig.json.
  const tsConfig = loadConfig(cwd);

  if (tsConfig.resultType === 'failed') {
    throw new Error(
      `Failed to load tsconfig.json. ${tsConfig.message ?? ''}`.trim()
    );
  }

  return configSchema.parse({
    ...config,
    resolvedPaths: {
      tailwindConfig: path.resolve(cwd, config.tailwind.config),
      tailwindCss: path.resolve(cwd, config.tailwind.css),
      utils: await resolveImport(config.aliases['utils'], tsConfig),
      components: await resolveImport(config.aliases['components'], tsConfig),
    },
  });
}

export async function getRawConfig(cwd: string): Promise<RawConfig | null> {
  try {
    const configPath = path.resolve(cwd, 'components.json');

    if (!existsSync(configPath)) {
      return null;
    }

    const configContent = await fs.readFile(configPath, 'utf8');
    const config = JSON.parse(configContent);

    return rawConfigSchema.parse(config);
  } catch (error) {
    throw new Error(`Invalid configuration found in ${cwd}/components.json.`);
  }
}

function existsSync(filePath: string): boolean {
  try {
    return require('fs').existsSync(filePath);
  } catch {
    return false;
  }
}