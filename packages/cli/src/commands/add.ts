#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { getPackageManager } from '../utils/get-package-manager.js';
import { getConfig } from '../utils/get-config.js';
import { logger } from '../utils/logger.js';

const program = new Command();

program
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
        spinner.fail('No configuration found. Please run `bee-ui init` first.');
        process.exit(1);
      }

      // If no components specified, show available ones
      if (components.length === 0) {
        spinner.stop();
        console.log(chalk.blue('\nAvailable components:'));
        console.log(chalk.gray('Run `bee-ui add <component-name>` to add a component\n'));
        
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
      console.log(chalk.gray('1. Import and use your components:'));
      console.log(chalk.cyan(`   import { ${components.join(', ')} } from '@bee-ui/core'`));
      console.log(chalk.gray('2. Add Tailwind CSS to your project if not already added'));
      console.log(chalk.gray('3. Import the component styles in your CSS file'));

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
  const componentDir = path.join(process.cwd(), config.components || 'components');
  const componentPath = path.join(componentDir, componentName);

  // Create components directory if it doesn't exist
  await fs.ensureDir(componentDir);

  // Check if component already exists
  if (await fs.pathExists(componentPath) && !overwrite) {
    throw new Error(`Component ${componentName} already exists. Use --overwrite to replace.`);
  }

  // Create component directory
  await fs.ensureDir(componentPath);

  // Generate component files
  const componentFiles = generateComponentFiles(componentName);
  
  for (const [filename, content] of Object.entries(componentFiles)) {
    const filePath = path.join(componentPath, filename);
          await fs.writeFile(filePath, content, 'utf8');
  }

  // Update package.json to include @bee-ui/core
  await updatePackageJson();
}

function generateComponentFiles(componentName: string) {
  const pascalCase = componentName.charAt(0).toUpperCase() + componentName.slice(1);
  const kebabCase = componentName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

  return {
    'index.ts': `export { ${pascalCase} } from '@bee-ui/core';
export type { ${pascalCase}Props } from '@bee-ui/core';
`,
    'page.tsx': `import { ${pascalCase} } from '@bee-ui/core';

export default function ${pascalCase}Page() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">${pascalCase} Component</h1>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-3">Basic Usage</h2>
          <div className="p-4 border rounded-lg">
            <${pascalCase} />
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-3">With Props</h2>
          <div className="p-4 border rounded-lg">
            <${pascalCase} className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
`,
    'README.md': `# ${pascalCase}

This is the ${pascalCase} component from @bee-ui/core.

## Usage

\`\`\`tsx
import { ${pascalCase} } from '@bee-ui/core';

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
    
    if (!packageJson.dependencies['@bee-ui/core']) {
      packageJson.dependencies['@bee-ui/core'] = '^1.0.0';
    }
    
    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
  }
}

program.parse();
