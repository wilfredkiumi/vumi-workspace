import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// All Lucide icons used across the app
const allLucideIcons = [
  'Search', 'Filter', 'X', 'CheckSquare', 'Square', 'Clock', 'MapPin', 
  'Calendar', 'Tag', 'Users', 'FileText', 'ChevronLeft', 'Share2', 
  'Bookmark', 'Flag', 'ExternalLink', 'CheckCircle', 'Star', 'Mail', 
  'Phone', 'Link', 'Award', 'Briefcase', 'Video', 'MessageCircle', 
  'Share', 'ChevronDown', 'User', 'LogOut', 'Menu', 'Sun', 'Moon',
  'DollarSign', 'SlidersHorizontal', 'Bell', 'Globe', 'Plus', 'PlusCircle',
  'Trash2', 'Edit', 'Download', 'Copy', 'Check', 'ArrowRight', 'ArrowLeft'
];

async function findMissingIconImports() {
  console.log('🔍 Checking for missing Lucide icon imports across all files...');
  
  try {
    // Find all React component files in the project
    const files = await glob('apps/vumi-*/src/**/*.{tsx,jsx}', { cwd: rootDir });
    let fixedCount = 0;
    
    for (const filePath of files) {
      const fullPath = path.join(rootDir, filePath);
      let content = fs.readFileSync(fullPath, 'utf8');
      const originalContent = content;
      
      // Skip files that don't contain JSX
      if (!content.includes('<') || !content.includes('/>') && !content.includes('</')) {
        continue;
      }
      
      // Check if the file has a lucide-react import
      const hasLucideImport = content.includes('from \'lucide-react\'');
      
      // Get existing icon imports if any
      let existingIcons = [];
      if (hasLucideImport) {
        const importMatch = content.match(/import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"]/);
        if (importMatch) {
          existingIcons = importMatch[1].split(',').map(i => i.trim());
        }
      }
      
      // Find all used icons (that aren't already imported)
      const missingIcons = [];
      
      allLucideIcons.forEach(icon => {
        // Skip already imported icons
        if (existingIcons.includes(icon)) {
          return;
        }
        
        // Pattern for JSX usage of an icon component
        const usagePattern = new RegExp(`<${icon}[\\s/>]|<${icon}$`, 'g');
        if (usagePattern.test(content)) {
          missingIcons.push(icon);
        }
      });
      
      // If we found missing icons, update the imports
      if (missingIcons.length > 0) {
        if (hasLucideImport) {
          // Add to existing import
          const importMatch = content.match(/import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"]/);
          if (importMatch) {
            const newImport = `import { ${[...existingIcons, ...missingIcons].sort().join(', ')} } from 'lucide-react'`;
            content = content.replace(importMatch[0], newImport);
          }
        } else {
          // Add new import after the last import
          const lastImportMatch = content.match(/import.*?;/g);
          if (lastImportMatch) {
            const lastImport = lastImportMatch[lastImportMatch.length - 1];
            const lastImportPos = content.lastIndexOf(lastImport) + lastImport.length;
            
            // Add our import after the last one
            content = content.slice(0, lastImportPos) + 
                      `\nimport { ${missingIcons.sort().join(', ')} } from 'lucide-react';` + 
                      content.slice(lastImportPos);
          } else {
            // No imports - add to top of file after any comments
            content = `import { ${missingIcons.sort().join(', ')} } from 'lucide-react';\n` + content;
          }
        }
        
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`✅ Fixed missing icons in ${filePath}: ${missingIcons.join(', ')}`);
        fixedCount++;
      }
    }
    
    console.log(`\n🎉 Fixed missing icon imports in ${fixedCount} files`);
    return fixedCount;
  } catch (error) {
    console.error('❌ Error scanning files:', error);
    return 0;
  }
}

findMissingIconImports().then(count => {
  console.log('✨ Done!');
  if (count > 0) {
    console.log('Run the build again to see if the issues are resolved:');
    console.log('npm run build:ultimate-fix');
  }
});
