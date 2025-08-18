import { Config } from '../get-config.js';

export interface TransformOpts {
  filename: string;
  raw: string;
  config: Config;
  baseColor?: string;
}

export async function transform(opts: TransformOpts): Promise<string> {
  let content = opts.raw;

  // Transform imports based on config
  if (opts.config.aliases.utils) {
    content = content.replace(
      /from ["']@\/lib\/utils["']/g,
      `from "${opts.config.aliases.utils}"`
    );
  }

  if (opts.config.aliases.components) {
    content = content.replace(
      /from ["']@\/components/g,
      `from "${opts.config.aliases.components}`
    );
  }

  // Handle TypeScript/JavaScript
  if (!opts.config.typescript) {
    content = content.replace(/: React\.FC<.*?>/g, '');
    content = content.replace(/interface \w+Props \{[\s\S]*?\}/g, '');
    content = content.replace(/import.*?from ['"]react['"];?\n?/g, "import React from 'react';\n");
  }

  return content;
}