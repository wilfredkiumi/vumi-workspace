import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { globSync } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

/**
 * Check if a file contains JSX syntax
 */
function containsJSX(filePath) {
  try {
    if (!fs.existsSync(filePath)) return false;
    const content = fs.readFileSync(filePath, 'utf8');
    // Simple check for JSX syntax in a .js file
    return content.includes('<') && content.includes('/>') || content.includes('</');
  } catch (error) {
    console.error(`❌ Error checking file ${filePath}:`, error);
    return false;
  }
}

/**
 * Direct fix for TikTokIcon JSX issue
 */
function fixTikTokIcon() {
  console.log('🔧 Fixing TikTokIcon...');
  
  // Path to the problematic file
  const tikTokIconPath = path.join(rootDir, 'packages/shared/dist/components/icons/TikTokIcon.js');
  const tikTokIconDir = path.dirname(tikTokIconPath);
  
  // Check if the file actually has JSX syntax that needs fixing
  if (!containsJSX(tikTokIconPath)) {
    console.log(`✓ No JSX syntax found in ${tikTokIconPath}. It might already be fixed or doesn't exist.`);
    // Still continue to ensure all files are created properly
  }
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(tikTokIconDir)) {
    fs.mkdirSync(tikTokIconDir, { recursive: true });
    console.log(`✅ Created directory: ${tikTokIconDir}`);
  }
  
  // The corrected TikTokIcon component content
  const tikTokIconContent = `import React from 'react';

export function TikTokIcon(props) {
  return React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none", 
    xmlns: "http://www.w3.org/2000/svg",
    ...props
  },
    React.createElement("path", {
      d: "M19.32 5.5C19.39 5.51 19.47 5.51 19.55 5.51C19.52 5.51 19.45 5.51 19.37 5.5H19.32Z",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }),
    React.createElement("path", {
      d: "M19.55 5.51C19.45 5.51 19.38 5.51 19.32 5.5C17.72 3.56 17.49 2.55 17.49 2.55H14.44V16.62C14.44 17.14 14.33 17.65 14.12 18.12C13.91 18.58 13.6 19 13.21 19.34C12.82 19.68 12.36 19.94 11.86 20.1C11.36 20.26 10.83 20.31 10.31 20.26C9.79 20.21 9.28 20.05 8.82 19.79C8.36 19.53 7.95 19.19 7.63 18.77C7.31 18.35 7.08 17.87 6.95 17.36C6.83 16.85 6.81 16.32 6.9 15.8C6.99 15.28 7.18 14.79 7.47 14.36C7.76 13.92 8.13 13.55 8.57 13.27C9.01 12.98 9.5 12.79 10.02 12.71C10.54 12.63 11.07 12.65 11.58 12.78V9.8C11.23 9.72 10.87 9.68 10.51 9.69C9.61 9.71 8.73 9.93 7.93 10.34C7.13 10.75 6.43 11.33 5.88 12.04C5.33 12.75 4.94 13.57 4.74 14.45C4.54 15.32 4.54 16.23 4.74 17.11C4.94 17.99 5.33 18.81 5.88 19.52C6.43 20.23 7.13 20.81 7.93 21.22C8.73 21.63 9.61 21.85 10.51 21.87C11.41 21.89 12.3 21.71 13.12 21.33C13.94 20.96 14.67 20.4 15.25 19.71C15.83 19.02 16.25 18.21 16.48 17.34C16.71 16.47 16.74 15.55 16.58 14.67V8.97C17.8 9.87 19.02 10.34 19.55 10.51V7.46C19.27 7.37 18.5 7.06 17.49 6.46C17.48 6.45 18.38 6.04 19.32 5.5",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })
  );
}`;

  // Content for the JSX version - keeping the JSX syntax for the .jsx file
  const tikTokIconJsxContent = `import React from 'react';

export function TikTokIcon(props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M19.32 5.5C19.39 5.51 19.47 5.51 19.55 5.51C19.52 5.51 19.45 5.51 19.37 5.5H19.32Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.55 5.51C19.45 5.51 19.38 5.51 19.32 5.5C17.72 3.56 17.49 2.55 17.49 2.55H14.44V16.62C14.44 17.14 14.33 17.65 14.12 18.12C13.91 18.58 13.6 19 13.21 19.34C12.82 19.68 12.36 19.94 11.86 20.1C11.36 20.26 10.83 20.31 10.31 20.26C9.79 20.21 9.28 20.05 8.82 19.79C8.36 19.53 7.95 19.19 7.63 18.77C7.31 18.35 7.08 17.87 6.95 17.36C6.83 16.85 6.81 16.32 6.9 15.8C6.99 15.28 7.18 14.79 7.47 14.36C7.76 13.92 8.13 13.55 8.57 13.27C9.01 12.98 9.5 12.79 10.02 12.71C10.54 12.63 11.07 12.65 11.58 12.78V9.8C11.23 9.72 10.87 9.68 10.51 9.69C9.61 9.71 8.73 9.93 7.93 10.34C7.13 10.75 6.43 11.33 5.88 12.04C5.33 12.75 4.94 13.57 4.74 14.45C4.54 15.32 4.54 16.23 4.74 17.11C4.94 17.99 5.33 18.81 5.88 19.52C6.43 20.23 7.13 20.81 7.93 21.22C8.73 21.63 9.61 21.85 10.51 21.87C11.41 21.89 12.3 21.71 13.12 21.33C13.94 20.96 14.67 20.4 15.25 19.71C15.83 19.02 16.25 18.21 16.48 17.34C16.71 16.47 16.74 15.55 16.58 14.67V8.97C17.8 9.87 19.02 10.34 19.55 10.51V7.46C19.27 7.37 18.5 7.06 17.49 6.46C17.48 6.45 18.38 6.04 19.32 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}`;

  // Content for the TypeScript version
  const tikTokIconTsxContent = `import React from 'react';

interface TikTokIconProps extends React.SVGProps<SVGSVGElement> {}

export function TikTokIcon(props: TikTokIconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M19.32 5.5C19.39 5.51 19.47 5.51 19.55 5.51C19.52 5.51 19.45 5.51 19.37 5.5H19.32Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.55 5.51C19.45 5.51 19.38 5.51 19.32 5.5C17.72 3.56 17.49 2.55 17.49 2.55H14.44V16.62C14.44 17.14 14.33 17.65 14.12 18.12C13.91 18.58 13.6 19 13.21 19.34C12.82 19.68 12.36 19.94 11.86 20.1C11.36 20.26 10.83 20.31 10.31 20.26C9.79 20.21 9.28 20.05 8.82 19.79C8.36 19.53 7.95 19.19 7.63 18.77C7.31 18.35 7.08 17.87 6.95 17.36C6.83 16.85 6.81 16.32 6.9 15.8C6.99 15.28 7.18 14.79 7.47 14.36C7.76 13.92 8.13 13.55 8.57 13.27C9.01 12.98 9.5 12.79 10.02 12.71C10.54 12.63 11.07 12.65 11.58 12.78V9.8C11.23 9.72 10.87 9.68 10.51 9.69C9.61 9.71 8.73 9.93 7.93 10.34C7.13 10.75 6.43 11.33 5.88 12.04C5.33 12.75 4.94 13.57 4.74 14.45C4.54 15.32 4.54 16.23 4.74 17.11C4.94 17.99 5.33 18.81 5.88 19.52C6.43 20.23 7.13 20.81 7.93 21.22C8.73 21.63 9.61 21.85 10.51 21.87C11.41 21.89 12.3 21.71 13.12 21.33C13.94 20.96 14.67 20.4 15.25 19.71C15.83 19.02 16.25 18.21 16.48 17.34C16.71 16.47 16.74 15.55 16.58 14.67V8.97C17.8 9.87 19.02 10.34 19.55 10.51V7.46C19.27 7.37 18.5 7.06 17.49 6.46C17.48 6.45 18.38 6.04 19.32 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}`;

  // Make sure we also fix the TikTokIcon in the vumi-gigs app if it exists
  const appTikTokIconPath = path.join(rootDir, 'apps/vumi-gigs/src/components/icons/TikTokIcon.tsx');
  const appTikTokIconDir = path.dirname(appTikTokIconPath);
  
  try {
    // Write the .js file with React.createElement (non-JSX syntax)
    fs.writeFileSync(tikTokIconPath, tikTokIconContent, 'utf8');
    console.log(`✅ Fixed TikTokIcon.js with React.createElement`);
    
    // Write the .jsx file with JSX syntax
    const jsxPath = tikTokIconPath.replace(/\.js$/, '.jsx');
    fs.writeFileSync(jsxPath, tikTokIconJsxContent, 'utf8');
    console.log(`✅ Created TikTokIcon.jsx with JSX syntax`);
    
    // Create the TypeScript version
    const tsxPath = tikTokIconPath.replace(/\.js$/, '.tsx');
    fs.writeFileSync(tsxPath, tikTokIconTsxContent, 'utf8');
    console.log(`✅ Created TikTokIcon.tsx with TypeScript`);
    
    // Create the app-specific TikTokIcon component if the directory exists
    if (!fs.existsSync(appTikTokIconDir)) {
      fs.mkdirSync(appTikTokIconDir, { recursive: true });
      console.log(`✅ Created app-specific directory: ${appTikTokIconDir}`);
    }
    
    fs.writeFileSync(appTikTokIconPath, tikTokIconTsxContent, 'utf8');
    console.log(`✅ Created app-specific TikTokIcon.tsx`);
    
    // Update imports to TikTokIcon in CreatorProfilePage.tsx
    const creatorProfilePath = path.join(rootDir, 'apps/vumi-gigs/src/CreatorProfilePage.tsx');
    if (fs.existsSync(creatorProfilePath)) {
      let content = fs.readFileSync(creatorProfilePath, 'utf8');
      
      // Check if we need to add the import
      if (!content.includes('import { TikTokIcon }')) {
        content = content.replace(
          'import { Award, Briefcase, Calendar, CheckCircle, ChevronLeft, Clock, DollarSign, Flag, Globe, Globe2, Instagram, Languages, Link, Mail, MapPin, MessageCircle, Phone, Share, Star, Twitch, User, Users, Video, Youtube } from \'lucide-react\';',
          'import { Award, Briefcase, Calendar, CheckCircle, ChevronLeft, Clock, DollarSign, Flag, Globe, Globe2, Instagram, Languages, Link, Mail, MapPin, MessageCircle, Phone, Share, Star, Twitch, User, Users, Video, Youtube } from \'lucide-react\';\nimport { TikTokIcon } from \'./components/icons/TikTokIcon\';'
        );
        
        fs.writeFileSync(creatorProfilePath, content, 'utf8');
        console.log(`✅ Added TikTokIcon import to CreatorProfilePage.tsx`);
      }
    }
    
    // Find all files that might import TikTokIcon
    const allFiles = globSync(['apps/**/*.{ts,tsx,js,jsx}', 'packages/**/*.{ts,tsx,js,jsx}'], { 
      cwd: rootDir, 
      ignore: ['**/node_modules/**', '**/.git/**', '**/dist/**', '**/build/**'] 
    });
    
    let importsUpdated = 0;
    
    for (const file of allFiles) {
      const fullPath = path.join(rootDir, file);
      
      // Skip the icon files themselves
      if (file.includes('TikTokIcon')) continue;
      
      let content = fs.readFileSync(fullPath, 'utf8');
      const originalContent = content;
      
      // Update imports based on file extension
      const fileExt = path.extname(fullPath);
      let targetExt = '.js';
      
      // For TypeScript files, use .tsx extension
      if (fileExt === '.ts' || fileExt === '.tsx') {
        targetExt = '.tsx';
      } 
      // For JSX files, use .jsx extension
      else if (fileExt === '.jsx') {
        targetExt = '.jsx';
      }
      
      // Update imports
      content = content.replace(
        /from ['"](.+?)\/TikTokIcon(?:\.js)?['"]/g, 
        `from '$1/TikTokIcon${targetExt}'`
      );
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        importsUpdated++;
        console.log(`✅ Updated TikTokIcon import in: ${file}`);
      }
    }
    
    // Verify the fix was successful
    const isFixed = !containsJSX(tikTokIconPath);
    
    if (isFixed) {
      console.log(`🎉 Successfully fixed TikTokIcon and updated ${importsUpdated} imports`);
      return true;
    } else {
      console.error('⚠️ TikTokIcon still contains JSX syntax. Fix may not have been successful.');
      return false;
    }
  } catch (error) {
    console.error('❌ Error fixing TikTokIcon:', error);
    return false;
  }
}

// Run the fix
const success = fixTikTokIcon();

if (!success) {
  console.log('⚠️ The fix did not complete successfully. Please check the errors above.');
  process.exit(1);
} else {
  console.log('✅ Fix completed successfully!');
}
