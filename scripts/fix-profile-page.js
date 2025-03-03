import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Path to the ProfilePage file
const profilePagePath = path.join(rootDir, 'apps/vumi-gigs/src/pages/ProfilePage.tsx');

console.log('🔧 Fixing duplicate theme declaration in ProfilePage.tsx...');

if (fs.existsSync(profilePagePath)) {
  let content = fs.readFileSync(profilePagePath, 'utf8');
  
  // Check for the pattern of duplicate theme declaration
  if (content.includes('const theme = "gigs";') && content.includes('const { theme } = useTheme();')) {
    // Remove the manually added theme constant
    content = content.replace(/\s*const theme = "gigs";\s*\/\/\s*Default theme/, '');
    
    // Check if we need to keep colorMode
    if (content.includes('colorMode={colorMode}') && !content.match(/const\s*{\s*[^}]*colorMode[^}]*\s*}\s*=/)) {
      // Keep only colorMode declaration
      content = content.replace(
        /const colorMode = "light";\s*\/\/\s*Default colorMode/,
        'const colorMode = "light"; // Default colorMode'
      );
    } else {
      // Remove colorMode declaration if not needed or if it's already provided by a hook
      content = content.replace(/\s*const colorMode = "light";\s*\/\/\s*Default colorMode/, '');
    }
    
    fs.writeFileSync(profilePagePath, content);
    console.log('✅ Fixed duplicate theme declaration in ProfilePage.tsx');
  } else {
    console.log('ℹ️ No duplicate theme declaration found in ProfilePage.tsx');
  }
} else {
  console.log('⚠️ ProfilePage.tsx not found');
}

// Also check other files for similar issues
console.log('\n🔍 Checking other files for similar issues...');

// Function to find all TypeScript/React files
function findTsxFiles(dir) {
  const results = [];
  
  try {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        results.push(...findTsxFiles(filePath));
      } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
        results.push(filePath);
      }
    }
  } catch (err) {
    console.error(`Error reading directory ${dir}: ${err.message}`);
  }
  
  return results;
}

const srcDir = path.join(rootDir, 'apps/vumi-gigs/src');
const uiDir = path.join(rootDir, 'packages/ui');

// Get all TSX files
const tsxFiles = [
  ...findTsxFiles(srcDir),
  ...findTsxFiles(uiDir)
];

let fixCount = 0;

// Process each file
tsxFiles.forEach(filePath => {
  // Skip the ProfilePage we already fixed
  if (filePath === profilePagePath) return;
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check for duplicate theme declarations
    if (content.includes('const theme = "gigs";') && content.includes('const { theme } = useTheme();')) {
      // Remove the manually added theme constant
      let updatedContent = content.replace(/\s*const theme = "gigs";\s*\/\/\s*Default theme/, '');
      
      // Check if we need to keep colorMode
      if (updatedContent.includes('colorMode={colorMode}') && !updatedContent.match(/const\s*{\s*[^}]*colorMode[^}]*\s*}\s*=/)) {
        // Keep only colorMode declaration
        updatedContent = updatedContent.replace(
          /const colorMode = "light";\s*\/\/\s*Default colorMode/,
          'const colorMode = "light"; // Default colorMode'
        );
      } else {
        // Remove colorMode declaration if not needed or if it's already provided by a hook
        updatedContent = updatedContent.replace(/\s*const colorMode = "light";\s*\/\/\s*Default colorMode/, '');
      }
      
      fs.writeFileSync(filePath, updatedContent);
      fixCount++;
      console.log(`✅ Fixed duplicate theme declaration in ${path.relative(rootDir, filePath)}`);
    }
    
    // Check for other conflicting variables
    const varDeclarations = content.match(/const\s+([a-zA-Z0-9_]+)\s*=/g);
    if (varDeclarations) {
      const varNames = varDeclarations.map(d => d.replace(/const\s+/, '').replace(/\s*=/, ''));
      const uniqueVars = new Set(varNames);
      
      // If there are fewer unique variables than declarations, we have duplicates
      if (uniqueVars.size < varNames.length) {
        // Find duplicates
        const duplicates = {};
        varNames.forEach(name => {
          duplicates[name] = (duplicates[name] || 0) + 1;
        });
        
        // Get names of duplicate variables
        const duplicateNames = Object.entries(duplicates)
          .filter(([_, count]) => count > 1)
          .map(([name]) => name);
        
        if (duplicateNames.length > 0) {
          console.log(`⚠️ Possible duplicate variable declarations in ${path.relative(rootDir, filePath)}: ${duplicateNames.join(', ')}`);
        }
      }
    }
  } catch (err) {
    console.error(`Error processing file ${filePath}: ${err.message}`);
  }
});

console.log(`\n🎉 Fixed ${fixCount} additional files with duplicate theme declarations`);
console.log('Run tsc to check for remaining issues.');
