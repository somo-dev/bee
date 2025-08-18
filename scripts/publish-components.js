#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

const COMPONENTS_DIR = 'packages/components';
const DIST_DIR = path.join(COMPONENTS_DIR, 'dist');

async function publishComponents() {
  try {
    console.log(chalk.blue('🚀 Publishing @bee-ui/core to npm...\n'));

    // Check if dist directory exists
    if (!await fs.pathExists(DIST_DIR)) {
      console.log(chalk.yellow('📦 Building components package...'));
      execSync('npm run build:components', { stdio: 'inherit' });
    }

    // Check if package.json exists
    const packageJsonPath = path.join(COMPONENTS_DIR, 'package.json');
    if (!await fs.pathExists(packageJsonPath)) {
      throw new Error('package.json not found in components directory');
    }

    // Read and validate package.json
    const packageJson = await fs.readJson(packageJsonPath);
    
    if (!packageJson.name || !packageJson.version) {
      throw new Error('Invalid package.json: missing name or version');
    }

    console.log(chalk.green(`✅ Package: ${packageJson.name}@${packageJson.version}`));

    // Check if user is logged into npm
    try {
      execSync('npm whoami', { stdio: 'pipe' });
    } catch (error) {
      console.log(chalk.red('❌ Not logged into npm. Please run `npm login` first.'));
      process.exit(1);
    }

    // Check if package already exists on npm
    try {
      const npmInfo = execSync(`npm view ${packageJson.name} version`, { stdio: 'pipe' }).toString().trim();
      console.log(chalk.yellow(`📋 Current npm version: ${npmInfo}`));
      
      if (npmInfo === packageJson.version) {
        console.log(chalk.red(`❌ Version ${packageJson.version} already exists on npm.`));
        console.log(chalk.blue('💡 Update the version in package.json and try again.'));
        process.exit(1);
      }
    } catch (error) {
      console.log(chalk.blue('📋 Package not yet published to npm'));
    }

    // Confirm publishing
    console.log(chalk.blue('\n📤 Ready to publish to npm.'));
    console.log(chalk.gray('This will make your components available for installation via:'));
    console.log(chalk.cyan(`  npm install ${packageJson.name}`));
    
    // Publish to npm
    console.log(chalk.blue('\n📤 Publishing...'));
    execSync('npm publish', { 
      cwd: COMPONENTS_DIR, 
      stdio: 'inherit' 
    });

    console.log(chalk.green('\n🎉 Successfully published to npm!'));
    console.log(chalk.blue('\n📖 Next steps:'));
    console.log(chalk.gray('1. Users can now install your components:'));
    console.log(chalk.cyan(`   npm install ${packageJson.name}`));
    console.log(chalk.gray('2. Update your documentation with installation instructions'));
    console.log(chalk.gray('3. Consider setting up automated publishing with GitHub Actions'));

  } catch (error) {
    console.error(chalk.red('\n❌ Failed to publish components:'), error.message);
    process.exit(1);
  }
}

// Run the script
publishComponents();
