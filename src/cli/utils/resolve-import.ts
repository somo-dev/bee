import path from 'path';
import { LoadedConfig } from 'tsconfig-paths';

export async function resolveImport(
  importPath: string,
  config: LoadedConfig
): Promise<string> {
  if (config.resultType === 'failed' || !config.paths) {
    return importPath;
  }

  for (const [alias, paths] of Object.entries(config.paths)) {
    const aliasPattern = alias.replace('/*', '');
    
    if (importPath.startsWith(aliasPattern)) {
      const relativePath = importPath.replace(aliasPattern, '');
      const resolvedPath = paths[0]?.replace('/*', '') || '';
      
      return path.resolve(config.absoluteBaseUrl, resolvedPath, relativePath);
    }
  }

  return importPath;
}