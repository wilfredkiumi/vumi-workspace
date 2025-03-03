import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🔧 Rewriting CreatorListingPage.tsx filters section...');

const filePath = path.join(rootDir, 'apps/vumi-gigs/src/CreatorListingPage.tsx');

if (!fs.existsSync(filePath)) {
  console.error('❌ File not found:', filePath);
  process.exit(1);
}

try {
  // Read the file content
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Split the content at the start of filters declaration
  const parts = content.split(/const \[filters, setFilters\] = useState<CreatorFilter>\(\{/);
  
  if (parts.length < 2) {
    console.log('⚠️ Could not find filters declaration, no changes made.');
    process.exit(0);
  }
  
  // Extract content before and after the filters declaration
  const beforeFilters = parts[0];
  
  // Find the end of the filters declaration (the closing parenthesis and semicolon)
  let afterFilters = parts[1];
  const closingIndex = afterFilters.indexOf('});');
  
  if (closingIndex === -1) {
    console.log('⚠️ Could not find end of filters declaration, no changes made.');
    process.exit(0);
  }
  
  // Extract the content after the filters declaration
  const afterDeclaration = afterFilters.substring(closingIndex + 3);
  
  // Create a clean filters declaration
  const cleanFiltersDeclaration = `const [filters, setFilters] = useState<CreatorFilter>({
    skills: [],
    countries: [],
    cities: [],
    creatorType: 'all',
    profileMode: undefined
  });`;
  
  // Combine everything back together
  const newContent = beforeFilters + cleanFiltersDeclaration + afterDeclaration;
  
  // Write the file back
  fs.writeFileSync(filePath, newContent);
  
  console.log('✅ Successfully rewrote filters declaration in CreatorListingPage.tsx');
} catch (error) {
  console.error('❌ Error:', error);
  process.exit(1);
}
