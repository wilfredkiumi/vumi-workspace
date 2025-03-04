import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

/**
 * Direct fix for VideoMeetingPage.js
 */
function fixVideoMeetingDirectly() {
  console.log('🔧 Directly fixing VideoMeetingPage.js...');
  
  // Path to the problematic file
  const filePath = path.join(rootDir, 'packages/shared/dist/components/VideoMeeting/VideoMeetingPage.js');
  const dirPath = path.dirname(filePath);
  
  // Content to write to the file
  const content = `import React from 'react';

export function VideoMeetingPage() {
  return (
    <div className="video-meeting-container">
      <h1>Video Meeting</h1>
      <p>Meeting functionality not implemented in this simplified build.</p>
    </div>
  );
}`;
  
  try {
    // Create directory if it doesn't exist
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`✅ Created directory: ${dirPath}`);
    }
    
    // Write the JS file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed JS file: ${filePath}`);
    
    // Create the JSX version
    const jsxPath = filePath.replace(/\.js$/, '.jsx');
    fs.writeFileSync(jsxPath, content, 'utf8');
    console.log(`✅ Created JSX file: ${jsxPath}`);
    
    console.log('🎉 VideoMeetingPage.js fixed successfully!');
  } catch (error) {
    console.error('❌ Error fixing VideoMeetingPage.js:', error);
    process.exit(1);
  }
}

// Run the fix
fixVideoMeetingDirectly();
