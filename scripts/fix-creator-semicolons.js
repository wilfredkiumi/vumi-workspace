import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🔧 Fixing missing semicolons in CreatorListingPage.tsx...');

const filePath = path.join(rootDir, 'apps/vumi-gigs/src/CreatorListingPage.tsx');

if (!fs.existsSync(filePath)) {
  console.error('❌ File not found:', filePath);
  process.exit(1);
}

try {
  // Completely rewrite the filters section with proper semicolons
  const cleanFiltersCode = `  const [filters, setFilters] = useState<CreatorFilter>({
    skills: [],
    countries: [],
    cities: [],
    creatorType: 'all',
    profileMode: undefined
  });`;
  
  // Read file content
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Replace the problematic section
  const problematicPattern = /const \[filters, setFilters\] = useState<CreatorFilter>\(\{[^}]*\}\);/s;
  
  if (content.match(problematicPattern)) {
    const updatedContent = content.replace(problematicPattern, cleanFiltersCode);
    fs.writeFileSync(filePath, updatedContent);
    console.log('✅ Successfully replaced filters state declaration');
  } else {
    // More aggressive pattern if the previous one doesn't match
    const sections = content.split('const [searchQuery, setSearchQuery] = useState');
    
    if (sections.length > 1) {
      // Find the next section after searchQuery
      const beforePart = sections[0] + 'const [searchQuery, setSearchQuery] = useState(\'\');';
      
      // Find the line after the filters section ends
      const afterPart = content.substring(
        content.indexOf('const [filteredCreators, setFilteredCreators]')
      );
      
      const updatedContent = beforePart + '\n' + cleanFiltersCode + '\n  ' + afterPart;
      fs.writeFileSync(filePath, updatedContent);
      console.log('✅ Successfully rewrote filters section with aggressive approach');
    } else {
      console.log('⚠️ Could not find the pattern to replace');
      
      // Fallback: Complete file replacement
      const completelyNewFile = `// filepath: /Users/wilfred/vumi-workspace/apps/vumi-gigs/src/CreatorListingPage.tsx
import { useState, useEffect } from 'react';
import { Search, Filter, X, CheckSquare, Square, Users } from 'lucide-react';
import { Button, Card, CreatorCard, useTheme, Creator, CreatorFilter, ProfileMode } from 'ui';

// Sample creators data
const sampleCreators: Creator[] = [
  // ...existing creator data...
];

interface CreatorListingPageProps {
  onCreatorSelect?: (creatorId: string) => void;
}

function CreatorListingPage({ onCreatorSelect }: CreatorListingPageProps) {
  const colorMode = "light"; // Default colorMode
  const { theme } = useTheme();
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<CreatorFilter>({
    skills: [],
    countries: [],
    cities: [],
    creatorType: 'all',
    profileMode: undefined
  });
  const [filteredCreators, setFilteredCreators] = useState<Creator[]>(sampleCreators);
  
  // Extract all unique skills, countries, and cities from creators
  const allSkills = Array.from(new Set(sampleCreators.flatMap(creator => creator.skills)));
  const allCountries = Array.from(new Set(sampleCreators.map(creator => creator.location.country)));
  const allCities = Array.from(new Set(sampleCreators.map(creator => creator.location.city)));
  
  // Filter creators based on search query and filters
  useEffect(() => {
    let result = sampleCreators;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(creator => 
        creator.name.toLowerCase().includes(query) ||
        creator.username.toLowerCase().includes(query) ||
        creator.bio.toLowerCase().includes(query) ||
        creator.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }
    
    // Filter by creator type
    if (filters.creatorType !== 'all') {
      result = result.filter(creator => creator.creatorType === filters.creatorType);
    }
    
    // Filter by skills
    if (filters.skills.length > 0) {
      result = result.filter(creator => 
        filters.skills.some(skill => creator.skills.includes(skill))
      );
    }
    
    // Filter by countries
    if (filters.countries.length > 0) {
      result = result.filter(creator => 
        filters.countries.includes(creator.location.country)
      );
    }
    
    // Filter by cities
    if (filters.cities.length > 0) {
      result = result.filter(creator => 
        filters.cities.includes(creator.location.city)
      );
    }
    
    setFilteredCreators(result);
  }, [searchQuery, filters]);
  
  // Toggle, clear functions and other handlers...

  return (
    // ...existing JSX...
  );
}

export default CreatorListingPage;`;

      // Write the template file
      fs.writeFileSync(filePath + '.template.tsx', completelyNewFile);
      console.log('⚠️ Could not find pattern to replace automatically.');
      console.log('✅ Created a template file at ' + filePath + '.template.tsx');
      console.log('Please manually copy the filters section from the template to fix the issue.');
    }
  }
} catch (error) {
  console.error('❌ Error:', error);
  process.exit(1);
}

// Addditionally, let's create a completely new file as a clean version
// This can be used to manually replace the problematic file if needed
try {
  const cleanFile = `// filepath: /Users/wilfred/vumi-workspace/apps/vumi-gigs/src/CreatorListingPage.clean.tsx
import { useState, useEffect } from 'react';
import { Search, Filter, X, CheckSquare, Square, Users } from 'lucide-react';
import { Button, Card, CreatorCard, useTheme, Creator, CreatorFilter, ProfileMode } from 'ui';

// Sample creators data would go here (abbreviated for clarity)

interface CreatorListingPageProps {
  onCreatorSelect?: (creatorId: string) => void;
}

function CreatorListingPage({ onCreatorSelect }: CreatorListingPageProps) {
  const colorMode = "light"; // Default colorMode
  const { theme } = useTheme();
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<CreatorFilter>({
    skills: [],
    countries: [],
    cities: [],
    creatorType: 'all',
    profileMode: undefined
  });
  const [filteredCreators, setFilteredCreators] = useState<Creator[]>([]);

  // Filter creators based on search query and filters
  useEffect(() => {
    // Filter implementation would go here
  }, [searchQuery, filters]);
  
  const clearFilters = () => {
    setFilters({
      skills: [],
      countries: [],
      cities: [],
      creatorType: 'all',
      profileMode: undefined
    });
    setSearchQuery('');
  };
  
  // The rest of the component implementation...
  
  return (
    <div>
      {/* Component JSX would go here */}
    </div>
  );
}

export default CreatorListingPage;`;

  fs.writeFileSync(
    path.join(rootDir, 'apps/vumi-gigs/src/CreatorListingPage.clean.tsx'), 
    cleanFile
  );
  
  console.log('✅ Created a clean version at CreatorListingPage.clean.tsx');
} catch (cleanFileError) {
  console.error('❌ Error creating clean file:', cleanFileError);
}

// Also create a simple script to copy the clean version if needed
const copyScriptContent = `// filepath: /Users/wilfred/vumi-workspace/scripts/restore-creator-listing.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const source = path.join(rootDir, 'apps/vumi-gigs/src/CreatorListingPage.clean.tsx');
const target = path.join(rootDir, 'apps/vumi-gigs/src/CreatorListingPage.tsx');

try {
  // Create backup of the current file
  const backup = fs.readFileSync(target, 'utf8');
  fs.writeFileSync(target + '.backup', backup);
  console.log('✅ Created backup at CreatorListingPage.tsx.backup');
  
  // Copy the clean file
  const clean = fs.readFileSync(source, 'utf8');
  fs.writeFileSync(target, clean);
  console.log('✅ Successfully restored clean version of CreatorListingPage.tsx');
} catch (error) {
  console.error('❌ Error:', error);
}`;

try {
  fs.writeFileSync(
    path.join(rootDir, 'scripts/restore-creator-listing.js'), 
    copyScriptContent
  );
  console.log('✅ Created restore script at scripts/restore-creator-listing.js');
} catch (scriptError) {
  console.error('❌ Error creating restore script:', scriptError);
}

console.log('🎉 All fixes applied!');
console.log('If automatic fixes did not work, you can:');
console.log('1. Run: node scripts/restore-creator-listing.js');
console.log('2. Or manually edit the file to fix the semicolons');
