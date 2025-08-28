#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { getPackageManager } from '../utils/get-package-manager.js';
import { getConfig } from '../utils/get-config.js';
import { logger } from '../utils/logger.js';

export const add = new Command()
  .name('add')
  .description('Add a component to your project')
  .argument('[components...]', 'The components to add')
  .option('-y, --yes', 'Skip confirmation prompt')
  .option('-o, --overwrite', 'Overwrite existing files')
  .action(async (components: string[], options: { yes?: boolean; overwrite?: boolean }) => {
    try {
      const spinner = ora('Setting up components...').start();

      // Get package manager
      const packageManager = getPackageManager(process.cwd());
      spinner.text = `Using ${packageManager}...`;

      // Get project configuration
      const config = await getConfig(process.cwd());
      if (!config) {
        spinner.fail('No configuration found. Please run `beeui init` first.');
        process.exit(1);
      }

      // If no components specified, show available ones
      if (components.length === 0) {
        spinner.stop();
        console.log(chalk.blue('\nAvailable components:'));
        console.log(chalk.gray('Run `beeui add <component-name>` to add a component\n'));
        
        const availableComponents = [
          'button', 'input', 'card', 'checkbox', 'radio', 'select',
          'textarea', 'switch', 'slider', 'progress-bar', 'accordion',
          'drawer', 'table', 'pagination', 'breadcrumbs', 'skeleton',
          'toaster', 'timeline', 'image', 'file-input', 'color-picker'
        ];

        availableComponents.forEach(component => {
          console.log(`  ${chalk.cyan(component)}`);
        });
        
        return;
      }

      // Process each component
      for (const componentName of components) {
        spinner.text = `Adding ${componentName}...`;
        
        try {
          await addComponent(componentName, config, options.overwrite);
          spinner.succeed(`Added ${componentName}`);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          spinner.fail(`Failed to add ${componentName}: ${errorMessage}`);
        }
      }

      spinner.succeed('Components added successfully!');
      
      // Show next steps
      console.log(chalk.blue('\nNext steps:'));
      console.log(chalk.gray('1. Your components are now in the bee_components folder'));
      console.log(chalk.gray('2. Import and use them in your project:'));
      console.log(chalk.cyan(`   import { ${components.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(', ')} } from './bee_components/${components[0]}'`));
      console.log(chalk.gray('3. Make sure Tailwind CSS is configured in your project'));

    } catch (error) {
      logger.error('Failed to add components', error);
      process.exit(1);
    }
  });

async function addComponent(
  componentName: string,
  config: any,
  overwrite: boolean = false
) {
  // Create bee_components directory in project root
  const beeComponentsDir = path.join(process.cwd(), 'bee_components');
  const componentPath = path.join(beeComponentsDir, componentName);

  // Create bee_components directory if it doesn't exist
  await fs.ensureDir(beeComponentsDir);

  // Check if component already exists
  if (await fs.pathExists(componentPath) && !overwrite) {
    throw new Error(`Component ${componentName} already exists. Use --overwrite to replace.`);
  }

  // Create component directory
  await fs.ensureDir(componentPath);

  // Copy component files from the source package
  const sourceComponentPath = path.join(process.cwd(), 'packages', 'components', 'src', componentName.charAt(0).toUpperCase() + componentName.slice(1));
  
  if (await fs.pathExists(sourceComponentPath)) {
    // Process and copy component files
    await processAndCopyComponent(componentName, sourceComponentPath, componentPath);
  } else {
    // Fallback: generate basic component files if source doesn't exist
    const componentFiles = generateFallbackComponentFiles(componentName);
    
    for (const [filename, content] of Object.entries(componentFiles)) {
      const filePath = path.join(componentPath, filename);
      await fs.writeFile(filePath, content, 'utf8');
    }
  }

  // Update package.json to include @bee-ui/core
  await updatePackageJson();
}

async function processAndCopyComponent(
  componentName: string,
  sourcePath: string,
  targetPath: string
) {
  const pascalCase = componentName.charAt(0).toUpperCase() + componentName.slice(1);
  
  // Get all files in the source component directory
  const files = await fs.readdir(sourcePath);
  
  for (const file of files) {
    const sourceFilePath = path.join(sourcePath, file);
    const targetFilePath = path.join(targetPath, file);
    
    // Skip demo files and other unnecessary files
    if (file.includes('demo') || file.includes('page') || file.includes('example')) {
      continue;
    }
    
    const stats = await fs.stat(sourceFilePath);
    
    if (stats.isFile()) {
      // Process file content before copying
      let content = await fs.readFile(sourceFilePath, 'utf8');
      
      // Process the content based on file type
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        content = processComponentCode(content, componentName);
        
        // Special processing for styles files to fix type issues
        if (file.endsWith('.styles.ts')) {
          content = processStylesFile(content);
        }
      }
      
      await fs.writeFile(targetFilePath, content, 'utf8');
    }
  }
  
  // Create a types file with common type definitions
  const typesContent = `// Common type definitions for ${pascalCase} component
export type Size = 'sm' | 'md' | 'lg' | 'xl';
export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link' | 'default' | 'filled' | 'unstyled' | 'danger';
export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// Use Partial<Record> for component variants to avoid type errors
export type ComponentVariants<T extends string> = Partial<Record<T, string>>;
`;
  
  await fs.writeFile(path.join(targetPath, 'types.ts'), typesContent, 'utf8');
  
  // Create an optimized index.ts file
  const indexContent = `export { ${pascalCase} } from './${pascalCase}';
export type { ${pascalCase}Props } from './${pascalCase}.types';
export * from './types';
`;
  
  await fs.writeFile(path.join(targetPath, 'index.ts'), indexContent, 'utf8');
}

function processComponentCode(content: string, componentName: string): string {
  let processedContent = content;
  
  // Remove "use client" directive (not needed for regular React projects)
  processedContent = processedContent.replace(/"use client";?\s*\n?/g, '');
  
  // Fix import paths - replace cn import with clsx
  processedContent = processedContent.replace(
    /import\s+\{\s*cn\s*\}\s+from\s+['"]clsx['"];?\s*\n?/g,
    "import clsx from 'clsx';\n"
  );
  
  processedContent = processedContent.replace(
    /import\s+\{\s*cn\s*\}\s+from\s+['"]\.\.\/utils\/cn['"];?\s*\n?/g,
    "import clsx from 'clsx';\n"
  );
  
  processedContent = processedContent.replace(
    /import\s+\{\s*cn\s*\}\s+from\s+['"]\.\.\/utils['"];?\s*\n?/g,
    "import clsx from 'clsx';\n"
  );
  
  processedContent = processedContent.replace(
    /from ['"]\.\.\/types\/common['"]/g,
    "from './types'"
  );
  
  // Fix relative imports within the same component
  processedContent = processedContent.replace(
    /from ['"]\.\.\/index['"]/g,
    "from './index'"
  );
  
  // Fix type imports from index to types
  processedContent = processedContent.replace(
    /from ['"]\.\/index['"]/g,
    "from './types'"
  );
  
  // Replace all cn( function calls with clsx(
  processedContent = processedContent.replace(/cn\(/g, 'clsx(');
  
  // Optimize imports - remove unused imports
  processedContent = processedContent.replace(
    /import\s+\{[^}]*\}\s+from\s+['"]\.\.\/[^'"]*['"];?\s*\n?/g,
      ''
  );
  
  return processedContent;
}

function processStylesFile(content: string): string {
  let processedContent = content;

  // Remove "use client" directive (not needed for regular React projects)
  processedContent = processedContent.replace(/"use client";?\s*\n?/g, '');

  // Fix import paths - replace cn import with clsx
  processedContent = processedContent.replace(
    /import\s+\{\s*cn\s*\}\s+from\s+['"]clsx['"];?\s*\n?/g,
    "import clsx from 'clsx';\n"
  );

  processedContent = processedContent.replace(
    /import\s+\{\s*cn\s*\}\s+from\s+['"]\.\.\/utils\/cn['"];?\s*\n?/g,
    "import clsx from 'clsx';\n"
  );

  processedContent = processedContent.replace(
    /import\s+\{\s*cn\s*\}\s+from\s+['"]\.\.\/utils['"];?\s*\n?/g,
    "import clsx from 'clsx';\n"
  );

  // Fix type issues - convert Record<Variant, string> to Partial<Record<Variant, string>>
  processedContent = processedContent.replace(
    /Record\s*<\s*(\w+)\s*,\s*([^>]+)>/g,
    'Partial<Record<$1, $2>>'
  );

  // Optimize imports - remove unused imports
  processedContent = processedContent.replace(
    /import\s+\{[^}]*\}\s+from\s+['"]\.\.\/[^'"]*['"];?\s*\n?/g,
      ''
  );

  return processedContent;
}

function generateFallbackComponentFiles(componentName: string) {
  const pascalCase = componentName.charAt(0).toUpperCase() + componentName.slice(1);

  return {
    'index.ts': `export { ${pascalCase} } from '@bee-ui/core';
export type { ${pascalCase}Props } from '@bee-ui/core';
`,
    'README.md': `# ${pascalCase}

This is the ${pascalCase} component from @bee-ui/core.

## Usage

\`\`\`tsx
import { ${pascalCase} } from './index';

function App() {
  return <${pascalCase} />;
}
\`\`\`

## Props

See the [${pascalCase} documentation](https://github.com/your-username/bee-ui) for available props.
`
  };
}

async function updatePackageJson() {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  
  if (await fs.pathExists(packageJsonPath)) {
    const packageJson = await fs.readJson(packageJsonPath);
    
    if (!packageJson.dependencies) {
      packageJson.dependencies = {};
    }
    
    // Add necessary dependencies for the components
    const requiredDeps = {
      'clsx': '^2.0.0',
      'tailwind-merge': '^2.0.0',
      'class-variance-authority': '^0.7.0'
    };
    
    for (const [dep, version] of Object.entries(requiredDeps)) {
      if (!packageJson.dependencies[dep]) {
        packageJson.dependencies[dep] = version;
      }
    }
    
    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
  }
}
