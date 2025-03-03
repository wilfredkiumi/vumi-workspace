import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();

// Files to fix
const filesToFix = [
  'apps/vumi-gigs/src/CreatorListingPage.tsx',
  'apps/vumi-gigs/src/pages/StudiosListingPage.tsx'
];

console.log('🔧 Fixing syntax errors in listing pages...');

// Process each file
filesToFix.forEach(relativeFilePath => {
  const filePath = path.join(rootDir, relativeFilePath);
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️ File not found: ${relativeFilePath}`);
    return;
  }

  console.log(`Processing ${relativeFilePath}...`);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Fix CreatorListingPage.tsx specific issue - missing filters initialization
  if (relativeFilePath.includes('CreatorListingPage.tsx')) {
    // Check for missing filter state initialization
    const missingFiltersPattern = /function CreatorListingPage.*?\{[\s\S]*?const colorMode.*?const \{ theme \}.*?\[showFilters,.*?\[searchQuery,.*?(\s+)(skills:.*?profileMode:.*?\}\);)/s;
    const match = content.match(missingFiltersPattern);
    
    if (match) {
      // Add proper filters state initialization
      const newContent = content.replace(
        missingFiltersPattern,
        (match, spacing, filtersObj) => {
          return match.replace(
            spacing + filtersObj,
            `${spacing}const [filters, setFilters] = useState<CreatorFilter>({\n${spacing}  ${filtersObj}`
          );
        }
      );

      if (newContent !== content) {
        content = newContent;
        modified = true;
        console.log('✅ Fixed missing filters state initialization');
      }
    }
  }

  // Fix StudiosListingPage.tsx specific issue
  if (relativeFilePath.includes('StudiosListingPage.tsx')) {
    // Check for malformed component props and function body
    const malformedProps = /function StudiosListingPage\(\{\s*onStudioSelect\s*\}\)\s*\{[\s\S]*?const colorMode = "light";\s*\/\/\s*Default colorMode onStudioSelect/;
    
    if (content.match(malformedProps)) {
      // Fix the function signature and declaration
      content = content.replace(
        /function StudiosListingPage\(\{\s*onStudioSelect\s*\}\)\s*\{[\s\S]*?const colorMode = "light";\s*\/\/\s*Default colorMode onStudioSelect \}:/,
        'function StudiosListingPage({ onStudioSelect }: StudiosListingPageProps) {\n  const colorMode = "light"; // Default colorMode'
      );
      
      modified = true;
      console.log('✅ Fixed function declaration and props');
    }
  }

  // Write back the file if it was modified
  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed ${relativeFilePath}`);
  } else {
    console.log(`ℹ️ No changes needed in ${relativeFilePath}`);
  }
});

// Additional function to fix any file with missing semicolons
function checkAndFixAllTypeScriptFiles() {
  console.log('\n🔍 Checking all TypeScript files for semicolon issues...');
  
  // Find all TypeScript files in the project
  const baseDirectories = [
    path.join(rootDir, 'apps/vumi-gigs/src')
  ];
  
  let fixedFiles = 0;
  
  baseDirectories.forEach(baseDir => {
    if (!fs.existsSync(baseDir)) return;
    
    const findAllTsFiles = (dir) => {
      const files = [];
      
      try {
        const dirContents = fs.readdirSync(dir);
        
        for (const item of dirContents) {
          const fullPath = path.join(dir, item);
          const stat = fs.statSync(fullPath);
          
          if (stat.isDirectory()) {
            files.push(...findAllTsFiles(fullPath));
          } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
            files.push(fullPath);
          }
        }
      } catch (error) {
        console.error(`Error reading directory ${dir}: ${error.message}`);
      }
      
      return files;
    };
    
    const allTsFiles = findAllTsFiles(baseDir);
    
    allTsFiles.forEach(filePath => {
      try {
        if (filesToFix.some(file => filePath.includes(file))) {
          // Skip files we already processed
          return;
        }
        
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        
        // Fix setState object literal missing semicolons
        const stateSetterPattern = /useState\(\{([^}]*)\}\)/g;
        const matches = content.matchAll(stateSetterPattern);
        
        for (const match of matches) {
          const objectLiteral = match[1];
          
          if (objectLiteral && !objectLiteral.includes(';')) {
            // This might be an object with missing semicolons
            // Replace property: value, with property: value,
            const fixedObjectLiteral = objectLiteral.replace(/(\w+):\s*([^,]+)(?=\s+\w+:)/g, '$1: $2,');
            
            if (fixedObjectLiteral !== objectLiteral) {
              content = content.replace(match[0], `useState({${fixedObjectLiteral}})`);
              modified = true;
            }
          }
        }
        
        if (modified) {
          fs.writeFileSync(filePath, content);
          fixedFiles++;
          console.log(`✅ Fixed semicolon issues in ${path.relative(rootDir, filePath)}`);
        }
      } catch (error) {
        console.error(`Error processing file ${filePath}: ${error.message}`);
      }
    });
  });
  
  if (fixedFiles > 0) {
    console.log(`\n🎉 Fixed semicolon issues in ${fixedFiles} files`);
  } else {
    console.log('\n✅ No additional files needed fixing');
  }
}

// Run additional check on all files
checkAndFixAllTypeScriptFiles();

console.log('\n✅ All fixes completed. Run build:skipcheck to check for remaining issues.');
