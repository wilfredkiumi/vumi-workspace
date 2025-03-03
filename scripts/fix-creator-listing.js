import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Path to the CreatorListingPage file
const creatorListingPath = path.join(rootDir, 'apps/vumi-gigs/src/CreatorListingPage.tsx');

console.log('🔧 Fixing colorMode reference in CreatorListingPage.tsx...');

if (fs.existsSync(creatorListingPath)) {
  let content = fs.readFileSync(creatorListingPath, 'utf8');
  
  // Check if colorMode is referenced but not defined
  if (content.includes('colorMode={colorMode}') && !content.includes('const colorMode =') && !content.includes('colorMode =')) {
    // Find the component function
    const componentMatch = content.match(/export\s+(?:function|const)\s+CreatorListingPage/);
    
    if (componentMatch) {
      // Find where the function body starts
      const functionBodyStart = content.indexOf('{', content.indexOf(componentMatch[0])) + 1;
      
      // Add colorMode constant declaration right after the function body starts
      const newContent = 
        content.slice(0, functionBodyStart) + 
        '\n  // Default colorMode for component props\n  const colorMode = "light";\n' + 
        content.slice(functionBodyStart);
      
      fs.writeFileSync(creatorListingPath, newContent);
      console.log('✅ Added colorMode declaration to CreatorListingPage.tsx');
    } else {
      console.log('⚠️ Could not find component function in CreatorListingPage.tsx');
    }
  } else if (content.includes('const colorMode =') || content.includes('colorMode =')) {
    console.log('ℹ️ colorMode already defined in CreatorListingPage.tsx');
  } else {
    console.log('ℹ️ No colorMode reference found in CreatorListingPage.tsx');
  }
} else {
  console.log('⚠️ CreatorListingPage.tsx not found');
}

// Check for theme reference too
if (fs.existsSync(creatorListingPath)) {
  let content = fs.readFileSync(creatorListingPath, 'utf8');
  
  // If theme is referenced but not defined, add it too
  if (content.includes('theme={theme}') && !content.includes('const theme =') && !content.includes('theme =') && !content.includes('{ theme }')) {
    // Get updated content after possibly adding colorMode
    content = fs.readFileSync(creatorListingPath, 'utf8');
    
    // Find colorMode declaration we just added
    const colorModeIndex = content.indexOf('const colorMode =');
    if (colorModeIndex > -1) {
      // Insert theme declaration after colorMode
      const lineEndIndex = content.indexOf('\n', colorModeIndex) + 1;
      const newContent = 
        content.slice(0, lineEndIndex) + 
        '  const theme = "gigs"; // Default theme for component props\n' + 
        content.slice(lineEndIndex);
      
      fs.writeFileSync(creatorListingPath, newContent);
      console.log('✅ Added theme declaration to CreatorListingPage.tsx');
    }
  }
}

// Additional check for the specific component line that might be causing the error
if (fs.existsSync(creatorListingPath)) {
  let content = fs.readFileSync(creatorListingPath, 'utf8');
  
  // Look for line 323 (approximate) with colorMode
  const lines = content.split('\n');
  const problemLineIndex = lines.findIndex(line => 
    line.includes('colorMode={colorMode}') && 
    (line.includes('<Card') || line.includes('colorMode:') || line.includes('theme:'))
  );
  
  if (problemLineIndex > -1) {
    console.log(`Found potential problem line at index ${problemLineIndex + 1}: ${lines[problemLineIndex].trim()}`);
    
    // Check if we need to handle this line specifically
    if (lines[problemLineIndex].includes('<Card theme={theme} colorMode={colorMode}')) {
      console.log('🔧 The line appears to be a Card component with colorMode prop');
      // Nothing specific to fix here as we've already added the colorMode declaration
    } else if (lines[problemLineIndex].includes('colorMode: colorMode')) {
      console.log('🔧 The line appears to be an object with colorMode property');
      // Nothing specific to fix here as we've already added the colorMode declaration
    }
  }
}

console.log('\n✅ Fixed references in CreatorListingPage.tsx');
console.log('Run the app to check if the component now renders correctly.');
