import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🔧 Fixing page components with missing theme/colorMode...');

// List of page components to fix
const pageComponents = [
  'apps/vumi-gigs/src/CreatorListingPage.tsx',
  'apps/vumi-gigs/src/GigDetailPage.tsx',
  'apps/vumi-gigs/src/GigsListingPage.tsx',
  'apps/vumi-gigs/src/pages/BusinessPlansPage.tsx',
  'apps/vumi-gigs/src/pages/ProfilePage.tsx',
  'apps/vumi-gigs/src/pages/StudiosListingPage.tsx',
  'apps/vumi-gigs/src/PostGigForm.tsx'
];

pageComponents.forEach(componentPath => {
  const filePath = path.join(rootDir, componentPath);
  
  if (fs.existsSync(filePath)) {
    console.log(`Processing ${componentPath}...`);
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Check if theme or colorMode are used but not defined
    const usesTheme = content.includes('theme={theme}') || content.includes('theme: theme');
    const usesColorMode = content.includes('colorMode={colorMode}') || content.includes('colorMode: colorMode');
    
    // Check if they're already defined
    const hasThemeDefinition = content.includes('const theme =') || content.includes('theme = ') || content.includes('let theme');
    const hasColorModeDefinition = content.includes('const colorMode =') || content.includes('colorMode = ') || content.includes('let colorMode');
    
    // Find function component
    const functionMatch = content.match(/export\s+(function|const)\s+\w+/);
    
    if (functionMatch) {
      // If theme or colorMode are used but not defined, add them
      if ((usesTheme && !hasThemeDefinition) || (usesColorMode && !hasColorModeDefinition)) {
        // Find where the function body starts
        const functionBodyStart = content.indexOf('{', content.indexOf(functionMatch[0])) + 1;
        
        // Add declarations right after the function body starts
        let declarations = '';
        
        if (usesTheme && !hasThemeDefinition) {
          declarations += '\n  const theme = "gigs"; // Default theme';
        }
        
        if (usesColorMode && !hasColorModeDefinition) {
          declarations += '\n  const colorMode = "light"; // Default colorMode';
        }
        
        if (declarations) {
          content = content.slice(0, functionBodyStart) + declarations + content.slice(functionBodyStart);
          modified = true;
        }
      }
    }
    
    // If modified, write the file
    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed ${componentPath}`);
    } else {
      console.log(`ℹ️ No changes needed for ${componentPath}`);
    }
  } else {
    console.log(`⚠️ File not found: ${componentPath}`);
  }
});

// Fix all remaining issues with colorMode and theme in all files
console.log('\n🔍 Scanning for all remaining colorMode/theme issues...');

function findAllFiles(dir) {
  let results = [];
  
  if (!fs.existsSync(dir)) return results;
  
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      results = [...results, ...findAllFiles(filePath)];
    } else if (/\.(tsx|jsx)$/.test(file)) {
      results.push(filePath);
    }
  }
  
  return results;
}

// Get all TSX/JSX files in the project
const allComponents = [
  ...findAllFiles(path.join(rootDir, 'apps/vumi-gigs/src')),
  ...findAllFiles(path.join(rootDir, 'packages/ui'))
];

let fixCount = 0;

// Check each file for theme/colorMode usage
allComponents.forEach(filePath => {
  // Skip files we've already processed
  if (pageComponents.some(p => filePath.includes(p))) {
    return;
  }
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if theme or colorMode are used but not defined
    const usesTheme = (content.includes('theme={theme}') || content.includes('theme: theme')) && 
                      !content.includes('import') && 
                      !content.includes('useTheme');
                      
    const usesColorMode = (content.includes('colorMode={colorMode}') || content.includes('colorMode: colorMode')) && 
                         !content.includes('import') && 
                         !content.includes('useColorMode');
    
    // Check if they're already defined
    const hasThemeDefinition = content.includes('const theme =') || 
                             content.includes('theme = ') || 
                             content.includes('let theme');
                             
    const hasColorModeDefinition = content.includes('const colorMode =') || 
                                 content.includes('colorMode = ') || 
                                 content.includes('let colorMode');
    
    // Find function component
    const functionMatch = content.match(/export\s+(function|const)\s+\w+/);
    
    if (functionMatch && ((usesTheme && !hasThemeDefinition) || (usesColorMode && !hasColorModeDefinition))) {
      // Find where the function body starts
      const functionBodyStart = content.indexOf('{', content.indexOf(functionMatch[0])) + 1;
      
      // Add declarations right after the function body starts
      let declarations = '';
      let modified = false;
      
      if (usesTheme && !hasThemeDefinition) {
        declarations += '\n  const theme = "gigs"; // Default theme';
        modified = true;
      }
      
      if (usesColorMode && !hasColorModeDefinition) {
        declarations += '\n  const colorMode = "light"; // Default colorMode';
        modified = true;
      }
      
      if (modified) {
        const newContent = content.slice(0, functionBodyStart) + declarations + content.slice(functionBodyStart);
        fs.writeFileSync(filePath, newContent);
        fixCount++;
        console.log(`✅ Fixed ${path.relative(rootDir, filePath)}`);
      }
    }
  } catch (error) {
    console.error(`Error processing file ${filePath}: ${error.message}`);
  }
});

console.log(`\n🎉 Fixed ${fixCount} additional files with theme/colorMode issues`);
console.log('Run the app to check if all components now render correctly.');
