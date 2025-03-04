import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { globSync } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

/**
 * Fix duplicate named imports in import statements
 */
function fixDuplicateImports() {
  console.log('🔍 Checking for duplicate imports in component files...');
  
  // Find all TypeScript/JavaScript files
  const files = globSync('apps/vumi-*/src/**/*.{ts,tsx,js,jsx}', { cwd: rootDir });
  let fixedCount = 0;
  
  for (const filePath of files) {
    const fullPath = path.join(rootDir, filePath);
    let content = fs.readFileSync(fullPath, 'utf8');
    const originalContent = content;
    let modified = false;
    
    // Look for import statements
    const importRegex = /import\s+\{([^}]+)\}\s+from\s+['"]([^'"]+)['"]/g;
    let match;
    
    // Process each import statement
    while ((match = importRegex.exec(content)) !== null) {
      const importClause = match[1];
      const source = match[2];
      const fullImportStatement = match[0];
      
      // Split the import names and remove extra whitespace
      const imports = importClause.split(',').map(i => i.trim());
      
      // Check for duplicates
      const uniqueImports = [];
      const seen = new Set();
      let hasDuplicates = false;
      
      for (const importName of imports) {
        // Skip empty imports
        if (!importName) continue;
        
        const normalizedName = importName.split(' as ')[0].trim();
        
        if (!seen.has(normalizedName)) {
          seen.add(normalizedName);
          uniqueImports.push(importName);
        } else {
          hasDuplicates = true;
          console.log(`Found duplicate import "${normalizedName}" in ${filePath}`);
        }
      }
      
      // If we found duplicates, fix the import statement
      if (hasDuplicates) {
        const newImportStatement = `import { ${uniqueImports.join(', ')} } from '${source}'`;
        content = content.replace(fullImportStatement, newImportStatement);
        modified = true;
      }
    }
    
    // If the content was modified, write it back to the file
    if (modified && content !== originalContent) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`✅ Fixed duplicate imports in ${filePath}`);
      fixedCount++;
    }
  }
  
  console.log(`\n🎉 Fixed duplicate imports in ${fixedCount} files`);
  return fixedCount;
}

// Run the fix
fixDuplicateImports();
