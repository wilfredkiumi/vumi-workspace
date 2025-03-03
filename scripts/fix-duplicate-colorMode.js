import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const filePath = path.join(rootDir, 'apps/vumi-gigs/src/CreatorListingPage.tsx');

console.log('🔧 Fixing duplicate colorMode declaration in CreatorListingPage.tsx...');

try {
  // Read the file
  if (!fs.existsSync(filePath)) {
    console.error('❌ File not found:', filePath);
    process.exit(1);
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Split the content by lines
  const lines = content.split('\n');
  
  // Find duplicate colorMode declarations
  let foundCount = 0;
  const colorModeLines = [];
  
  lines.forEach((line, index) => {
    if (line.trim().startsWith('const colorMode =')) {
      foundCount++;
      colorModeLines.push(index);
    }
  });
  
  console.log(`Found ${foundCount} colorMode declarations at lines: ${colorModeLines.map(i => i + 1).join(', ')}`);
  
  if (foundCount > 1) {
    // Keep only the first declaration and remove duplicates
    const newLines = [...lines];
    
    // Start from the second occurrence (index 1 in the array)
    for (let i = 1; i < colorModeLines.length; i++) {
      newLines[colorModeLines[i]] = ''; // Replace with empty line
    }
    
    // Write the updated content back
    fs.writeFileSync(filePath, newLines.filter(line => line !== '').join('\n'));
    console.log('✅ Removed duplicate colorMode declarations');
  }
  
  // Also check for duplicate theme declarations
  foundCount = 0;
  const themeLines = [];
  
  lines.forEach((line, index) => {
    if (line.trim().startsWith('const theme =') && !line.includes('useTheme')) {
      foundCount++;
      themeLines.push(index);
    }
  });
  
  console.log(`Found ${foundCount} theme declarations at lines: ${themeLines.map(i => i + 1).join(', ')}`);
  
  if (foundCount > 1) {
    // Read the file again (in case it was modified)
    const updatedContent = fs.readFileSync(filePath, 'utf8');
    const updatedLines = updatedContent.split('\n');
    
    // Keep only the first declaration and remove duplicates
    const newLines = [...updatedLines];
    
    // Start from the second occurrence (index 1 in the array)
    for (let i = 1; i < themeLines.length; i++) {
      newLines[themeLines[i]] = ''; // Replace with empty line
    }
    
    // Write the updated content back
    fs.writeFileSync(filePath, newLines.filter(line => line !== '').join('\n'));
    console.log('✅ Removed duplicate theme declarations');
  }
  
  // Check for destructured theme from useTheme - when this exists, we don't want a constant
  const useThemeMatch = lines.some(line => line.includes('const { theme } = useTheme()'));
  
  if (useThemeMatch && themeLines.length > 0) {
    // Read the file again (in case it was modified)
    const updatedContent = fs.readFileSync(filePath, 'utf8');
    const updatedLines = updatedContent.split('\n');
    
    // Find and remove all direct theme declarations since useTheme provides it
    const newLines = updatedLines.filter(line => !line.trim().startsWith('const theme ='));
    
    // Write the updated content back
    fs.writeFileSync(filePath, newLines.join('\n'));
    console.log('✅ Removed explicit theme declarations in favor of useTheme');
  }
  
  console.log('✅ Done fixing CreatorListingPage.tsx');
} catch (error) {
  console.error('❌ Error:', error);
  process.exit(1);
}
