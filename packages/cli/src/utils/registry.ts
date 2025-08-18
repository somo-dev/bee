import path from 'path';
import { promises as fs } from 'fs';
import { Config } from './get-config.js';

export type RegistryEntry = {
  name: string;
  type: 'components:ui' | 'components:component' | 'components:example';
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: Array<{
    name: string;
    content: string;
  }>;
};

export async function getRegistryIndex(): Promise<Array<{ name: string; type: string }>> {
  try {
    // Read from the registry index file
    const registryPath = path.join(process.cwd(), 'registry', 'index.json');
    const registryContent = await fs.readFile(registryPath, 'utf-8');
    const registry = JSON.parse(registryContent);
    
    return registry.map((entry: any) => ({
      name: entry.name,
      type: entry.type
    }));
  } catch (error) {
    console.error('Error reading registry:', error);
    return [];
  }
}

export async function fetchTree(
  style: string,
  components: string[]
): Promise<RegistryEntry[]> {
  const results: RegistryEntry[] = [];
  
  for (const componentName of components) {
    try {
      // Read component from registry
      const componentPath = path.join(process.cwd(), 'registry', 'styles', style, `${componentName}.json`);
      const componentContent = await fs.readFile(componentPath, 'utf-8');
      const component = JSON.parse(componentContent);
      
      results.push(component);
    } catch (error) {
      console.error(`Error reading component ${componentName}:`, error);
    }
  }
  
  return results;
}

export async function getItemTargetPath(
  config: Config,
  item: RegistryEntry,
  override?: string
): Promise<string | null> {
  if (override) {
    return override;
  }

  const componentsPath = config.aliases.components;
  const targetPath = path.resolve(process.cwd(), componentsPath.replace('@/', './src/'));
  
  return targetPath;
}
