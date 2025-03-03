import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Get the filter argument if provided
const args = process.argv.slice(2);
const filterArg = args.find(arg => arg.startsWith('--filter='));
const filter = filterArg ? filterArg.split('=')[1] : null;

// If a specific app is specified, type check only that app
if (filter) {
  try {
    console.log(`Type checking ${filter}...`);
    execSync(`cd apps/${filter} && npx tsc --noEmit`, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error type checking ${filter}:`, error.message);
    process.exit(1);
  }
} else {
  // Otherwise, type check all apps and packages
  try {
    // Get all app directories
    const appsDir = path.join(process.cwd(), 'apps');
    const apps = fs.readdirSync(appsDir).filter(file => {
      return fs.statSync(path.join(appsDir, file)).isDirectory();
    });

    // Get all package directories
    const packagesDir = path.join(process.cwd(), 'packages');
    const packages = fs.existsSync(packagesDir) 
      ? fs.readdirSync(packagesDir).filter(file => {
          return fs.statSync(path.join(packagesDir, file)).isDirectory();
        })
      : [];

    console.log('Type checking all apps and packages...');
    
    // Type check packages
    for (const pkg of packages) {
      const pkgJsonPath = path.join(packagesDir, pkg, 'package.json');
      if (fs.existsSync(pkgJsonPath)) {
        console.log(`Type checking package: ${pkg}`);
        execSync(`cd packages/${pkg} && npx tsc --noEmit`, { stdio: 'inherit' });
      }
    }
    
    // Type check apps
    for (const app of apps) {
      console.log(`Type checking app: ${app}`);
      execSync(`cd apps/${app} && npx tsc --noEmit`, { stdio: 'inherit' });
    }
    
    console.log('All type checking completed successfully!');
  } catch (error) {
    console.error('Error type checking:', error.message);
    process.exit(1);
  }
}