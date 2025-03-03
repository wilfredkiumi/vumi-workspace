import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🔧 Fixing duplicate imports...');

// Files with duplicate imports to fix
const filesToFix = [
  {
    path: 'apps/vumi-gigs/src/CreatorProfilePage.tsx',
    replacements: [
      {
        // Remove duplicate Creator import, keep only one
        pattern: /import { Creator } from "\.\/types\/index\.js";\s*/g,
        replacement: ''
      }
    ]
  }
];

// Process each file
filesToFix.forEach(file => {
  const filePath = path.join(rootDir, file.path);
  
  if (fs.existsSync(filePath)) {
    console.log(`Processing ${file.path}...`);
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Apply each replacement
    file.replacements.forEach(replacement => {
      const originalContent = content;
      content = content.replace(replacement.pattern, replacement.replacement);
      
      if (content !== originalContent) {
        modified = true;
      }
    });
    
    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed ${file.path}`);
    } else {
      console.log(`⚠️ No changes needed in ${file.path}`);
    }
  } else {
    console.log(`⚠️ File not found: ${file.path}`);
  }
});

// Fix any other files that might have duplicate imports
function fixAllDuplicateImports() {
  console.log('\n🔍 Checking for other duplicate imports...');
  
  // Find all TypeScript files
  const baseDirectories = [
    path.join(rootDir, 'apps/vumi-gigs/src'),
    path.join(rootDir, 'packages/ui')
  ];
  
  let fileCount = 0;
  let fixedCount = 0;
  
  // Process each directory
  baseDirectories.forEach(dir => {
    if (!fs.existsSync(dir)) return;
    
    const files = findTypeScriptFiles(dir);
    fileCount += files.length;
    
    files.forEach(filePath => {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Track imports to detect duplicates
      const importLines = content.split('\n');
      const seenImports = new Map();
      const linesToRemove = new Set();
      
      // Find duplicate imports
      for (let i = 0; i < importLines.length; i++) {
        const line = importLines[i];
        
        // Check if it's an import line
        if (line.trim().startsWith('import ')) {
          // Extract the imported module
          const moduleMatch = line.match(/from\s+['"]([^'"]+)['"]/);
          
          if (moduleMatch) {
            const module = moduleMatch[1];
            
            // Check if this module was already imported
            if (seenImports.has(module)) {
              // This is a duplicate import - mark for removal
              linesToRemove.add(i);
            } else {
              seenImports.set(module, i);
            }
          }
        }
      }
      
      // Remove duplicate import lines
      if (linesToRemove.size > 0) {
        const newContent = importLines
          .filter((_, i) => !linesToRemove.has(i))
          .join('\n');
        
        fs.writeFileSync(filePath, newContent);
        fixedCount++;
        console.log(`✅ Fixed duplicate imports in ${path.relative(rootDir, filePath)}`);
      }
    });
  });
  
  console.log(`\n🔍 Checked ${fileCount} files, fixed ${fixedCount} with duplicate imports`);
}

// Helper function to find all TypeScript files in a directory
function findTypeScriptFiles(dir) {
  let results = [];
  
  const list = fs.readdirSync(dir);
  
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      results = results.concat(findTypeScriptFiles(filePath));
    } else if (/\.(tsx?|jsx?)$/.test(file)) {
      results.push(filePath);
    }
  }
  
  return results;
}

// Run the automated fix for all files
fixAllDuplicateImports();

console.log('\n✅ Duplicate imports fixes completed!');
console.log('  Run: npm run build:skipcheck');
