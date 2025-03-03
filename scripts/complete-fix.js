import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🚀 Starting complete TypeScript error fix process...');

// Create and run all fix scripts
try {
  // First run the enhanced fixes
  console.log('\n1️⃣ Running enhanced fixes...');
  execSync('node scripts/enhanced-fix.js', { stdio: 'inherit' });

  // Then fix DB services
  console.log('\n2️⃣ Fixing DB services...');
  execSync('node scripts/fix-db-services.js', { stdio: 'inherit' });

  // Fix UI components
  console.log('\n3️⃣ Fixing UI components...');
  execSync('node scripts/fix-ui-components.js', { stdio: 'inherit' });

  // Final type check
  console.log('\n4️⃣ Running type check...');
  try {
    execSync('cd apps/vumi-gigs && npx tsc --noEmit --skipLibCheck', { stdio: 'inherit' });
    console.log('\n✅ Type check passed successfully!');
  } catch (e) {
    console.log('\n⚠️ Type check found remaining issues.');
    console.log('Some errors may need manual fixing. Review the output above.');
  }

  console.log('\n🎉 Completed all automatic fixes!');
} catch (error) {
  console.error(`❌ Error during fix process: ${error.message}`);
}
