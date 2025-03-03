// filepath: /Users/wilfred/vumi-workspace/scripts/restore-creator-listing.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const source = path.join(rootDir, 'apps/vumi-gigs/src/CreatorListingPage.clean.tsx');
const target = path.join(rootDir, 'apps/vumi-gigs/src/CreatorListingPage.tsx');

try {
  // Create backup of the current file
  const backup = fs.readFileSync(target, 'utf8');
  fs.writeFileSync(target + '.backup', backup);
  console.log('✅ Created backup at CreatorListingPage.tsx.backup');
  
  // Copy the clean file
  const clean = fs.readFileSync(source, 'utf8');
  fs.writeFileSync(target, clean);
  console.log('✅ Successfully restored clean version of CreatorListingPage.tsx');
} catch (error) {
  console.error('❌ Error:', error);
}