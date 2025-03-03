import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🔧 Fixing duplicate const in CreatorListingPage.tsx...');

const filePath = path.join(rootDir, 'apps/vumi-gigs/src/CreatorListingPage.tsx');

if (!fs.existsSync(filePath)) {
  console.error('❌ File not found:', filePath);
  process.exit(1);
}

try {
  // Read the file content
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix the duplicate useState initialization
  // Look for the pattern where there's a duplicate const declaration
  const duplicatePattern = /const \[filters, setFilters\] = useState<CreatorFilter>\(\{\s+const \[filters, setFilters\] = useState<CreatorFilter>\(\{/;
  
  if (content.match(duplicatePattern)) {
    // Replace the double declaration with a single one
    content = content.replace(
      duplicatePattern,
      'const [filters, setFilters] = useState<CreatorFilter>({'
    );
    
    console.log('✅ Fixed duplicate useState declaration');
  } else {
    // Alternative pattern to look for
    const altPattern = /const \[filters, setFilters\] = useState<CreatorFilter>\(\{\s+/;
    const match = content.match(altPattern);
    
    if (match) {
      // Get the position of the match
      const matchIndex = match.index + match[0].length;
      
      // Check if there's a nested const declaration
      const afterMatch = content.substring(matchIndex, matchIndex + 100);
      if (afterMatch.trim().startsWith('const [filters,')) {
        // Extract just the useState parameters
        const parts = content.split(altPattern);
        if (parts.length >= 2) {
          const beforePart = parts[0];
          let afterPart = parts[1];
          
          // Remove the duplicate const declaration
          afterPart = afterPart.replace(/^\s*const \[filters, setFilters\] = useState<CreatorFilter>\(\{/, '');
          
          // Reconstruct the content
          content = beforePart + 
            'const [filters, setFilters] = useState<CreatorFilter>({' + 
            afterPart;
            
          console.log('✅ Fixed alternative duplicate useState declaration');
        }
      }
    }
  }
  
  // Write the modified content back to the file
  fs.writeFileSync(filePath, content);
  
  // Further cleanup - check for line-by-line issues
  console.log('🔍 Performing line-by-line cleanup...');
  
  // Read the updated content
  content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  // Process each line
  let modified = false;
  let inFiltersDeclaration = false;
  let foundFirstClosingBrace = false;
  
  for (let i = 0; i < lines.length; i++) {
    // Look for the start of the filters declaration
    if (lines[i].includes('const [filters, setFilters] = useState<CreatorFilter>({')) {
      inFiltersDeclaration = true;
    }
    
    // If we're inside the filters declaration
    if (inFiltersDeclaration) {
      // Look for a duplicate const declaration
      if (lines[i].trim().startsWith('const [filters,') && i > 0 && lines[i-1].includes('useState')) {
        lines[i] = ''; // Remove this line
        modified = true;
        console.log(`✅ Removed duplicate declaration at line ${i+1}`);
      }
      
      // Look for closing brace
      if (lines[i].includes('});')) {
        if (!foundFirstClosingBrace) {
          foundFirstClosingBrace = true;
        } else {
          // This is a duplicate closing brace
          lines[i] = ''; // Remove this line
          modified = true;
          console.log(`✅ Removed duplicate closing brace at line ${i+1}`);
          inFiltersDeclaration = false; // Exit the state
        }
      }
    }
  }
  
  // If we made changes, write the file back
  if (modified) {
    // Clean up multiple blank lines
    const cleanedLines = lines.filter((line, index, arr) => {
      if (line.trim() === '') {
        return !(index > 0 && arr[index-1].trim() === '');
      }
      return true;
    });
    
    fs.writeFileSync(filePath, cleanedLines.join('\n'));
    console.log('✅ Removed empty lines');
  }
  
  console.log('🎉 Fixes complete!');
} catch (error) {
  console.error('❌ Error:', error);
  process.exit(1);
}
