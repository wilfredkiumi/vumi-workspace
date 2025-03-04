import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { globSync } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

/**
 * Fix naming conflicts in import statements
 */
function fixNamingConflicts() {
  console.log('🔍 Checking for naming conflicts in import statements...');
  
  // Find all TypeScript/JavaScript files
  const files = globSync('**/*.{ts,tsx,js,jsx}', { 
    cwd: rootDir,
    ignore: ['**/node_modules/**', '**/dist/**', '**/build/**']  
  });
  
  let fixedCount = 0;
  
  for (const filePath of files) {
    const fullPath = path.join(rootDir, filePath);
    let content = fs.readFileSync(fullPath, 'utf8');
    const originalContent = content;
    
    // Look for import conflicts like "Something as Name, Name"
    const importRegex = /import\s+\{([^}]+)\}\s+from\s+['"]([^'"]+)['"]/g;
    let match;
    let modified = false;
    
    while ((match = importRegex.exec(content)) !== null) {
      const importClause = match[1];
      const source = match[2];
      const fullImportStatement = match[0];
      
      // Split imports and check for conflicts
      const imports = importClause.split(',').map(i => i.trim());
      const aliasedImports = new Map();
      const normalImports = new Set();
      const duplicates = [];
      
      // First pass: collect imports and aliases
      for (const imp of imports) {
        if (imp.includes(' as ')) {
          const [original, alias] = imp.split(' as ').map(s => s.trim());
          aliasedImports.set(alias, original);
          
          // Check if alias conflicts with a normal import
          if (normalImports.has(alias)) {
            duplicates.push(alias);
          }
        } else if (imp) {  // Skip empty imports
          normalImports.add(imp);
          
          // Check if normal import conflicts with an alias
          if (aliasedImports.has(imp)) {
            duplicates.push(imp);
          }
        }
      }
      
      // If we found duplicates, fix the import statement
      if (duplicates.length > 0) {
        console.log(`Found naming conflict in ${filePath}: ${duplicates.join(', ')}`);
        
        // Filter out the duplicate direct imports that conflict with aliases
        const fixedImports = imports.filter(imp => {
          const name = imp.trim();
          if (!name.includes(' as ') && duplicates.includes(name)) {
            return false; // Remove the direct import that conflicts with alias
          }
          return true;
        });
        
        const newImportStatement = `import { ${fixedImports.join(', ')} } from '${source}'`;
        content = content.replace(fullImportStatement, newImportStatement);
        modified = true;
      }
    }
    
    // If we modified the content, write it back to the file
    if (modified && content !== originalContent) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`✅ Fixed naming conflicts in ${filePath}`);
      fixedCount++;
    }
  }
  
  console.log(`\n🎉 Fixed naming conflicts in ${fixedCount} files`);
  return fixedCount;
}

// Run the fix
fixNamingConflicts();
