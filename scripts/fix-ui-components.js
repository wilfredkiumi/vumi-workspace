import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Files with theme/colorMode props
const studioComponentFiles = [
  'components/studio/StudioContact.tsx',
  'components/studio/StudioFacilities.tsx',
  'components/studio/StudioHeader.tsx',
  'components/studio/StudioMetrics.tsx',
  'components/studio/StudioProjects.tsx',
  'components/studio/StudioServices.tsx',
  'components/studio/StudioTeam.tsx',
  'CreatorCard.tsx',
  'CreatorPlans.tsx',
  'CreatorProfile.tsx',
  'ProjectCard.tsx',
  'ShowcaseCard.tsx',
  'StudioCard.tsx',
];

studioComponentFiles.forEach(file => {
  const filePath = path.join(rootDir, 'packages/ui', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add theme and colorMode definition at the top of the component
    if (content.includes('theme={theme}') || content.includes('colorMode={colorMode}')) {
      // Find the component definition
      const componentDefMatch = content.match(/export\s+(function|const)\s+(\w+)\s*(?:=|:)/);
      if (componentDefMatch) {
        const componentStart = componentDefMatch.index;
        const propsEndIndex = content.indexOf(')', componentStart);
        
        // Add theme and colorMode props if not there already
        if (!content.includes('theme', componentStart) || !content.includes('colorMode', componentStart)) {
          const insertPoint = propsEndIndex;
          let propsList = [];
          
          if (!content.includes('theme', componentStart) && content.includes('theme={theme}')) {
            propsList.push('theme = "gigs"');
          }
          
          if (!content.includes('colorMode', componentStart) && content.includes('colorMode={colorMode}')) {
            propsList.push('colorMode = "light"');
          }
          
          if (propsList.length > 0) {
            const propsToAdd = propsList.join(', ');
            content = content.slice(0, insertPoint) + 
              (content[insertPoint - 1] === '(' ? ' ' + propsToAdd + ' ' : ', ' + propsToAdd + ' ') +
              content.slice(insertPoint);
          }
        }
      }
    }
    
    // Add imports for missing icons
    const missingIcons = [];
    if (content.includes('<Globe') && !content.includes("Globe, ") && !content.includes(", Globe"))
      missingIcons.push('Globe');
    if (content.includes('<Award') && !content.includes("Award, ") && !content.includes(", Award"))
      missingIcons.push('Award');
    if (content.includes('<Clock') && !content.includes("Clock, ") && !content.includes(", Clock"))
      missingIcons.push('Clock');
    if (content.includes('<Camera') && !content.includes("Camera, ") && !content.includes(", Camera"))
      missingIcons.push('Camera');
    if (content.includes('<Video') && !content.includes("Video, ") && !content.includes(", Video"))
      missingIcons.push('Video');
    if (content.includes('<Lock') && !content.includes("Lock, ") && !content.includes(", Lock")) 
      missingIcons.push('Lock');
    if (content.includes('<DollarSign') && !content.includes("DollarSign, ") && !content.includes(", DollarSign"))
      missingIcons.push('DollarSign');
    
    if (missingIcons.length > 0) {
      // Find lucide-react import
      const lucideImportMatch = content.match(/import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"];/);
      if (lucideImportMatch) {
        const importStart = lucideImportMatch.index;
        const importContentStart = importStart + lucideImportMatch[0].indexOf('{') + 1;
        const importContentEnd = importStart + lucideImportMatch[0].indexOf('}');
        
        // Add missing icons to import
        const currentImports = lucideImportMatch[1];
        const newImports = currentImports + (currentImports.trim().endsWith(',') ? ' ' : ', ') + missingIcons.join(', ');
        
        content = content.slice(0, importContentStart) + 
                  newImports +
                  content.slice(importContentEnd);
      } else {
        // Add new import if not found
        const importStatement = `import { ${missingIcons.join(', ')} } from 'lucide-react';\n`;
        content = importStatement + content;
      }
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed ${file}`);
  } else {
    console.log(`⚠️ File not found: ${file}`);
  }
});

// Fix ThemeContext in index.tsx
const indexPath = path.join(rootDir, 'packages/ui', 'index.tsx');
if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf8');
  
  // Fix ThemeContext provider
  content = content.replace(
    /<ThemeContext.Provider value={{ theme, setTheme, setColorMode }}>/g,
    '<ThemeContext.Provider value={{ theme, colorMode, setTheme, setColorMode }}>'
  );
  
  fs.writeFileSync(indexPath, content);
  console.log('✅ Fixed ThemeContext in index.tsx');
}

console.log('\n🎉 Fixed UI components');
