import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

/**
 * Fix syntax error in VideoMeetingPage.js and convert to JSX
 */
function fixVideoMeetingSyntax() {
  console.log('🔧 Fixing syntax error in VideoMeetingPage.js...');
  
  // Path to the file with the error
  const filePath = path.join(
    rootDir, 
    'packages/shared/dist/components/VideoMeeting/VideoMeetingPage.js'
  );
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    
    // Try looking for the file in alternate locations
    const possiblePaths = [
      path.join(rootDir, 'packages/shared/src/components/VideoMeeting/VideoMeetingPage.js'),
      path.join(rootDir, 'packages/shared/components/VideoMeeting/VideoMeetingPage.js'),
      // Check in node_modules in case it's been installed from there
      path.join(rootDir, 'node_modules/@vumi/shared/dist/components/VideoMeeting/VideoMeetingPage.js')
    ];
    
    for (const altPath of possiblePaths) {
      if (fs.existsSync(altPath)) {
        console.log(`✅ Found file at alternative path: ${altPath}`);
        fixFile(altPath);
        return;
      }
    }
    
    // If we still haven't found it, create the file
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`✅ Created directory: ${dirPath}`);
    }
    
    const jsxContent = `import React from 'react';

export function VideoMeetingPage() {
  return (
    <div className="video-meeting-container">
      <h1>Video Meeting</h1>
      <p>Meeting functionality not implemented in this simplified build.</p>
    </div>
  );
}`;
    
    // Create both the JS and JSX versions
    fs.writeFileSync(filePath, jsxContent, 'utf8');
    console.log(`✅ Created file: ${filePath}`);
    
    const jsxFilePath = filePath.replace(/\.js$/, '.jsx');
    fs.writeFileSync(jsxFilePath, jsxContent, 'utf8');
    console.log(`✅ Created JSX file: ${jsxFilePath}`);
    
    return;
  }
  
  // Fix the file if it exists
  fixFile(filePath);
}

function fixFile(filePath) {
  try {
    // Read the file content
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix the syntax error (missing closing bracket)
    if (content.includes('</div') && !content.includes('</div>')) {
      content = content.replace('</div', '</div>');
      console.log(`✅ Fixed syntax error in ${filePath}`);
    }
    
    // Create .jsx file
    const jsxFilePath = filePath.replace(/\.js$/, '.jsx');
    fs.writeFileSync(jsxFilePath, content, 'utf8');
    console.log(`✅ Created JSX version of file at: ${jsxFilePath}`);
    
    // Update imports in other files (if necessary)
    updateImports(filePath);
    
    console.log(`🎉 Fixed syntax errors and created JSX file`);
  } catch (error) {
    console.error(`❌ Error fixing file:`, error);
  }
}

function updateImports(filePath) {
  try {
    const dirPath = path.dirname(filePath);
    const parentDir = path.dirname(dirPath);
    
    // Find all JS/JSX files that might import this file
    const allFiles = [];
    
    // First look in the shared package
    if (fs.existsSync(parentDir)) {
      const filesInParent = fs.readdirSync(parentDir, { recursive: true, withFileTypes: true })
        .filter(entry => entry.isFile() && /\.(js|jsx|ts|tsx)$/.test(entry.name))
        .map(entry => path.join(parentDir, entry.name));
      
      allFiles.push(...filesInParent);
    }
    
    // Look in the apps directory
    const appsDir = path.join(rootDir, 'apps');
    if (fs.existsSync(appsDir)) {
      const apps = fs.readdirSync(appsDir, { withFileTypes: true })
        .filter(entry => entry.isDirectory())
        .map(entry => entry.name);
        
      for (const app of apps) {
        const appSrcDir = path.join(appsDir, app, 'src');
        if (fs.existsSync(appSrcDir)) {
          const filesInApp = fs.readdirSync(appSrcDir, { recursive: true, withFileTypes: true })
            .filter(entry => entry.isFile() && /\.(js|jsx|ts|tsx)$/.test(entry.name))
            .map(entry => path.join(appSrcDir, entry.name));
            
          allFiles.push(...filesInApp);
        }
      }
    }
    
    const fileName = path.basename(filePath, '.js');
    let importsFixed = 0;
    
    for (const file of allFiles) {
      if (file === filePath) continue; // Skip the original file
      
      try {
        const fileContent = fs.readFileSync(file, 'utf8');
        
        // Look for various import patterns
        const importPatterns = [
          `from '@vumi/shared/components/VideoMeeting/${fileName}'`,
          `from '@vumi/shared/dist/components/VideoMeeting/${fileName}'`,
          `from '../components/VideoMeeting/${fileName}'`,
          `from './VideoMeeting/${fileName}'`,
          `from '@vumi/shared/components/VideoMeeting/${fileName}.js'`,
          `from '@vumi/shared/dist/components/VideoMeeting/${fileName}.js'`,
          `from '../components/VideoMeeting/${fileName}.js'`,
          `from './VideoMeeting/${fileName}.js'`
        ];
        
        let updatedContent = fileContent;
        let fileWasModified = false;
        
        for (const pattern of importPatterns) {
          if (fileContent.includes(pattern)) {
            const newImport = pattern.replace(/\.js'$/, '.jsx'').replace(/([^.])('|")$/, '$1.jsx$2');
            updatedContent = updatedContent.replace(pattern, newImport);
            fileWasModified = true;
          }
        }
        
        if (fileWasModified) {
          fs.writeFileSync(file, updatedContent, 'utf8');
          importsFixed++;
          console.log(`✅ Updated imports in: ${file}`);
        }
      } catch (err) {
        console.warn(`⚠️ Could not process file ${file}: ${err.message}`);
      }
    }
    
    console.log(`🔄 Updated imports in ${importsFixed} files`);
    
  } catch (error) {
    console.error('❌ Error updating imports:', error);
  }
}

// Run the fix
fixVideoMeetingSyntax();
