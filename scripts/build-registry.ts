import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function buildRegistry() {
  const srcDir = path.join(__dirname, '../packages/components/src');
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

    // Extract dependencies from the component file
    const dependencies = extractDependencies(content);
    
    // Create registry entry
    const registryEntry = {
      name: componentName.toLowerCase().replace(/([A-Z])/g, '-$1').toLowerCase(),
      type: 'components:ui',
      dependencies: dependencies,
      devDependencies: [],
      files: [
        {
          name: `${componentName.toLowerCase().replace(/([A-Z])/g, '-$1').toLowerCase()}.tsx`,
          content: transformContent(content, componentName)
        }
      ]
    };

    // Write component registry file
    await fs.writeFile(
      path.join(stylesDir, `${componentName.toLowerCase().replace(/([A-Z])/g, '-$1').toLowerCase()}.json`),
      JSON.stringify(registryEntry, null, 2)
    );

    registryIndex.push({
      name: registryEntry.name,
      type: registryEntry.type
    });
  }

  // Write registry index
  await fs.writeFile(
    path.join(registryDir, 'index.json'),
    JSON.stringify(registryIndex, null, 2)
  );

  console.log(`Registry built successfully with ${registryIndex.length} components`);
}

function extractDependencies(content: string): string[] {
  const dependencies = [];
  
  // Check for common dependencies
  if (content.includes('lucide-react')) dependencies.push('lucide-react');
  if (content.includes('clsx')) dependencies.push('clsx');
  if (content.includes('react-colorful')) dependencies.push('react-colorful');
  if (content.includes('@radix-ui/react-slot')) dependencies.push('@radix-ui/react-slot');
  if (content.includes('class-variance-authority')) dependencies.push('class-variance-authority');
  
  return dependencies;
}

function transformContent(content: string, componentName: string): string {
  // Transform the content to work in the target project
  // This could include updating import paths, etc.
  return content;
}

buildRegistry().catch(console.error);