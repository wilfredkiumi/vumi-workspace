import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function main() {
  try {
    console.log('🔍 Running ESLint to fix unused imports and other issues...');
    
    // Get the root directory
    const rootDir = path.resolve(__dirname, '..');
    
    // Use existing ESLint setup from the apps
    execSync('npx eslint --fix "apps/vumi-gigs/src/**/*.{ts,tsx}"', { 
      stdio: 'inherit',
      cwd: rootDir 
    });
    
    execSync('npx eslint --fix "packages/ui/**/*.{ts,tsx}"', { 
      stdio: 'inherit',
      cwd: rootDir
    });

    console.log('\n✅ ESLint fixes applied');
    
    // Create types directory if it doesn't exist
    const typesDir = path.join(rootDir, 'types');
    if (!fs.existsSync(typesDir)) {
      fs.mkdirSync(typesDir);
      console.log('📁 Created types directory');
    }
    
    // Create services directory if it doesn't exist
    const servicesDir = path.join(rootDir, 'services');
    if (!fs.existsSync(servicesDir)) {
      fs.mkdirSync(servicesDir);
      console.log('📁 Created services directory');
    }

    console.log('\n⚠️ Remember to run tsc to check remaining type errors');
    console.log('📝 Suggestion: Run "npx tsc --noEmit" in each app directory');

  } catch (error) {
    console.error('❌ Error running fixes:', error.message);
    process.exit(1);
  }
}

main();
