import fs from 'fs';
import path from 'path';

// Define the file path
const rootDir = process.cwd();
const creatorListingPath = path.join(rootDir, 'apps/vumi-gigs/src/CreatorListingPage.tsx');

console.log('🔧 Directly fixing CreatorListingPage.tsx...');

try {
  // Check if file exists
  if (!fs.existsSync(creatorListingPath)) {
    console.error('❌ File not found:', creatorListingPath);
    process.exit(1);
  }
  
  // Read file content
  const content = fs.readFileSync(creatorListingPath, 'utf8');
  
  // Split content into lines
  const lines = content.split('\n');
  
  // Find line with colorMode reference
  const problemLineIndex = lines.findIndex(line => 
    line.includes('colorMode={colorMode}') || 
    line.includes('colorMode: colorMode')
  );
  
  if (problemLineIndex > -1) {
    console.log(`Found problem line: ${lines[problemLineIndex].trim()}`);
    
    // Find the component function definition
    const componentDefIndex = lines.findIndex(line => 
      line.includes('function CreatorListingPage') || 
      line.includes('const CreatorListingPage')
    );
    
    if (componentDefIndex > -1) {
      console.log(`Found component definition at line ${componentDefIndex + 1}`);
      
      // Find opening brace of component function
      let braceIndex = componentDefIndex;
      while (braceIndex < lines.length && !lines[braceIndex].includes('{')) {
        braceIndex++;
      }
      
      if (braceIndex < lines.length) {
        // Insert colorMode declaration after opening brace
        lines.splice(braceIndex + 1, 0, '  const colorMode = "light"; // Default colorMode');
        lines.splice(braceIndex + 2, 0, '  const theme = "gigs"; // Default theme');
        
        // Write updated content back to file
        fs.writeFileSync(creatorListingPath, lines.join('\n'));
        console.log('✅ Added colorMode and theme declarations to CreatorListingPage.tsx');
      } else {
        console.error('❌ Could not find opening brace of component function');
      }
    } else {
      console.error('❌ Could not find component function definition');
    }
  } else {
    console.log('ℹ️ No colorMode reference found in file');
  }
} catch (error) {
  console.error('❌ Error:', error);
  process.exit(1);
}

console.log('✅ Done');
