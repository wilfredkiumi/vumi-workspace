import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { globSync } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// Find all .js files
const allFiles = globSync(['apps/**/*.js', 'packages/**/*.js'], { 
  cwd: rootDir, 
  ignore: ['**/node_modules/**', '**/.git/**', '**/dist/**', '**/build/**'] 
});

const jsxPattern = /<\w+.*?>.*<\/\w+>/s;
const filesWithJsxErrors = [];

for (const file of allFiles) {
  const fullPath = path.join(rootDir, file);
  const content = fs.readFileSync(fullPath, 'utf8');
  
  if (jsxPattern.test(content)) {
    filesWithJsxErrors.push(file);
  }
}

if (filesWithJsxErrors.length > 0) {
  console.log('Files with JSX syntax errors:');
  filesWithJsxErrors.forEach(file => console.log(`- ${file}`));
} else {
  console.log('No files with JSX syntax errors found.');
}
