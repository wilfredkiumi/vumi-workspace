import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { globSync } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// Find all files that might import build-simple
const allFiles = globSync(['apps/**/*.{ts,tsx,js,jsx}', 'packages/**/*.{ts,tsx,js,jsx}'], { 
  cwd: rootDir, 
  ignore: ['**/node_modules/**', '**/.git/**', '**/dist/**', '**/build/**'] 
});

let importsUpdated = 0;

for (const file of allFiles) {
  const fullPath = path.join(rootDir, file);
  
  // Skip the build-simple file itself
  if (file.includes('build-simple')) continue;
  
  let content = fs.readFileSync(fullPath, 'utf8');
  const originalContent = content;
  
  // Update imports from .js to .jsx
  content = content.replace(
    /from ['"](.+?)\/build-simple(?:\.js)?['"]/g, 
    'from \'$1/build-simple.jsx\''
  );
  
  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf8');
    importsUpdated++;
    console.log(`✅ Updated build-simple import in: ${file}`);
  }
}

console.log(`🎉 Updated ${importsUpdated} imports for build-simple`);
