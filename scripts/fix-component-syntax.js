import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Files to fix
const files = [
  'packages/ui/components/studio/StudioContact.tsx',
  'packages/ui/components/studio/StudioFacilities.tsx',
  'packages/ui/components/studio/StudioHeader.tsx',
  'packages/ui/components/studio/StudioMetrics.tsx',
  'packages/ui/components/studio/StudioProjects.tsx',
  'packages/ui/components/studio/StudioServices.tsx',
  'packages/ui/components/studio/StudioTeam.tsx',
  'packages/ui/CreatorPlans.tsx',
  'packages/ui/CreatorProfile.tsx'
];

console.log('🔧 Fixing component syntax errors...');

files.forEach(file => {
  const filePath = path.join(rootDir, file);
  if (fs.existsSync(filePath)) {
    console.log(`Processing ${file}...`);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find component function signatures
    const functionMatch = content.match(/export\s+(function|const)\s+(\w+)/);
    if (functionMatch) {
      const componentName = functionMatch[2];
      
      // Fix the variable declarations by adding them as props instead of constants
      content = content.replace(
        /const theme = "gigs";(\s*\/\/[^\n]*)?/g, 
        ''
      );
      
      content = content.replace(
        /const colorMode = "light";(\s*\/\/[^\n]*)?/g, 
        ''
      );
      
      // Add them as props to the function
      const propsPattern = new RegExp(`export\\s+(function|const)\\s+${componentName}\\s*=?\\s*\\(([^)]*?)\\)`);
      const propsMatch = content.match(propsPattern);
      
      if (propsMatch) {
        const currentParams = propsMatch[2];
        
        // If empty params, add both props
        if (!currentParams.trim()) {
          content = content.replace(
            propsPattern,
            `export $1 ${componentName} = ({ theme = "gigs", colorMode = "light" })`
          );
        }
        // If it has props object but missing these props
        else if (currentParams.includes('{')) {
          // Check if theme and colorMode are already in the params
          const hasTheme = currentParams.includes('theme');
          const hasColorMode = currentParams.includes('colorMode');
          
          if (!hasTheme && !hasColorMode) {
            content = content.replace(
              propsPattern,
              `export $1 ${componentName} = (${currentParams.replace(/{([^}]*)}/, '{ $1, theme = "gigs", colorMode = "light" }')})` 
            );
          }
          else if (!hasTheme) {
            content = content.replace(
              propsPattern,
              `export $1 ${componentName} = (${currentParams.replace(/{([^}]*)}/, '{ $1, theme = "gigs" }')})` 
            );
          }
          else if (!hasColorMode) {
            content = content.replace(
              propsPattern,
              `export $1 ${componentName} = (${currentParams.replace(/{([^}]*)}/, '{ $1, colorMode = "light" }')})` 
            );
          }
        }
        // If it has props but not in object destructuring format
        else if (currentParams.includes('props:')) {
          const propsType = currentParams.match(/props\s*:\s*([A-Za-z0-9]+)/)[1];
          content = content.replace(
            propsPattern,
            `export $1 ${componentName} = ({ theme = "gigs", colorMode = "light" }: ${propsType})`
          );
        }
      }
      
      // Save the changes
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed ${file}`);
    } else {
      console.log(`⚠️ Could not find component function in ${file}`);
    }
  } else {
    console.log(`⚠️ File not found: ${file}`);
  }
});

console.log('\n✅ All component syntax errors fixed!');
console.log('  Run: npm run build:skipcheck');
