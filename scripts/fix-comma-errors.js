import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const fixCommaErrors = () => {
  console.log('🔧 Fixing comma errors in UI components...');
  
  const files = [
    'packages/ui/index.tsx',
    'packages/ui/StudioProfilePage.tsx'
  ];
  
  files.forEach(file => {
    const filePath = path.join(rootDir, file);
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Fix ESLint disable comments with missing commas
      content = content.replace(/theme = "gigs"\s+\/\*\s*eslint-disable-line[^*]*\*\//g, 
        'theme = "gigs", /* eslint-disable-line @typescript-eslint/no-unused-vars */');
      
      content = content.replace(/colorMode = ["']light["']\s+\/\*\s*eslint-disable-line[^*]*\*\//g, 
        'colorMode = "light", /* eslint-disable-line @typescript-eslint/no-unused-vars */');
        
      // Special case for the Footer function which needs a different approach
      content = content.replace(
        /\/\* eslint-disable @typescript-eslint\/no-unused-vars \*\/\nexport function Footer\(\{\s*theme = ["']gigs["'],\s*colorMode = ["']light["']\s*\}:/g,
        'export function Footer({ theme = "gigs" /* eslint-disable-line @typescript-eslint/no-unused-vars */, colorMode = "light" /* eslint-disable-line @typescript-eslint/no-unused-vars */ }:'
      );
      
      // Remove the eslint-enable line if present
      content = content.replace(/\/\* eslint-enable[^*]*\*\//g, '');
      
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed ${file}`);
    } else {
      console.log(`⚠️ File not found: ${file}`);
    }
  });
};

const main = async () => {
  try {
    console.log('🚀 Fixing comma errors in TypeScript files...');
    
    // Fix comma errors
    fixCommaErrors();
    
    console.log('\n✅ All fixes applied.');
    console.log('  Run: npm run build:skip');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

main();
