import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// List of unused React imports to be removed
const unusedImports = [
  {
    regex: /import\s+React\s+from\s+['"]react['"];?\n/g,
    replacement: ''
  },
  {
    regex: /import\s+React,\s+\{\s*([^}]*)\s*\}\s+from\s+['"]react['"];?\n/g,
    replacement: (match, importList) => `import { ${importList} } from 'react';\n`
  },
  {
    regex: /,\s*(Award|Clock|DollarSign|Camera|Video|Lock|Globe|Briefcase|Award|Zap)(?=\s*[,}])/g,
    replacement: ''
  },
  {
    regex: /import\s+\{\s*(Award|Clock|DollarSign|Camera|Video|Lock|Globe|Briefcase|Award|Zap)\s*\}\s+from\s+['"]lucide-react['"];?\n/g,
    replacement: ''
  },
  {
    regex: /,\s*(theme|colorMode)(?=\s*[,}])/g,
    replacement: ''
  }
];

// Add type imports where needed
const typeAdditions = [
  {
    filePattern: /src\/services\/api\.ts$/,
    position: 'afterImports',
    import: 'import { PostOperation } from "../../services/api-types.js";\n'
  },
  {
    filePattern: /src\/services\/db\/(creator|user|showcase|ticket)Service\.ts$/,
    position: 'afterImports',
    import: 'import { User, Creator, Showcase, EventTicket } from "../../../types/index.js";\n'
  },
  {
    filePattern: /src\/CreatorProfilePage\.tsx$/,
    position: 'afterImports',
    import: 'import { Creator } from "./types/index.js";\n'
  }
];

// Files to process
const filesToProcess = [
  ...findFiles(path.join(rootDir, 'apps', 'vumi-gigs', 'src'), /\.(ts|tsx)$/),
  ...findFiles(path.join(rootDir, 'packages', 'ui'), /\.(ts|tsx)$/)
];

// Create type directories
setupTypeDirectories();

// Process files
processFiles();

// Function to setup type directories
function setupTypeDirectories() {
  console.log('📝 Setting up type definitions...');

  // Create types directory if it doesn't exist
  const typesDir = path.join(rootDir, 'types');
  if (!fs.existsSync(typesDir)) {
    fs.mkdirSync(typesDir);
    console.log('📁 Created types directory');
  }

  // Create services directory if it doesn't exist
  const servicesDir = path.join(rootDir, 'services');
  if (!fs.existsSync(servicesDir)) {
    fs.mkdirSync(servicesDir);
    console.log('📁 Created services directory');
  }
  
  // Create symlinks for apps
  try {
    const gigsTypesDir = path.join(rootDir, 'apps', 'vumi-gigs', 'src', 'types');
    if (!fs.existsSync(gigsTypesDir)) {
      try {
        fs.mkdirSync(gigsTypesDir);
      } catch (e) {
        if (e.code !== 'EEXIST') {
          console.error(`Error creating directory ${gigsTypesDir}:`, e);
        }
      }
      
      // Copy types instead of symlinks for better compatibility
      fs.copyFileSync(
        path.join(rootDir, 'types', 'index.ts'),
        path.join(gigsTypesDir, 'index.ts')
      );
    }
    console.log('✅ Added types to vumi-gigs app');
  } catch (e) {
    console.log('⚠️ Could not add types to vumi-gigs app:', e.message);
  }
}

// Function to find files recursively
function findFiles(dir, pattern) {
  let results = [];
  
  if (!fs.existsSync(dir)) {
    return results;
  }
  
  const list = fs.readdirSync(dir);
  
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      results = results.concat(findFiles(filePath, pattern));
    } else if (pattern.test(filePath)) {
      results.push(filePath);
    }
  }
  
  return results;
}

// Function to process files
function processFiles() {
  console.log(`🔍 Processing ${filesToProcess.length} files...`);
  let fixedCount = 0;
  
  for (const filePath of filesToProcess) {
    let fileContent = fs.readFileSync(filePath, 'utf8');
    let originalContent = fileContent;
    
    // Apply unused import replacements
    for (const { regex, replacement } of unusedImports) {
      fileContent = fileContent.replace(regex, replacement);
      
      // Clean up multiple commas from import statements after replacements
      fileContent = fileContent.replace(/import\s+\{\s*,\s*/g, 'import { ');
      fileContent = fileContent.replace(/\s*,\s*,\s*/g, ', ');
      fileContent = fileContent.replace(/\{\s*,/g, '{');
      fileContent = fileContent.replace(/,\s*\}/g, ' }');
      fileContent = fileContent.replace(/\{\s+\}/g, '{ }');
    }
    
    // Add type imports
    for (const { filePattern, position, import: importStatement } of typeAdditions) {
      if (filePattern.test(filePath)) {
        if (position === 'afterImports') {
          // Find the last import statement
          const lastImportIndex = fileContent.lastIndexOf('import ');
          if (lastImportIndex !== -1) {
            // Find the end of the import statement
            const endOfImport = fileContent.indexOf('\n', lastImportIndex);
            if (endOfImport !== -1) {
              // Add new import after the last import
              fileContent = 
                fileContent.substring(0, endOfImport + 1) + 
                importStatement + 
                fileContent.substring(endOfImport + 1);
            }
          }
        }
      }
    }
    
    // Apply specific fixes for common TypeScript errors
    // Fix 1: Add optional chaining to creator properties
    fileContent = fileContent.replace(/creator\.audienceSize/g, 'creator?.audienceSize');
    fileContent = fileContent.replace(/creator\.platforms/g, 'creator?.platforms');
    fileContent = fileContent.replace(/creator\.contentTypes/g, 'creator?.contentTypes');
    fileContent = fileContent.replace(/creator\.teamSize/g, 'creator?.teamSize');
    fileContent = fileContent.replace(/creator\.equipmentOwned/g, 'creator?.equipmentOwned');
    fileContent = fileContent.replace(/creator\.specializations/g, 'creator?.specializations');
    fileContent = fileContent.replace(/creator\.availability/g, 'creator?.availability');
    
    // Check if content was modified
    if (fileContent !== originalContent) {
      fs.writeFileSync(filePath, fileContent);
      fixedCount++;
      console.log(`✅ Fixed: ${path.relative(rootDir, filePath)}`);
    }
  }
  
  console.log(`\n🎉 Fixed issues in ${fixedCount} files out of ${filesToProcess.length} processed`);
}
