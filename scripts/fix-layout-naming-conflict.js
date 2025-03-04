import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { globSync } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

/**
 * Fix Layout naming conflict with lucide-react
 */
function fixLayoutNamingConflict() {
  console.log('🔍 Looking for Layout naming conflicts...');
  
  // Find all TypeScript/JavaScript files
  const files = globSync('**/*.{ts,tsx,js,jsx}', { 
    cwd: rootDir,
    ignore: ['**/node_modules/**', '**/dist/**', '**/build/**']  
  });
  
  let fixedCount = 0;
  
  for (const filePath of files) {
    const fullPath = path.join(rootDir, filePath);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Check if this file imports Layout from lucide-react
    const layoutImportMatch = content.match(/import\s+\{([^}]*)\}\s+from\s+['"]lucide-react['"]/);
    
    if (layoutImportMatch) {
      const imports = layoutImportMatch[1].split(',').map(i => i.trim());
      
      // Check if Layout is among the imports
      const hasLayoutImport = imports.some(imp => {
        const baseName = imp.split(' as ')[0].trim();
        return baseName === 'Layout';
      });
      
      if (hasLayoutImport) {
        console.log(`Found layout conflict in ${filePath}`);
        
        // Replace "Layout" with "LayoutIcon"
        const newImports = imports.map(imp => {
          if (imp.trim() === 'Layout') {
            return 'Layout as LayoutIcon';
          }
          return imp;
        });
        
        // Update the import statement
        const newImportStatement = `import { ${newImports.join(', ')} } from 'lucide-react'`;
        content = content.replace(layoutImportMatch[0], newImportStatement);
        
        // Also update usage of Layout to LayoutIcon in JSX tags
        content = content.replace(/<Layout(\s|\/|>)/g, '<LayoutIcon$1');
        content = content.replace(/<\/Layout>/g, '</LayoutIcon>');
        
        // Write the changes back to the file
        fs.writeFileSync(fullPath, content, 'utf8');
        fixedCount++;
        console.log(`✅ Fixed Layout naming conflict in ${filePath}`);
      }
    }
  }
  
  console.log(`\n🎉 Fixed Layout naming conflicts in ${fixedCount} files`);
  return fixedCount;
}

fixLayoutNamingConflict();
