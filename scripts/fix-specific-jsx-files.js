import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// List of specific files that need to be converted from .js to .jsx
const filesToConvert = [
  'packages/shared/dist/components/auth/LoginForm.js',
  'packages/shared/dist/contexts/AuthContext.js',
  'packages/shared/dist/contexts/MeetingContext.js',
  'packages/shared/dist/components/icons/TikTokIcon.js',
  'packages/shared/dist/components/VideoMeeting/VideoMeetingPage.js'
];

/**
 * Convert specific JS files with JSX to JSX files
 */
function fixSpecificJsxFiles() {
  console.log('🔧 Converting specific JS files with JSX to JSX files...');
  
  // Convert each file in the list
  for (const fileRelPath of filesToConvert) {
    const fullPath = path.join(rootDir, fileRelPath);
    
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Create .jsx file
      const jsxFilePath = fullPath.replace(/\.js$/, '.jsx');
      fs.writeFileSync(jsxFilePath, content, 'utf8');
      
      console.log(`✅ Converted ${fileRelPath} to JSX file`);
    } else {
      console.log(`⚠️ File not found: ${fileRelPath}`);
    }
  }
  
  console.log('🎉 All specific JSX files converted');
}

// Run the fix
fixSpecificJsxFiles();
