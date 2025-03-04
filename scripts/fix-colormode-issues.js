import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// List of files to check for colorMode issues
const filesToCheck = [
  'apps/vumi-gigs/src/components/Layout.tsx',
  // Add more files if needed
];

console.log('🔍 Checking for missing colorMode destructuring...');
let fixedCount = 0;

for (const relativeFilePath of filesToCheck) {
  const filePath = path.join(rootDir, relativeFilePath);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Fix case where theme is destructured but colorMode is missing
    if (content.includes('const { theme } = useTheme()') && !content.includes('colorMode')) {
      content = content.replace(
        'const { theme } = useTheme()',
        'const { theme, colorMode } = useTheme()'
      );
    }
    
    // Fix case where useTheme is imported but not destructured properly
    if (content.includes('useTheme') && !content.includes('colorMode') && content.includes('colorMode is not defined')) {
      // Look for useTheme usage pattern
      const useThemeMatch = content.match(/const\s+\{\s*([^}]*)\s*\}\s*=\s*useTheme\(\)/);
      if (useThemeMatch) {
        const currentDestructuring = useThemeMatch[1];
        if (!currentDestructuring.includes('colorMode')) {
          content = content.replace(
            `const { ${currentDestructuring} } = useTheme()`,
            `const { ${currentDestructuring}, colorMode } = useTheme()`
          );
        }
      } else {
        // If we can't find the exact pattern, just add it near the top of the component
        const componentStart = content.match(/export\s+function\s+([A-Za-z0-9_]+)/);
        if (componentStart) {
          const insertPoint = content.indexOf('{', content.indexOf(componentStart[0])) + 1;
          if (insertPoint > 0) {
            content = 
              content.slice(0, insertPoint) + 
              '\n  const { colorMode } = useTheme();' +
              content.slice(insertPoint);
          }
        }
      }
    }
    
    // Fix where theme and colorMode are destructured, but setColorMode is also needed
    if (content.includes('const { theme, colorMode }') && content.includes('setColorMode') && !content.includes('setColorMode }')) {
      content = content.replace(
        'const { theme, colorMode }',
        'const { theme, colorMode, setColorMode }'
      );
    }
    
    // If content was changed, write it back
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed colorMode issues in ${relativeFilePath}`);
      fixedCount++;
    } else {
      console.log(`ℹ️ No issues found in ${relativeFilePath}`);
    }
  } else {
    console.log(`⚠️ File not found: ${relativeFilePath}`);
  }
}

console.log(`\n🔧 Fixed colorMode issues in ${fixedCount} files`);
