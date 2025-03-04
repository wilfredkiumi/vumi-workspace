import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// UI components and their required icons
const uiComponentIcons = {
  'CreatorCard.tsx': ['Star', 'MapPin', 'CheckCircle', 'Users', 'Award'],
  'GigCard.tsx': ['Clock', 'MapPin', 'Tag', 'Users', 'DollarSign'],
  'StudioCard.tsx': ['Star', 'MapPin', 'CheckCircle', 'Users', 'Award', 'Clock'],
  // Add other UI components that need icons
};

console.log('🔍 Fixing icon imports in UI package components...');
let fixedCount = 0;

// Check the UI package
const uiPath = path.join(rootDir, 'packages', 'ui');

if (fs.existsSync(uiPath)) {
  // Process each component in the UI package
  for (const [componentName, requiredIcons] of Object.entries(uiComponentIcons)) {
    const componentPath = path.join(uiPath, componentName);
    
    if (fs.existsSync(componentPath)) {
      console.log(`Processing UI component: ${componentName}`);
      let content = fs.readFileSync(componentPath, 'utf8');
      const originalContent = content;
      
      // Check for existing lucide-react import
      const lucideImportMatch = content.match(/import\s+\{([^}]*)\}\s+from\s+['"](lucide-react)['"]/);
      
      if (lucideImportMatch) {
        // Parse existing imports
        const existingImports = lucideImportMatch[1];
        const importedIcons = existingImports
          .split(',')
          .map(icon => icon.trim())
          .filter(icon => icon.length > 0);
        
        // Find missing icons
        const missingIcons = requiredIcons.filter(icon => !importedIcons.includes(icon));
        
        if (missingIcons.length > 0) {
          // Add missing icons to the existing import
          const newImport = `import { ${[...importedIcons, ...missingIcons].sort().join(', ')} } from 'lucide-react'`;
          content = content.replace(lucideImportMatch[0], newImport);
          
          fs.writeFileSync(componentPath, content, 'utf8');
          console.log(`✅ Added ${missingIcons.join(', ')} to ${componentName}`);
          fixedCount++;
        }
      } else {
        // No existing lucide-react import, add a new import
        const reactImportMatch = content.match(/import React.*?;/);
        if (reactImportMatch) {
          const newImport = `${reactImportMatch[0]}\nimport { ${requiredIcons.join(', ')} } from 'lucide-react';`;
          content = content.replace(reactImportMatch[0], newImport);
          
          fs.writeFileSync(componentPath, content, 'utf8');
          console.log(`✅ Added lucide-react import to ${componentName}`);
          fixedCount++;
        }
      }
    } else {
      console.log(`⚠️ UI component not found: ${componentName}`);
    }
  }
}

console.log(`\n🎉 Fixed icon imports in ${fixedCount} UI package files`);
console.log('Run the build again to see if the issues are resolved.');
