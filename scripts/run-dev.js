import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Get the filter argument if provided
const args = process.argv.slice(2);
const filterArg = args.find(arg => arg.startsWith('--filter='));
const filter = filterArg ? filterArg.split('=')[1] : null;

// If a specific app is specified, run only that app
if (filter) {
  try {
    console.log(`Starting development server for ${filter}...`);
    execSync(`cd apps/${filter} && npm run dev`, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error running dev for ${filter}:`, error.message);
    process.exit(1);
  }
} else {
  // Otherwise, run both apps concurrently
  try {
    // Get all app directories
    const appsDir = path.join(process.cwd(), 'apps');
    const apps = fs.readdirSync(appsDir).filter(file => {
      return fs.statSync(path.join(appsDir, file)).isDirectory();
    });

    console.log('Available apps:', apps.join(', '));
    console.log('Starting both apps...\n');
    
    // Run both apps concurrently
    execSync('concurrently "npm run dev:gigs" "npm run dev:showcase"', { 
      stdio: 'inherit',
      shell: true
    });
  } catch (error) {
    console.error('Error running dev servers:', error.message);
    process.exit(1);
  }
}