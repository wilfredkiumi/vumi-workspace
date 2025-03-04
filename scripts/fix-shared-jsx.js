import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { globSync } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// List of components to convert from .js to .jsx
const componentsToFix = [
  'LoginForm',
  'AuthContext',
  'MeetingContext',
  'VideoMeetingPage'
];

// Find all files that might import these components
const allFiles = globSync(['apps/**/*.{ts,tsx,js,jsx}', 'packages/**/*.{ts,tsx,js,jsx}'], { 
  cwd: rootDir, 
  ignore: ['**/node_modules/**', '**/.git/**', '**/dist/**', '**/build/**'] 
});

let importsUpdated = 0;

for (const file of allFiles) {
  const fullPath = path.join(rootDir, file);
  let content = fs.readFileSync(fullPath, 'utf8');
  const originalContent = content;
  
  // Update imports from .js to .jsx for each component
  for (const component of componentsToFix) {
    if (file.includes(component)) continue;
    
    content = content.replace(
      new RegExp(`from ['"](.+?)\\/${component}(?:\\.js)?['"]`, 'g'),
      `from '$1/${component}.jsx'`
    );
  }
  
  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf8');
    importsUpdated++;
    console.log(`✅ Updated imports in: ${file}`);
  }
}

console.log(`🎉 Updated ${importsUpdated} files with JSX imports`);
