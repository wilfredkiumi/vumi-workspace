import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { globSync } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

/**
 * Fix duplicate component declarations in files
 */
function fixDuplicateComponentDeclarations() {
  console.log('🔍 Checking for duplicate component declarations...');
  
  const files = globSync('apps/vumi-*/src/**/*.{tsx,jsx}', { cwd: rootDir });
  let fixedCount = 0;
  
  for (const filePath of files) {
    const fullPath = path.join(rootDir, filePath);
    let content = fs.readFileSync(fullPath, 'utf8');
    const originalContent = content;
    
    // Get the imports from the file
    const importMatches = [...content.matchAll(/import\s+(?:{[^}]*}|\w+|(?:\w+\s*,\s*{[^}]*}))\s+from\s+(['"].*?['"])/g)];
    const importedComponents = new Set();
    
    for (const match of importMatches) {
      // Extract named imports like { Component1, Component2 }
      const namedImportMatch = match[0].match(/{\s*([^}]*)\s*}/);
      if (namedImportMatch) {
        const components = namedImportMatch[1].split(',').map(c => c.trim());
        components.forEach(comp => {
          const aliasMatch = comp.match(/(\w+)(?:\s+as\s+(\w+))?/);
          if (aliasMatch) {
            importedComponents.add(aliasMatch[2] || aliasMatch[1]);
          }
        });
      }
      
      // Extract default imports like Component from './Component'
      const defaultImportMatch = match[0].match(/import\s+(\w+)\s+from/);
      if (defaultImportMatch) {
        importedComponents.add(defaultImportMatch[1]);
      }
    }
    
    // Check for local component declarations that conflict with imports
    for (const component of importedComponents) {
      // Find local function declarations or const assignments with the same name
      const functionPattern = new RegExp(`(function|const)\\s+${component}\\s*(?:=\\s*\\([^)]*\\)\\s*=>|\\([^)]*\\)\\s*{)`, 'g');
      const localDeclMatches = [...content.matchAll(functionPattern)];
      
      if (localDeclMatches.length > 0) {
        console.log(`Found duplicate component declaration for ${component} in ${filePath}`);
        
        // Find the end of the local component declaration and remove it
        for (const match of localDeclMatches) {
          const startPos = match.index;
          let endPos = startPos;
          let openBraces = 0;
          let inLocalDecl = false;
          
          // Find the corresponding closing brace
          for (let i = startPos; i < content.length; i++) {
            if (content[i] === '{') {
              openBraces++;
              inLocalDecl = true;
            } else if (content[i] === '}') {
              openBraces--;
              if (inLocalDecl && openBraces === 0) {
                endPos = i + 1;
                break;
              }
            }
          }
          
          // Remove the duplicate declaration
          if (endPos > startPos) {
            content = content.slice(0, startPos) + 
                     `// Removed duplicate ${component} declaration` + 
                     content.slice(endPos);
            fixedCount++;
          }
        }
      }
    }
    
    // If we modified the content, write it back to the file
    if (content !== originalContent) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`✅ Fixed duplicate component declarations in ${filePath}`);
      fixedCount++;
    }
  }
  
  console.log(`\n🎉 Fixed duplicate component declarations in ${fixedCount} files`);
  return fixedCount;
}

fixDuplicateComponentDeclarations();
