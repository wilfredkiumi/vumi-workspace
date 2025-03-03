import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Homepage file path
const homepageFile = path.join(rootDir, 'apps/vumi-gigs/src/pages/HomePage.tsx');

console.log('🔧 Fixing HomePage icon imports...');

if (fs.existsSync(homepageFile)) {
  let content = fs.readFileSync(homepageFile, 'utf8');
  
  // Check for missing icons
  const missingIcons = [];
  ['Briefcase', 'Zap', 'Award'].forEach(icon => {
    if (content.includes(`<${icon}`) && !content.includes(`${icon},`) && !content.includes(`, ${icon}`)) {
      missingIcons.push(icon);
    }
  });
  
  if (missingIcons.length > 0) {
    console.log(`Found missing icons in HomePage: ${missingIcons.join(', ')}`);
    
    // Check if lucide-react is already imported
    const lucideImportMatch = content.match(/import\s+\{\s*([^}]+)\s*\}\s+from\s+['"]lucide-react['"];/);
    
    if (lucideImportMatch) {
      // Add missing icons to existing import
      const importLine = lucideImportMatch[0];
      const importedIcons = lucideImportMatch[1];
      
      const newImportLine = `import { ${importedIcons}, ${missingIcons.join(', ')} } from 'lucide-react';`;
      content = content.replace(importLine, newImportLine);
    } else {
      // Add new import statement
      const insertPoint = content.indexOf('\n', content.indexOf('import ')) + 1;
      content = content.slice(0, insertPoint) + 
        `import { ${missingIcons.join(', ')} } from 'lucide-react';\n` + 
        content.slice(insertPoint);
    }
    
    // Write updated content
    fs.writeFileSync(homepageFile, content);
    console.log('✅ Added missing icon imports to HomePage');
  } else {
    console.log('✅ No missing icon imports found in HomePage');
  }
} else {
  console.log('⚠️ HomePage file not found');
}

// Also check for missing imports in all other components
console.log('\n🔍 Checking all components for missing icon imports...');

const checkFiles = [
  'apps/vumi-gigs/src/pages',
  'apps/vumi-gigs/src/components',
  'packages/ui/components'
];

let fixedFiles = 0;
const iconList = ['Briefcase', 'Zap', 'Award', 'Clock', 'DollarSign', 'Camera', 'Video', 'Lock', 'MapPin', 'X', 'Users', 'Mail', 'Phone', 'Star', 'Building', 'MessageSquare', 'ChevronLeft', 'ExternalLink', 'CheckCircle', 'Calendar'];

function scanDirectory(dir) {
  try {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        scanDirectory(filePath);
      } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
        checkAndFixFile(filePath);
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dir}: ${error.message}`);
  }
}

function checkAndFixFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const missingIcons = [];
    
    // Skip files that don't use JSX
    if (!content.includes('<') || !content.includes('>')) {
      return;
    }
    
    // Check for each icon usage
    iconList.forEach(icon => {
      const usagePattern = new RegExp(`<${icon}[\\s/>]`);
      const importPattern = new RegExp(`import[\\s\\S]*?{[\\s\\S]*?${icon}[\\s\\S]*?}[\\s\\S]*?from[\\s\\S]*?['"]lucide-react['"]`);
      
      if (usagePattern.test(content) && !importPattern.test(content)) {
        missingIcons.push(icon);
      }
    });
    
    if (missingIcons.length > 0) {
      let updatedContent = content;
      const lucideImportMatch = content.match(/import\s+\{\s*([^}]+)\s*\}\s+from\s+['"]lucide-react['"];/);
      
      if (lucideImportMatch) {
        // Add to existing import
        const importLine = lucideImportMatch[0];
        const importedIcons = lucideImportMatch[1];
        
        // Don't add duplicates
        const uniqueIcons = missingIcons.filter(icon => 
          !importedIcons.includes(icon)
        );
        
        if (uniqueIcons.length > 0) {
          const newImportLine = `import { ${importedIcons}, ${uniqueIcons.join(', ')} } from 'lucide-react';`;
          updatedContent = content.replace(importLine, newImportLine);
        }
      } else {
        // Add new import
        const importMatch = content.match(/import\s+.*from\s+['"][^'"]+['"];/);
        if (importMatch) {
          const importEnd = content.indexOf(importMatch[0]) + importMatch[0].length;
          updatedContent = content.slice(0, importEnd) + 
            `\nimport { ${missingIcons.join(', ')} } from 'lucide-react';` + 
            content.slice(importEnd);
        } else {
          // If no imports found at all, add at the top
          updatedContent = `import { ${missingIcons.join(', ')} } from 'lucide-react';\n` + content;
        }
      }
      
      if (updatedContent !== content) {
        fs.writeFileSync(filePath, updatedContent);
        fixedFiles++;
        console.log(`✅ Added missing icons to ${path.relative(rootDir, filePath)}`);
      }
    }
  } catch (error) {
    console.error(`Error processing file ${filePath}: ${error.message}`);
  }
}

// Scan all directories
checkFiles.forEach(dir => {
  const fullPath = path.join(rootDir, dir);
  if (fs.existsSync(fullPath)) {
    scanDirectory(fullPath);
  }
});

console.log(`\n🎉 Fixed ${fixedFiles} files with missing icon imports`);
console.log('Run the app to check if the icons are now properly displayed.');
