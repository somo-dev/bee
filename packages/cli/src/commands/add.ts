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
      if (components.length > 0) {
        console.log(chalk.cyan(`   import { ${components.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(', ')} } from './bee_components/${components[0]}'`));
      }
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

  // Generate component files
  const componentFiles = generateComponentFiles(componentName);
  
  for (const [filename, content] of Object.entries(componentFiles)) {
    const filePath = path.join(componentPath, filename);
    await fs.writeFile(filePath, content, 'utf8');
  }

  // Update package.json to include necessary dependencies
  await updatePackageJson();
}

function generateComponentFiles(componentName: string) {
  const pascalCase = componentName.charAt(0).toUpperCase() + componentName.slice(1);
  const kebabCase = componentName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

  // Generate component files based on component name
  switch (componentName) {
    case 'button':
      return generateButtonFiles(pascalCase);
    case 'input':
      return generateInputFiles(pascalCase);
    case 'card':
      return generateCardFiles(pascalCase);
    case 'checkbox':
      return generateCheckboxFiles(pascalCase);
    default:
      return generateGenericComponentFiles(pascalCase);
  }
}

function generateButtonFiles(pascalCase: string) {
  return {
    'Button.tsx': `import React from 'react';
import clsx from 'clsx';
import { ButtonProps } from './Button.types';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', loading = false, disabled = false, fullWidth = false, leftIcon, rightIcon, children, ...props }, ref) => {
    return (
      <button
        className={clsx(
          'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
          {
            'w-full': fullWidth,
            'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'primary',
            'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
            'border border-input bg-background hover:bg-accent hover:text-accent-foreground': variant === 'outline',
            'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
            'bg-destructive text-destructive-foreground hover:bg-destructive/90': variant === 'danger',
            'h-9 px-3': size === 'sm',
            'h-10 px-4 py-2': size === 'md',
            'h-11 px-8': size === 'lg',
            'h-12 px-10': size === 'xl',
          },
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
`,

    'Button.types.ts': `import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
`,

    'Button.styles.ts': `import clsx from 'clsx';

export const buttonVariants = {
  variant: {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  },
  size: {
    sm: 'h-9 px-3',
    md: 'h-10 px-4 py-2',
    lg: 'h-11 px-8',
    xl: 'h-12 px-10',
  },
};

export const getButtonClasses = (variant: keyof typeof buttonVariants.variant = 'primary', size: keyof typeof buttonVariants.size = 'md') => {
  return clsx(
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
    buttonVariants.variant[variant],
    buttonVariants.size[size]
  );
};
`,

    'types.ts': `// Common type definitions for Button component
export type Size = 'sm' | 'md' | 'lg' | 'xl';
export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
`,

    'index.ts': `export { Button } from './Button';
export type { ButtonProps } from './Button.types';
export * from './types';
`,

    'README.md': `# Button Component

A versatile button component with multiple variants, sizes, and states.

## Usage

\`\`\`tsx
import { Button } from './index';

function App() {
  return (
    <div className="space-y-4">
      <Button variant="primary">Primary Button</Button>
      <Button variant="secondary" size="lg">Large Secondary</Button>
      <Button variant="outline" loading>Loading...</Button>
    </div>
  );
}
\`\`\`

## Props

- \`variant\`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
- \`size\`: 'sm' | 'md' | 'lg' | 'xl'
- \`loading\`: boolean - Shows loading spinner
- \`fullWidth\`: boolean - Makes button full width
- \`leftIcon\`: ReactNode - Icon before text
- \`rightIcon\`: ReactNode - Icon after text
- \`disabled\`: boolean - Disables the button
`
  };
}

function generateInputFiles(pascalCase: string) {
  return {
    'Input.tsx': `import React from 'react';
import clsx from 'clsx';
import { InputProps } from './Input.types';

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <input
        type={type}
        className={clsx(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          {
            'h-8 px-2 text-xs': size === 'sm',
            'h-10 px-3 py-2 text-sm': size === 'md',
            'h-12 px-4 py-3 text-base': size === 'lg',
            'h-14 px-6 py-4 text-lg': size === 'xl',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
`,

    'Input.types.ts': `import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'filled' | 'outline' | 'unstyled';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}
`,

    'Input.styles.ts': `import clsx from 'clsx';

export const inputVariants = {
  variant: {
    default: 'border border-input bg-background',
    filled: 'border border-input bg-muted',
    outline: 'border-2 border-input bg-transparent',
    unstyled: 'border-0 bg-transparent',
  },
  size: {
    sm: 'h-8 px-2 text-xs',
    md: 'h-10 px-3 py-2 text-sm',
    lg: 'h-12 px-4 py-3 text-base',
    xl: 'h-14 px-6 py-4 text-lg',
  },
};
`,

    'types.ts': `// Common type definitions for Input component
export type Size = 'sm' | 'md' | 'lg' | 'xl';
export type Variant = 'default' | 'filled' | 'outline' | 'unstyled';
export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
`,

    'index.ts': `export { Input } from './Input';
export type { InputProps } from './Input.types';
export * from './types';
`,

    'README.md': `# Input Component

A flexible input component with multiple variants and sizes.

## Usage

\`\`\`tsx
import { Input } from './index';

function App() {
  return (
    <div className="space-y-4">
      <Input placeholder="Enter text..." />
      <Input type="email" placeholder="Email address" />
      <Input size="lg" placeholder="Large input" />
    </div>
  );
}
\`\`\`

## Props

- \`variant\`: 'default' | 'filled' | 'outline' | 'unstyled'
- \`size\`: 'sm' | 'md' | 'lg' | 'xl'
- All standard HTML input attributes
`
  };
}

function generateCardFiles(pascalCase: string) {
  return {
    'Card.tsx': `import React from 'react';
import clsx from 'clsx';
import { CardProps } from './Card.types';

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'rounded-lg border bg-card text-card-foreground shadow-sm',
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';
`,

    'Card.types.ts': `import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
`,

    'Card.styles.ts': `import clsx from 'clsx';

export const cardClasses = 'rounded-lg border bg-card text-card-foreground shadow-sm';
`,

    'types.ts': `// Common type definitions for Card component
export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
`,

    'index.ts': `export { Card } from './Card';
export type { CardProps } from './Card.types';
export * from './types';
`,

    'README.md': `# Card Component

A simple card container component.

## Usage

\`\`\`tsx
import { Card } from './index';

function App() {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold">Card Title</h2>
      <p className="text-gray-600">Card content goes here.</p>
    </Card>
  );
}
\`\`\`

## Props

All standard HTML div attributes
`
  };
}

function generateCheckboxFiles(pascalCase: string) {
  return {
    'Checkbox.tsx': `import React from 'react';
import clsx from 'clsx';
import { CheckboxProps } from './Checkbox.types';

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        type="checkbox"
        className={clsx(
          'h-4 w-4 rounded border border-primary text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Checkbox.displayName = 'Checkbox';
`,

    'Checkbox.types.ts': `import React from 'react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}
`,

    'Checkbox.styles.ts': `import clsx from 'clsx';

export const checkboxClasses = 'h-4 w-4 rounded border border-primary text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
`,

    'types.ts': `// Common type definitions for Checkbox component
export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
`,

    'index.ts': `export { Checkbox } from './Checkbox';
export type { CheckboxProps } from './Checkbox.types';
export * from './types';
`,

    'README.md': `# Checkbox Component

A simple checkbox input component.

## Usage

\`\`\`tsx
import { Checkbox } from './index';

function App() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label htmlFor="terms">Accept terms and conditions</label>
    </div>
  );
}
\`\`\`

## Props

All standard HTML checkbox attributes
`
  };
}

function generateGenericComponentFiles(pascalCase: string) {
  return {
    'index.ts': `export { ${pascalCase} } from './${pascalCase}';
export type { ${pascalCase}Props } from './${pascalCase}.types';
export * from './types';
`,
    'README.md': `# ${pascalCase}

This is the ${pascalCase} component.

## Usage

\`\`\`tsx
import { ${pascalCase} } from './index';

function App() {
  return <${pascalCase} />;
}
\`\`\`

## Props

See the component types for available props.
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
