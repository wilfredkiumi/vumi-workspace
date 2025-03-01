import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Get the filter argument if provided
const args = process.argv.slice(2);
const filterArg = args.find(arg => arg.startsWith('--filter='));
const filter = filterArg ? filterArg.split('=')[1] : null;

// If a specific app is specified, lint only that app
if (filter) {
  try {
    console.log(`Linting ${filter}...`);
    execSync(`cd apps/${filter} && npm run lint`, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error linting ${filter}:`, error.message);
    process.exit(1);
  }
} else {
  // Otherwise, lint all apps and packages
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

    console.log('Linting all apps and packages...');
    
    // Lint packages
    for (const pkg of packages) {
      const pkgJsonPath = path.join(packagesDir, pkg, 'package.json');
      if (fs.existsSync(pkgJsonPath)) {
        const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
        if (pkgJson.scripts && pkgJson.scripts.lint) {
          console.log(`Linting package: ${pkg}`);
          execSync(`cd packages/${pkg} && npm run lint`, { stdio: 'inherit' });
        }
      }
    }
    
    // Lint apps
    for (const app of apps) {
      console.log(`Linting app: ${app}`);
      execSync(`cd apps/${app} && npm run lint`, { stdio: 'inherit' });
    }
    
    console.log('All linting completed successfully!');
  } catch (error) {
    console.error('Error linting:', error.message);
    process.exit(1);
  }
}