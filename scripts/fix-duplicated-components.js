import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// Fix duplicate component declarations
const fixDuplicateComponents = () => {
  const filePath = path.join(rootDir, 'apps', 'vumi-gigs', 'src', 'pages', 'ProfilePage.tsx');
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check for duplicate CreatorProfileForm declarations
    const creatorFormMatches = content.match(/const CreatorProfileForm = \(\{ onSubmit, onCancel \}\) =>/g);
    if (creatorFormMatches && creatorFormMatches.length > 1) {
      // Keep only the first declaration and remove others
      let newContent = '';
      let firstMatch = true;
      let inComponent = false;
      
      // Read line by line to properly remove duplicate components
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        if (line.includes('const CreatorProfileForm = ({ onSubmit, onCancel }) =>')) {
          if (firstMatch) {
            newContent += line + '\n';
            firstMatch = false;
            inComponent = true;
          } else {
            inComponent = true;
            continue;
          }
        } else if (inComponent) {
          if (line.includes(');') && !line.includes('(')) {
            inComponent = false;
            if (!firstMatch) continue;
          }
          
          if (firstMatch) {
            newContent += line + '\n';
          }
        } else {
          newContent += line + '\n';
        }
      }
      
      content = newContent;
    }
    
    // Check for duplicate BusinessProfileForm declarations
    const businessFormMatches = content.match(/const BusinessProfileForm = \(\{ onSubmit, onCancel \}\) =>/g);
    if (businessFormMatches && businessFormMatches.length > 1) {
      // Keep only the first declaration and remove others
      let newContent = '';
      let firstMatch = true;
      let inComponent = false;
      
      // Read line by line to properly remove duplicate components
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        if (line.includes('const BusinessProfileForm = ({ onSubmit, onCancel }) =>')) {
          if (firstMatch) {
            newContent += line + '\n';
            firstMatch = false;
            inComponent = true;
          } else {
            inComponent = true;
            continue;
          }
        } else if (inComponent) {
          if (line.includes(');') && !line.includes('(')) {
            inComponent = false;
            if (!firstMatch) continue;
          }
          
          if (firstMatch) {
            newContent += line + '\n';
          }
        } else {
          newContent += line + '\n';
        }
      }
      
      content = newContent;
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✅ Fixed duplicate component declarations in ProfilePage.tsx');
    return true;
  }
  
  console.log('⚠️ Could not find ProfilePage.tsx');
  return false;
}

// Run fixes
console.log('🔍 Fixing duplicate component declarations...');
const profilePageFixed = fixDuplicateComponents();

if (profilePageFixed) {
  console.log('\n🎉 Fixed duplicate component declarations!');
} else {
  console.log('\n⚠️ Some fixes could not be applied.');
}
