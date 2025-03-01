import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Get the filter argument if provided
const args = process.argv.slice(2);
const filterArg = args.find(arg => arg.startsWith('--filter='));
const filter = filterArg ? filterArg.split('=')[1] : null;

// If a specific app is specified, build only that app
if (filter) {
  try {
    console.log(`Building ${filter}...`);
    execSync(`cd apps/${filter} && npm run build`, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error building ${filter}:`, error.message);
    process.exit(1);
  }
} else {
  // Otherwise, build all apps
  try {
    // Get all app directories
    const appsDir = path.join(process.cwd(), 'apps');
    const apps = fs.readdirSync(appsDir).filter(file => {
      return fs.statSync(path.join(appsDir, file)).isDirectory();
    });

    console.log('Building all apps...');
    
    // Build packages first
    console.log('Building shared packages...');
    const packagesDir = path.join(process.cwd(), 'packages');
    if (fs.existsSync(packagesDir)) {
      const packages = fs.readdirSync(packagesDir).filter(file => {
        return fs.statSync(path.join(packagesDir, file)).isDirectory();
      });
      
      for (const pkg of packages) {
        const pkgJsonPath = path.join(packagesDir, pkg, 'package.json');
        if (fs.existsSync(pkgJsonPath)) {
          const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
          if (pkgJson.scripts && pkgJson.scripts.build) {
            console.log(`Building package: ${pkg}`);
            execSync(`cd packages/${pkg} && npm run build`, { stdio: 'inherit' });
          }
        }
      }
    }
    
    // Then build apps
    for (const app of apps) {
      console.log(`Building app: ${app}`);
      execSync(`cd apps/${app} && npm run build`, { stdio: 'inherit' });
    }
    
    console.log('All builds completed successfully!');
  } catch (error) {
    console.error('Error building apps:', error.message);
    process.exit(1);
  }
}