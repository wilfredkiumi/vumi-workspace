import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

/**
 * Run a script from the root of the workspace
 */
function runScriptAtRoot() {
  // Get the script name from command line arguments
  const scriptName = process.argv[2];
  
  if (!scriptName) {
    console.error('❌ Please provide a script name to run');
    process.exit(1);
  }

  // Verify package.json exists at root and has the script
  const packageJsonPath = path.join(rootDir, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    console.error('❌ Could not find package.json at workspace root');
    process.exit(1);
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  if (!packageJson.scripts || !packageJson.scripts[scriptName]) {
    console.error(`❌ Script '${scriptName}' not found in root package.json`);
    process.exit(1);
  }

  try {
    console.log(`🔄 Running script '${scriptName}' at workspace root...`);
    // Change to the root directory and run the script
    process.chdir(rootDir);
    execSync(`npm run ${scriptName}`, { stdio: 'inherit' });
    console.log(`✅ Script '${scriptName}' completed successfully`);
  } catch (error) {
    console.error(`❌ Failed to run script '${scriptName}':`, error);
    process.exit(1);
  }
}

runScriptAtRoot();
