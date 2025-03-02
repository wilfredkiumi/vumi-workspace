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
  // Otherwise, run the first app by default
  try {
    // Get all app directories
    const appsDir = path.join(process.cwd(), 'apps');
    const apps = fs.readdirSync(appsDir).filter(file => {
      return fs.statSync(path.join(appsDir, file)).isDirectory();
    });

    console.log('Available apps:', apps.join(', '));
    console.log('To run a specific app, use: npm run dev -- --filter=app-name');
    console.log('Or use the direct commands: npm run dev:gigs or npm run dev:showcase');
    
    // Ask the user which app to run
    console.log('\nPlease choose an app to run:');
    console.log('1. vumi-gigs (port 3000)');
    console.log('2. vumi-showcase (port 3001)');
    console.log('\nStarting vumi-gigs by default...');
    
    execSync(`cd apps/vumi-gigs && npm run dev`, { stdio: 'inherit' });
  } catch (error) {
    console.error('Error running dev server:', error.message);
    process.exit(1);
  }
}