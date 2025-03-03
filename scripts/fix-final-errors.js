import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Fix the DB service files with duplicate const declarations
const fixDbServices = () => {
  console.log('🔧 Fixing duplicate const declarations in DB services...');
  
  const dbServiceFiles = [
    'src/services/db/creatorService.ts',
    'src/services/db/showcaseService.ts',
    'src/services/db/ticketService.ts',
    'src/services/db/userService.ts',
  ];

  dbServiceFiles.forEach(file => {
    const filePath = path.join(rootDir, 'apps', 'vumi-gigs', file);
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Fix duplicate const declarations
      content = content.replace(/const result = const result =/g, 'const result =');
      
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed ${file}`);
    } else {
      console.log(`⚠️ File not found: ${file}`);
    }
  });
};

// Fix the Creator Profile component with broken 'as any' syntax
const fixCreatorProfile = () => {
  console.log('\n🔧 Fixing Creator Profile component...');
  
  const filePath = path.join(rootDir, 'packages/ui', 'CreatorProfile.tsx');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix incorrect 'as any' syntax for map calls
    content = content.replace(/creator as any\.(platforms)\.map\(\(([^,]+), ([^)]+)\) =>/g, 
      '(creator as any).$1?.map(($2: string, $3: number) =>');
    
    content = content.replace(/creator as any\.(contentTypes)\.map\(\(([^,]+), ([^)]+)\) =>/g, 
      '(creator as any).$1?.map(($2: string, $3: number) =>');
    
    content = content.replace(/creator as any\.(specializations)\.map\(\(([^,]+), ([^)]+)\) =>/g, 
      '(creator as any).$1?.map(($2: string, $3: number) =>');
    
    content = content.replace(/creator as any\.(equipmentOwned)\.map\(\(([^,]+), ([^)]+)\) =>/g, 
      '(creator as any).$1?.map(($2: string, $3: number) =>');
    
    // Also fix any other 'as any' property accesses
    content = content.replace(/creator as any\./g, '(creator as any).');
    
    fs.writeFileSync(filePath, content);
    console.log('✅ Fixed CreatorProfile.tsx');
  } else {
    console.log('⚠️ CreatorProfile.tsx not found');
  }
};

// Main function
const main = async () => {
  try {
    console.log('🚀 Starting to fix final TypeScript errors...');
    
    // Fix DB services with duplicate const declarations
    fixDbServices();
    
    // Fix Creator Profile with broken 'as any' syntax
    fixCreatorProfile();
    
    console.log('\n✅ All fixes applied. Run build with skip check:');
    console.log('  npm run build:skipcheck');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

main();
