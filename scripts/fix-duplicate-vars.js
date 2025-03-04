import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const filesToCheck = [
  'apps/vumi-gigs/src/CreatorListingPage.tsx',
  'apps/vumi-gigs/src/pages/ProfilePage.tsx',
  // Add more files if you encounter similar issues
];

console.log('🔎 Scanning for duplicate variable declarations...');

let fixedCount = 0;

for (const relativeFilePath of filesToCheck) {
  const filePath = path.join(rootDir, relativeFilePath);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    
    // Fix duplicate theme declarations
    if (content.includes('const theme = "gigs"') && content.includes('const { theme }')) {
      content = content.replace(/const theme = "gigs";\s*/, '');
      content = content.replace(/const \{ theme \} = useTheme\(\);/, 'const { theme, colorMode } = useTheme();');
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Fixed duplicate theme declaration in ${relativeFilePath}`);
        fixedCount++;
        originalContent = content; // Update originalContent for next check
      }
    }
    
    // Fix duplicate colorMode declarations
    if (content.includes('const colorMode = "light"') && content.includes('colorMode }')) {
      content = content.replace(/const colorMode = "light";\s*/, '');
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Fixed duplicate colorMode declaration in ${relativeFilePath}`);
        fixedCount++;
      }
    }
  } else {
    console.log(`⚠️ File not found: ${relativeFilePath}`);
  }
}

console.log(`\n🔧 Fixed ${fixedCount} files with duplicate variable declarations`);
console.log('Run build again with:');
console.log('npm run build:final');
