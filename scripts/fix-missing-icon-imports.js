import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// Map of components to their required Lucide icons
const componentIconMap = {
  'CreatorCard.tsx': ['Star', 'MapPin', 'CheckCircle', 'Users', 'Award'],
  'GigDetailPage.tsx': ['Clock', 'MapPin', 'Calendar', 'Tag', 'Users', 'FileText', 'ChevronLeft', 'Share2', 'Bookmark', 'Flag', 'ExternalLink', 'CheckCircle', 'Star', 'DollarSign'],
  'CreatorProfilePage.tsx': ['User', 'Mail', 'Phone', 'MapPin', 'Calendar', 'Link', 'Award', 'Briefcase', 'Star', 'CheckCircle', 'Video', 'MessageCircle', 'Share', 'Flag', 'ChevronLeft', 'Users', 'Clock', 'Globe', 'DollarSign'],
};

console.log('🔍 Checking for missing icon imports...');
let fixedCount = 0;

// Process each component and fix missing imports
for (const [componentName, requiredIcons] of Object.entries(componentIconMap)) {
  // Search for the component file in multiple possible locations
  const possiblePaths = [
    path.join(rootDir, 'apps', 'vumi-gigs', 'src', 'components', componentName),
    path.join(rootDir, 'apps', 'vumi-gigs', 'src', componentName),
    path.join(rootDir, 'packages', 'ui', 'components', componentName),
    path.join(rootDir, 'packages', 'ui', componentName),
  ];
  
  const filePath = possiblePaths.find(p => fs.existsSync(p));
  
  if (filePath) {
    console.log(`Processing ${path.relative(rootDir, filePath)}`);
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Check for existing lucide-react import
    const lucideImportMatch = content.match(/import\s+\{([^}]*)\}\s+from\s+['"](lucide-react)['"]/);
    
    if (lucideImportMatch) {
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
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Added ${missingIcons.join(', ')} to existing imports in ${componentName}`);
        fixedCount++;
      } else {
        console.log(`✓ All required icons already imported in ${componentName}`);
      }
    } else {
      // No existing lucide-react import, add a new import statement after the first import
      const firstImportMatch = content.match(/import\s+.*?;/);
      if (firstImportMatch) {
        const newImport = `${firstImportMatch[0]}\nimport { ${requiredIcons.join(', ')} } from 'lucide-react';`;
        content = content.replace(firstImportMatch[0], newImport);
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Added new import for ${requiredIcons.join(', ')} in ${componentName}`);
        fixedCount++;
      }
    }
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`📝 Updated ${componentName}`);
    }
  } else {
    console.log(`⚠️ Could not find ${componentName}`);
  }
}

console.log(`\n🎉 Fixed icon imports in ${fixedCount} files`);
