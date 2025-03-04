import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

async function fixColorModeIssues() {
  console.log('🔍 Checking for missing colorMode destructuring across all files...');
  
  try {
    // Find all React component files in the project
    const files = await glob('apps/vumi-*/src/**/*.{tsx,jsx}', { cwd: rootDir });
    let fixedCount = 0;
    
    for (const filePath of files) {
      const fullPath = path.join(rootDir, filePath);
      let content = fs.readFileSync(fullPath, 'utf8');
      const originalContent = content;
      
      // Check if this file uses useTheme but doesn't include colorMode
      if (content.includes('useTheme()') && !content.includes('colorMode')) {
        console.log(`Checking ${filePath}...`);
        
        // Match useTheme destructuring
        const useThemeMatch = content.match(/const\s+\{\s*([^}]*?)\s*\}\s*=\s*useTheme\(\)/);
        
        if (useThemeMatch) {
          const currentDestructuring = useThemeMatch[1];
          if (!currentDestructuring.includes('colorMode')) {
            // Add colorMode to the existing destructuring
            const newDestructuring = currentDestructuring.includes('theme') 
              ? `theme, colorMode` 
              : `colorMode${currentDestructuring.trim() ? ', ' + currentDestructuring : ''}`;
            
            content = content.replace(
              useThemeMatch[0],
              `const { ${newDestructuring} } = useTheme()`
            );
            
            fs.writeFileSync(fullPath, content, 'utf8');
            fixedCount++;
            console.log(`✅ Added colorMode to ${filePath}`);
          }
        }
        // Handle case where there might be a theme variable but no useTheme hook
        else if (content.includes('theme={theme}') || content.includes('theme: theme')) {
          // Look for the component declaration pattern
          const componentMatch = content.match(/function\s+([A-Za-z0-9_]+)/);
          if (componentMatch) {
            const componentStartPos = content.indexOf('{', content.indexOf(componentMatch[0])) + 1;
            if (componentStartPos > 0) {
              // Insert useTheme hook at the start of the component
              const insertion = '\n  const { theme, colorMode } = useTheme();';
              content = content.slice(0, componentStartPos) + insertion + content.slice(componentStartPos);
              
              // Also ensure the import exists
              if (!content.includes('import { useTheme }')) {
                // Find the last import statement
                const lastImportMatch = content.match(/import.*?;/g);
                if (lastImportMatch) {
                  const lastImport = lastImportMatch[lastImportMatch.length - 1];
                  const lastImportPos = content.lastIndexOf(lastImport) + lastImport.length;
                  
                  // Add our import after the last one
                  content = content.slice(0, lastImportPos) + 
                            '\nimport { useTheme } from \'ui\';' + 
                            content.slice(lastImportPos);
                }
              }
              
              fs.writeFileSync(fullPath, content, 'utf8');
              fixedCount++;
              console.log(`✅ Added useTheme hook with colorMode to ${filePath}`);
            }
          }
        }
      }
      
      // Specifically check for colorMode is not defined error pattern
      if (content.includes('colorMode=') || content.includes('colorMode:') || content.includes('colorMode}')) {
        if (!content.includes('colorMode') || content.includes('colorMode is not defined')) {
          // Find the component function and add colorMode to the destructuring
          const componentMatch = content.match(/function\s+([A-Za-z0-9_]+)/);
          if (componentMatch) {
            const useThemeMatch = content.match(/const\s+\{\s*([^}]*?)\s*\}\s*=\s*useTheme\(\)/);
            if (useThemeMatch && !useThemeMatch[1].includes('colorMode')) {
              // Add colorMode to existing destructuring
              const newDestructuring = useThemeMatch[1].includes('theme') 
                ? `theme, colorMode` 
                : `colorMode, ${useThemeMatch[1]}`;
              content = content.replace(
                useThemeMatch[0],
                `const { ${newDestructuring} } = useTheme()`
              );
              fs.writeFileSync(fullPath, content, 'utf8');
              fixedCount++;
              console.log(`✅ Added missing colorMode to ${filePath}`);
            } 
            else if (!useThemeMatch && content.includes('useTheme')) {
              // Add completely new destructuring
              const componentStartPos = content.indexOf('{', content.indexOf(componentMatch[0])) + 1;
              if (componentStartPos > 0) {
                const insertion = '\n  const { theme, colorMode } = useTheme();';
                content = content.slice(0, componentStartPos) + insertion + content.slice(componentStartPos);
                fs.writeFileSync(fullPath, content, 'utf8');
                fixedCount++;
                console.log(`✅ Added new useTheme with colorMode to ${filePath}`);
              }
            }
          }
        }
      }
      
      // Specifically handle the GigsListingPage
      if (filePath.includes('GigsListingPage')) {
        const themeDestructureMatch = content.match(/const\s+\{\s*theme\s*\}\s*=\s*useTheme\(\);/);
        if (themeDestructureMatch) {
          content = content.replace(
            themeDestructureMatch[0],
            'const { theme, colorMode } = useTheme();'
          );
          fs.writeFileSync(fullPath, content, 'utf8');
          fixedCount++;
          console.log(`✅ Fixed GigsListingPage colorMode issue`);
        }
      }
    }
    
    console.log(`\n🎉 Fixed colorMode issues in ${fixedCount} files`);
    return fixedCount;
    
  } catch (error) {
    console.error('❌ Error scanning files:', error);
    return 0;
  }
}

fixColorModeIssues().then(count => {
  console.log('✨ Done!');
  if (count > 0) {
    console.log('Run the build again to see if the issues are resolved:');
    console.log('npm run build:ultimate-fix');
  }
});
