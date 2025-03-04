import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

/**
 * Fix all JSX-related issues in the project
 */
function fixAllJsxIssues() {
  console.log('🔧 Fixing all JSX-related issues in the project...');
  
  try {
    // Make sure we're in the root directory
    process.chdir(rootDir);
    
    // Run the specific fixes for JSX in JS files
    console.log('\n🔍 Running fix:specific-jsx...');
    execSync('npm run fix:specific-jsx', { stdio: 'inherit' });
    
    console.log('\n🔍 Running fix:shared-jsx...');
    execSync('npm run fix:shared-jsx', { stdio: 'inherit' });
    
    console.log('\n🔍 Running fix:video-meeting...');
    execSync('npm run fix:video-meeting', { stdio: 'inherit' });
    
    console.log('\n🎉 All JSX fixes applied successfully!');
    
  } catch (error) {
    console.error('\n❌ Failed to apply JSX fixes:', error);
    process.exit(1);
  }
}

fixAllJsxIssues();
