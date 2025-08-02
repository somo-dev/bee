import path from 'path';
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

export async function getRegistryIndex(): Promise<Array<{ name: string }>> {
  // This would typically fetch from a remote registry
  // For now, return the components we have
  return [
    { name: 'button' },
    { name: 'input' },
    { name: 'textarea' },
    { name: 'select' },
    { name: 'checkbox' },
    { name: 'radio' },
    { name: 'slider' },
    { name: 'switch' },
    { name: 'card' },
    { name: 'table' },
    { name: 'file-input' },
    { name: 'json-input' },
    { name: 'color-picker' },
    { name: 'progress-bar' },
    { name: 'skeleton' },
    { name: 'toaster' },
    { name: 'drawer' },
    { name: 'breadcrumbs' },
    { name: 'pagination' },
    { name: 'accordion' },
    { name: 'timeline' },
    { name: 'transfer-list' },
    { name: 'segmented-control' },
    { name: 'table-of-contents' },
    { name: 'image' },
  ];
}

export async function fetchTree(
  style: string,
  components: string[]
): Promise<RegistryEntry[]> {
  // This would typically fetch from a remote registry
  // For now, return mock data
  return components.map(name => ({
    name,
    type: 'components:ui' as const,
    dependencies: ['lucide-react', 'clsx'],
    files: [
      {
        name: `${name}.tsx`,
        content: `// ${name} component code would be here`
      }
    ]
  }));
}

export async function getItemTargetPath(
  config: Config,
  item: RegistryEntry,
  override?: string
) {
  if (override) {
    return override;
  }

  if (item.type === 'components:ui') {
    return config.resolvedPaths.components;
  }

  return config.resolvedPaths.components;
}