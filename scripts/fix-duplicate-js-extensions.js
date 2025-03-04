import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { globSync } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

/**
 * Fix incorrect double .js.js extensions in imports
 */
function fixDuplicateJsExtensions() {
  console.log('🔍 Checking for duplicate .js.js extensions in imports...');
  
  const files = globSync('**/*.{js,ts,jsx,tsx}', { 
    cwd: rootDir,
    ignore: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.git/**']  
  });
  let fixedCount = 0;
  
  for (const filePath of files) {
    const fullPath = path.join(rootDir, filePath);
    let content = fs.readFileSync(fullPath, 'utf8');
    const originalContent = content;
    
    // Find imports with double .js.js extensions
    const importRegex = /from\s+['"](.*?)\.js\.js['"]/g;
    const requireRegex = /require\(['"](.*?)\.js\.js['"]\)/g;
    
    // Fix double extensions
    content = content.replace(importRegex, (match, p1) => `from '${p1}.js'`);
    content = content.replace(requireRegex, (match, p1) => `require('${p1}.js')`);
    
    if (content !== originalContent) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`✅ Fixed duplicate .js extensions in ${filePath}`);
      fixedCount++;
    }
  }
  
  console.log(`\n🎉 Fixed duplicate .js extensions in ${fixedCount} files`);
  return fixedCount;
}

fixDuplicateJsExtensions();
