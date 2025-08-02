import fs from 'fs';
import path from 'path';

const componentPages = [
  'accordion',
  'breadcrumb',
  'card',
  'checkbox',
  'color-picker',
  'drawer',
  'file-input',
  'image',
  'json-input',
  'pagination',
  'password-input',
  'progress-bar',
  'radio',
  'segmented-control',
  'skeleton',
  'slider',
  'switch',
  'table',
  'table-of-contents',
  'textarea',
  'timeline',
  'toaster',
  'transfer-list'
];

function addInstallationSection(componentName) {
  const filePath = `src/app/components/${componentName}/page.tsx`;
  
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${componentName} - file not found`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if InstallationSection is already imported
  if (content.includes('InstallationSection')) {
    console.log(`Skipping ${componentName} - InstallationSection already exists`);
    return;
  }

  // Add import statement
  const importStatement = `import { InstallationSection } from "@/components/playground/InstallationSection";\n`;
  
  // Find the position to insert the import (after other imports)
  const importMatch = content.match(/(import.*?from.*?;?\n)+/);
  if (importMatch) {
    const lastImportIndex = content.lastIndexOf(importMatch[0]) + importMatch[0].length;
    content = content.slice(0, lastImportIndex) + importStatement + content.slice(lastImportIndex);
  }

  // Find the end of the Usage section (before the closing div of the main container)
  // Look for the pattern where the main container div closes
  const mainContainerEnd = content.lastIndexOf('    </div>');
  if (mainContainerEnd === -1) {
    console.log(`Skipping ${componentName} - could not find main container end`);
    return;
  }

  // Insert InstallationSection before the closing div
  const installationSection = `\n      <InstallationSection componentName="${componentName.charAt(0).toUpperCase() + componentName.slice(1)}" />\n`;
  
  content = content.slice(0, mainContainerEnd) + installationSection + content.slice(mainContainerEnd);
  
  fs.writeFileSync(filePath, content);
  console.log(`Added InstallationSection to ${componentName}`);
}

console.log('Adding InstallationSection to all component pages...');

componentPages.forEach(addInstallationSection);

console.log('Done!'); 