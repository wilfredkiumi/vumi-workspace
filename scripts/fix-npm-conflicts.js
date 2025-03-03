import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🔧 Fixing npm dependency conflicts...');

// Fix root package.json
const rootPackageJsonPath = path.join(rootDir, 'package.json');
if (fs.existsSync(rootPackageJsonPath)) {
  try {
    const packageJson = JSON.parse(fs.readFileSync(rootPackageJsonPath, 'utf8'));
    
    // Update TypeScript ESLint packages to match the rest of the project
    if (packageJson.devDependencies) {
      // Align TypeScript ESLint versions
      packageJson.devDependencies['@typescript-eslint/eslint-plugin'] = '^8.25.0';
      packageJson.devDependencies['@typescript-eslint/parser'] = '^8.25.0';
      
      // Update ESLint version to match peer dependencies
      packageJson.devDependencies['eslint'] = '^8.57.0';
      
      // Add typescript-eslint at root level
      packageJson.devDependencies['typescript-eslint'] = '^8.3.0';
    }
    
    fs.writeFileSync(rootPackageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('✅ Updated root package.json dependencies');
  } catch (error) {
    console.error(`❌ Error updating root package.json: ${error.message}`);
  }
}

// Fix app package.json files
const appDirs = ['apps/vumi-gigs', 'apps/vumi-showcase'];
appDirs.forEach(appDir => {
  const appPackageJsonPath = path.join(rootDir, appDir, 'package.json');
  
  if (fs.existsSync(appPackageJsonPath)) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(appPackageJsonPath, 'utf8'));
      
      // Remove specific versions of ESLint plugins to avoid conflicts
      if (packageJson.devDependencies) {
        // Use the shared dependency from root package.json
        delete packageJson.devDependencies['@typescript-eslint/eslint-plugin'];
        delete packageJson.devDependencies['@typescript-eslint/parser'];
      }
      
      fs.writeFileSync(appPackageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log(`✅ Updated ${appDir}/package.json dependencies`);
    } catch (error) {
      console.error(`❌ Error updating ${appDir}/package.json: ${error.message}`);
    }
  }
});

// Create .npmrc to use legacy peer deps
const npmrcPath = path.join(rootDir, '.npmrc');
fs.writeFileSync(npmrcPath, 'legacy-peer-deps=true\n');
console.log('✅ Created .npmrc file with legacy-peer-deps=true');

// Create a cleanup script
console.log('🧹 Creating cleanup script to remove node_modules...');
const cleanupScriptPath = path.join(rootDir, 'scripts', 'cleanup.js');
fs.writeFileSync(cleanupScriptPath, `// filepath: /Users/wilfred/vumi-workspace/scripts/cleanup.js
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('🧹 Cleaning up node_modules...');

// Remove root node_modules
try {
  execSync('rm -rf node_modules');
  console.log('✅ Removed root node_modules');
} catch (error) {
  console.error(\`❌ Error removing root node_modules: \${error.message}\`);
}

// Remove nested node_modules
const dirs = ['apps/vumi-gigs', 'apps/vumi-showcase', 'packages/ui'];
dirs.forEach(dir => {
  try {
    execSync(\`rm -rf \${dir}/node_modules\`);
    console.log(\`✅ Removed \${dir}/node_modules\`);
  } catch (error) {
    console.error(\`❌ Error removing \${dir}/node_modules: \${error.message}\`);
  }
});

console.log('🎉 Cleanup complete!');
console.log('📋 Next steps:');
console.log('  1. Run: npm install');
console.log('  2. Run: npm run fix:ultimate-build');
`);

// Update package.json with the new script
try {
  const packageJson = JSON.parse(fs.readFileSync(rootPackageJsonPath, 'utf8'));
  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts['cleanup'] = 'node scripts/cleanup.js';
  packageJson.scripts['setup'] = 'npm run cleanup && npm install && npm run fix:ultimate-build';
  fs.writeFileSync(rootPackageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('✅ Added cleanup and setup scripts to package.json');
} catch (error) {
  console.error(`❌ Error updating package.json with scripts: ${error.message}`);
}

console.log('\n🎉 All npm conflict fixes applied!');
console.log('📋 Next steps:');
console.log('  1. Run: npm run cleanup');
console.log('  2. Run: npm install');
console.log('  3. Run: npm run fix:ultimate-build');
console.log('\nOr simply run: npm run setup (to do all the above in one command)');
