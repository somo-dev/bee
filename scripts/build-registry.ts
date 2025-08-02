import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function buildRegistry() {
  const srcDir = path.join(__dirname, '../src/lib/components');
  const registryDir = path.join(__dirname, '../registry');
  const stylesDir = path.join(registryDir, 'styles/default');

  // Ensure registry directories exist
  await fs.mkdir(stylesDir, { recursive: true });

  // Get all component directories
  const componentDirs = await fs.readdir(srcDir, { withFileTypes: true });
  const components = componentDirs
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const registryIndex = [];

  for (const componentName of components) {
    const componentDir = path.join(srcDir, componentName);
    const componentFiles = await fs.readdir(componentDir);
    
    // Find the main component file
    const mainFile = componentFiles.find(file => 
      file === `${componentName}.tsx` || 
      file === `index.tsx` ||
      file.endsWith('.tsx')
    );

    if (!mainFile) continue;

    const filePath = path.join(componentDir, mainFile);
    const content = await fs.readFile(filePath, 'utf-8');

    // Create registry entry
    const registryEntry = {
      name: componentName.toLowerCase(),
      type: 'components:ui',
      dependencies: extractDependencies(content),
      files: [
        {
          name: `${componentName.toLowerCase()}.tsx`,
          content: transformContent(content, componentName)
        }
      ]
    };

    // Write component registry file
    await fs.writeFile(
      path.join(stylesDir, `${componentName.toLowerCase()}.json`),
      JSON.stringify(registryEntry, null, 2)
    );

    registryIndex.push({
      name: componentName.toLowerCase(),
      type: 'components:ui'
    });
  }

  // Write registry index
  await fs.writeFile(
    path.join(registryDir, 'index.json'),
    JSON.stringify(registryIndex, null, 2)
  );

  console.log(`✅ Built registry with ${registryIndex.length} components`);
}

function extractDependencies(content: string): string[] {
  const deps = new Set<string>();
  
  // Extract lucide-react imports
  if (content.includes('from \'lucide-react\'')) {
    deps.add('lucide-react');
  }
  
  // Extract other common dependencies
  if (content.includes('react-colorful')) {
    deps.add('react-colorful');
  }
  
  // Always include clsx for className utilities
  deps.add('clsx');
  
  return Array.from(deps);
}

function transformContent(content: string, componentName: string): string {
  // Transform imports to use relative paths
  let transformed = content
    .replace(/from '\.\.\/\.\.\/utils\/cn'/g, "from '@/lib/utils'")
    .replace(/from '\.\.\/\.\.\/types\/common'/g, "from '@/lib/types'")
    .replace(/from '\.\/.*\.types'/g, `from './${componentName.toLowerCase()}.types'`)
    .replace(/from '\.\/.*\.styles'/g, `from './${componentName.toLowerCase()}.styles'`);

  return transformed;
}

buildRegistry().catch(console.error);