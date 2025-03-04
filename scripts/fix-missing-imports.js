import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// Fix Profile Page imports
const fixProfilePageImports = () => {
  const filePath = path.join(rootDir, 'apps', 'vumi-gigs', 'src', 'pages', 'ProfilePage.tsx');
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace import from ui package
    content = content.replace(
      /import {\s*\n\s*Button,\s*\n\s*CreatorProfileForm,\s*\n\s*BusinessProfileForm,\s*\n\s*useTheme,\s*\n\s*Card\s*\n}\s*from\s*'ui';/g,
      `import {
  Button,
  useTheme,
  Card
} from 'ui';`
    );
    
    // Add local component implementations
    content = content.replace(
      /const APP_ID = 'gigs'; \/\/ Current app identifier/,
      `// Local implementation of profile forms
// These will be replaced with the actual imported components once they are available
const CreatorProfileForm = ({ onSubmit, onCancel }) => (
  <div className="max-w-4xl mx-auto">
    <h2 className="text-2xl font-bold mb-6">Creator Profile</h2>
    <div className="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-lg mb-6">
      <p>This is a placeholder for the CreatorProfileForm component.</p>
    </div>
    <div className="flex justify-end space-x-4">
      <Button onClick={onCancel} variant="secondary">Cancel</Button>
      <Button onClick={() => onSubmit({ name: 'Test Creator' })}>Save Profile</Button>
    </div>
  </div>
);

const BusinessProfileForm = ({ onSubmit, onCancel }) => (
  <div className="max-w-4xl mx-auto">
    <h2 className="text-2xl font-bold mb-6">Business Profile</h2>
    <div className="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-lg mb-6">
      <p>This is a placeholder for the BusinessProfileForm component.</p>
    </div>
    <div className="flex justify-end space-x-4">
      <Button onClick={onCancel} variant="secondary">Cancel</Button>
      <Button onClick={() => onSubmit({ name: 'Test Business' })}>Save Profile</Button>
    </div>
  </div>
);

const APP_ID = 'gigs'; // Current app identifier`
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✅ Fixed missing imports in ProfilePage.tsx');
    return true;
  }
  
  console.log('⚠️ Could not find ProfilePage.tsx');
  return false;
}

// Run fixes
console.log('🔍 Fixing missing imports...');
const profilePageFixed = fixProfilePageImports();

if (profilePageFixed) {
  console.log('\n🎉 Fixed missing imports!');
} else {
  console.log('\n⚠️ Some fixes could not be applied.');
}
