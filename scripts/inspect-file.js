import fs from 'fs';
import path from 'path';

// Define the file path
const rootDir = process.cwd();
const filePath = path.join(rootDir, 'apps/vumi-gigs/src/CreatorListingPage.tsx');

console.log('🔍 Inspecting CreatorListingPage.tsx...');

try {
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    console.error('❌ File not found:', filePath);
    process.exit(1);
  }
  
  // Read file content
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Split content into lines
  const lines = content.split('\n');
  
  // Find lines around 323
  const startLine = Math.max(0, 318);
  const endLine = Math.min(lines.length - 1, 328);
  
  console.log(`\nContent around line 323 (lines ${startLine+1}-${endLine+1}):`);
  console.log('-----------------------------------------------');
  for (let i = startLine; i <= endLine; i++) {
    console.log(`${i+1}: ${lines[i]}`);
  }
  
  // Find component definition
  const componentDefLine = lines.findIndex(line => 
    line.includes('function CreatorListingPage') || 
    line.includes('const CreatorListingPage')
  );
  
  if (componentDefLine > -1) {
    console.log(`\nComponent definition (line ${componentDefLine+1}):`);
    console.log('-----------------------------------------------');
    console.log(lines[componentDefLine]);
    
    // Print a few lines after component definition
    const compDefContext = Math.min(lines.length - 1, componentDefLine + 5);
    for (let i = componentDefLine + 1; i <= compDefContext; i++) {
      console.log(lines[i]);
    }
  }
  
  // Check for any explicit colorMode uses or definitions
  const colorModeLines = [];
  lines.forEach((line, index) => {
    if (line.includes('colorMode')) {
      colorModeLines.push({ line: index + 1, content: line.trim() });
    }
  });
  
  if (colorModeLines.length > 0) {
    console.log('\nLines containing "colorMode":');
    console.log('-----------------------------------------------');
    colorModeLines.forEach(({ line, content }) => {
      console.log(`${line}: ${content}`);
    });
  }
} catch (error) {
  console.error('❌ Error:', error);
}
