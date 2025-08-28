import { defineConfig } from 'tsup';
import { copy } from 'fs-extra';
import path from 'path';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  outDir: 'dist',
  clean: true,
  onSuccess: async () => {
    // Copy CSS files to dist
    await copy('src/styles.css', 'dist/styles.css');
  },
});


