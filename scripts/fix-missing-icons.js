import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🔧 Fixing missing icon imports...');

// List of files to check for missing icon imports
const filesToCheck = [
  'apps/vumi-gigs/src/pages/HomePage.tsx',
  'apps/vumi-gigs/src/pages/StudioProfilePage.tsx',
  'apps/vumi-gigs/src/pages/ProfilePage.tsx',
  'apps/vumi-gigs/src/PostGigForm.tsx',
  'packages/ui/CreatorProfile.tsx'
];

// Icons to check for
const iconList = [
  'Briefcase', 'Globe', 'Award', 'Clock', 'DollarSign', 
  'Camera', 'Video', 'Lock', 'MapPin', 'X', 'Users',
  'Mail', 'Phone', 'Star', 'Building', 'MessageSquare',
  'ChevronLeft', 'ExternalLink', 'CheckCircle', 'Calendar',
  'Heart', 'Share2', 'Tag'
];

// Process each file
filesToCheck.forEach(relativePath => {
  const filePath = path.join(rootDir, relativePath);
  
  if (fs.existsSync(filePath)) {
    console.log(`Checking ${relativePath}...`);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if the file contains JSX elements with icon names
    const missingIcons = [];
    
    iconList.forEach(icon => {
      // Check if the icon is used but not imported
      if (
        (content.includes(`<${icon} `) || content.includes(`<${icon}/>`) || content.includes(`<${icon}>`)) &&
        !content.includes(`import`) && (!content.includes(`${icon},`) && !content.includes(`, ${icon}`))
      ) {
        missingIcons.push(icon);
      }
    });
    
    if (missingIcons.length > 0) {
      console.log(`Found missing icons in ${relativePath}: ${missingIcons.join(', ')}`);
      
      // Check if lucide-react is already imported
      const hasLucideImport = content.match(/import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"];/);
      
      if (hasLucideImport) {
        // Add missing icons to existing import
        const importStatement = hasLucideImport[0];
        const importedIcons = hasLucideImport[1];
        
        const newImport = `import { ${importedIcons.trim() ? importedIcons + ', ' : ''}${missingIcons.join(', ')} } from 'lucide-react';`;
        content = content.replace(importStatement, newImport);
      } else {
        // Add new import at the top of the file, after the first import
        const firstImportEndIndex = content.indexOf('\n', content.indexOf('import ')) + 1;
        const newImport = `import { ${missingIcons.join(', ')} } from 'lucide-react';\n`;
        content = content.slice(0, firstImportEndIndex) + newImport + content.slice(firstImportEndIndex);
      }
      
      // Write the updated content back to the file
      fs.writeFileSync(filePath, content);
      console.log(`✅ Added missing icon imports to ${relativePath}`);
    } else {
      console.log(`✅ No missing icon imports in ${relativePath}`);
    }
  } else {
    console.log(`⚠️ File not found: ${relativePath}`);
  }
});

// Comprehensive check for all icon usages in all files
console.log('\n🔍 Running comprehensive icon check...');

function getAllTsxFiles() {
  let results = [];
  
  const baseDirectories = [
    path.join(rootDir, 'apps/vumi-gigs/src'),
    path.join(rootDir, 'packages/ui')
  ];
  
  baseDirectories.forEach(baseDir => {
    if (!fs.existsSync(baseDir)) return;
    
    function scanDir(dir) {
      const files = fs.readdirSync(dir);
      
      for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
          scanDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.jsx')) {
          results.push(fullPath);
        }
      }
    }
    
    scanDir(baseDir);
  });
  
  return results;
}

const allTsxFiles = getAllTsxFiles();
console.log(`Found ${allTsxFiles.length} TSX files to check`);

let fixedFileCount = 0;

allTsxFiles.forEach(filePath => {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Skip already processed files
    if (filesToCheck.some(f => filePath.includes(f))) {
      return;
    }
    
    // Check for JSX tags that might be icon components
    const missingIcons = [];
    
    iconList.forEach(icon => {
      // Properly match actual component usage, not just mentions in strings or comments
      const jsxPattern = new RegExp(`<${icon}\\s+|<${icon}/>|<${icon}>`, 'g');
      
      if (
        jsxPattern.test(content) && 
        !content.includes(`import { ${icon}`) && 
        !content.includes(`import {${icon}`) && 
        !content.match(new RegExp(`import [^{]*{[^}]*${icon}[^}]*} from`))
      ) {
        missingIcons.push(icon);
      }
    });
    
    if (missingIcons.length > 0) {
      // Check if lucide-react is already imported
      const hasLucideImport = content.match(/import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"];/);
      
      if (hasLucideImport) {
        // Add missing icons to existing import
        const importStatement = hasLucideImport[0];
        const importedIcons = hasLucideImport[1];
        
        const newIcons = missingIcons.filter(icon => !importedIcons.includes(icon));
        if (newIcons.length > 0) {
          const newImport = `import { ${importedIcons.trim() ? importedIcons + ', ' : ''}${newIcons.join(', ')} } from 'lucide-react';`;
          content = content.replace(importStatement, newImport);
        }
      } else {
        // Add new import at the top of the file, after the first import
        const firstImportEndIndex = content.indexOf('\n', content.indexOf('import ')) + 1;
        const newImport = `import { ${missingIcons.join(', ')} } from 'lucide-react';\n`;
        content = content.slice(0, firstImportEndIndex) + newImport + content.slice(firstImportEndIndex);
      }
      
      // Write the updated content back to the file
      fs.writeFileSync(filePath, content);
      fixedFileCount++;
      console.log(`✅ Added missing icon imports to ${path.relative(rootDir, filePath)}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}: ${error.message}`);
  }
});

console.log(`\n🎉 Fixed ${fixedFileCount} files with missing icon imports`);
console.log('Run the app to check if the icons are now properly displayed.');
