// filepath: /Users/wilfred/vumi-workspace/scripts/cleanup.js
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('🧹 Cleaning up node_modules...');

// Remove root node_modules
try {
  execSync('rm -rf node_modules');
  console.log('✅ Removed root node_modules');
} catch (error) {
  console.error(`❌ Error removing root node_modules: ${error.message}`);
}

// Remove nested node_modules
const dirs = ['apps/vumi-gigs', 'apps/vumi-showcase', 'packages/ui'];
dirs.forEach(dir => {
  try {
    execSync(`rm -rf ${dir}/node_modules`);
    console.log(`✅ Removed ${dir}/node_modules`);
  } catch (error) {
    console.error(`❌ Error removing ${dir}/node_modules: ${error.message}`);
  }
});

console.log('🎉 Cleanup complete!');
console.log('📋 Next steps:');
console.log('  1. Run: npm install');
console.log('  2. Run: npm run fix:ultimate-build');
