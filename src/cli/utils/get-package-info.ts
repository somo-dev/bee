import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function getPackageInfo() {
  const packageJsonPath = path.join(__dirname, '../../package.json');
  
  try {
    const packageJson = await import(packageJsonPath, { assert: { type: 'json' } });
    return packageJson.default;
  } catch (error) {
    return {
      name: 'beeui',
      version: '1.0.0'
    };
  }
}