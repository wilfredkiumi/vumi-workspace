import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const fixDuplicateTypeImports = () => {
  // File with duplicate imports
  const filePath = path.join(rootDir, 'apps', 'vumi-gigs', 'src', 'CreatorProfilePage.tsx');
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix duplicate Creator imports by renaming the first one
    if (content.includes('import { Creator,') && content.includes('import { Creator } from "./types/index.js";')) {
      // Rename the first import
      content = content.replace(
        'import { Creator, FreelanceStatus, CreatorType } from \'./models/Creator\';',
        'import { Creator as CreatorModel, FreelanceStatus, CreatorType } from \'./models/Creator\';'
      );
      
      // Update all uses of Creator from the first import to CreatorModel
      // You may need to add more replacements based on how Creator is used
      content = content.replace(/\bCreator\[\]/g, 'CreatorModel[]');
      content = content.replace(/creator: Creator/g, 'creator: CreatorModel');
      content = content.replace(/: Creator /g, ': CreatorModel ');
      content = content.replace(/\(\) => Creator/g, '() => CreatorModel');
      
      // If you prefer, you can just remove the second import
      content = content.replace('import { Creator } from "./types/index.js";\n', '');
      
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('✅ Fixed duplicate Creator imports in CreatorProfilePage.tsx');
      return true;
    } else {
      console.log('⚠️ No duplicate Creator imports found in CreatorProfilePage.tsx');
    }
  } else {
    console.log('⚠️ Could not find CreatorProfilePage.tsx');
  }
  
  return false;
};

// Run the fix
console.log('🔍 Checking for duplicate type imports...');
const fixedImports = fixDuplicateTypeImports();

if (fixedImports) {
  console.log('🎉 Successfully fixed duplicate type imports!');
} else {
  console.log('⚠️ No fixes were applied');
}
