import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { globSync } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

/**
 * Convert all JS files with JSX in the shared package to JSX files
 */
function fixSharedJsxFiles() {
  console.log('🔧 Converting shared package JS files with JSX to JSX files...');
  
  // Get the shared package dist directory
  const sharedDistDir = path.join(rootDir, 'packages', 'shared', 'dist');
  
  if (!fs.existsSync(sharedDistDir)) {
    console.log('⚠️ Shared package dist directory not found');
    return;
  }
  
  // Find all JS files in the shared package
  const jsFiles = globSync('**/*.js', { cwd: sharedDistDir });
  console.log(`Found ${jsFiles.length} JS files in shared package`);
  
  // Keep track of renamed files
  const renamedFiles = [];
  
  // Check each file for JSX content
  for (const jsFile of jsFiles) {
    const fullPath = path.join(sharedDistDir, jsFile);
    const content = fs.readFileSync(fullPath, 'utf8');
    
    // Simple JSX detection patterns
    const hasJsx = 
      (content.includes('React.createElement') && content.includes('React.Fragment')) ||
      (content.includes('<') && content.includes('>') && content.includes('</')) || 
      (content.includes('<') && content.includes('/>')) ||
      (content.includes('JSX'));
    
    if (hasJsx) {
      // Create .jsx file
      const jsxFilePath = fullPath.replace(/\.js$/, '.jsx');
      fs.writeFileSync(jsxFilePath, content, 'utf8');
      
      // Remember this file was renamed
      const relativePath = path.relative(sharedDistDir, fullPath);
      renamedFiles.push(relativePath);
      
      console.log(`✅ Converted ${relativePath} to JSX file`);
    }
  }
  
  console.log(`Converted ${renamedFiles.length} files to JSX`);
  
  // Update all imports
  if (renamedFiles.length > 0) {
    // Find all JS/JSX/TS/TSX files in the entire workspace including shared package
    const allFiles = globSync('**/*.{js,jsx,ts,tsx}', { 
      cwd: rootDir, 
      ignore: ['**/node_modules/**', '**/.git/**'] 
    });
    
    let importsFixed = 0;
    
    for (const file of allFiles) {
      const fullPath = path.join(rootDir, file);
      let content = fs.readFileSync(fullPath, 'utf8');
      const originalContent = content;
      
      // Update imports for each renamed file
      for (const renamedFile of renamedFiles) {
        // Get the filename without extension
        const baseName = path.basename(renamedFile, '.js');
        const dirName = path.dirname(renamedFile);
        
        // Create regex patterns to find imports to the JS file
        const patterns = [
          // Standard import with exact path
          new RegExp(`from\\s+["'].*?/${baseName}(?:\\.js)?["']`, 'g'),
          // Import from directory index
          new RegExp(`from\\s+["'].*?/${dirName}(?:/index)?(?:\\.js)?["']`, 'g'),
          // Relative import
          new RegExp(`from\\s+["']\\.\\.?/.*?${baseName}(?:\\.js)?["']`, 'g')
        ];
        
        // Replace each pattern
        for (const pattern of patterns) {
          content = content.replace(pattern, (match) => {
            // Replace .js with .jsx or add .jsx if no extension
            if (match.includes('.js')) {
              return match.replace('.js', '.jsx');
            } else {
              // Add .jsx before the closing quote
              return match.replace(/(['"])$/, '.jsx$1');
            }
          });
        }
      }
      
      // Write back if modified
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        importsFixed++;
        console.log(`✅ Updated imports in ${file}`);
      }
    }
    
    console.log(`Updated imports in ${importsFixed} files`);
  }
  
  console.log('🎉 All shared package JSX files converted and imports updated');
}

// Run the fix
fixSharedJsxFiles();
