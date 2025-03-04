import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

/**
 * Comprehensive fix for all JSX/JS issues
 */
function fixAllJsJsxIssues() {
  console.log('🔧 Fixing all JS/JSX issues...');
  
  // Make sure directories exist
  ensureDirectories([
    'packages/shared/dist/components/VideoMeeting',
    'packages/shared/dist/components/auth',
    'packages/shared/dist/contexts',
    'packages/shared/dist/components/icons',
    'apps/vumi-gigs/src/components/icons'
  ]);

  // Fix TikTokIcon
  writeTikTokIcon();
  
  // Fix VideoMeetingPage
  writeVideoMeetingPage();
  
  // Fix AuthContext
  writeAuthContext();
  
  // Fix MeetingContext
  writeMeetingContext();
  
  // Fix LoginForm
  writeLoginForm();
  
  console.log('🎉 All JS/JSX issues fixed successfully!');
}

// Helper to ensure directories exist
function ensureDirectories(dirs) {
  for (const dir of dirs) {
    const fullPath = path.join(rootDir, dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`✅ Created directory: ${fullPath}`);
    }
  }
}

// Fix TikTokIcon
function writeTikTokIcon() {
  // TikTokIcon in shared package
  const sharedContent = `import React from 'react';

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

  // Content for the JSX version
  const sharedJsxContent = `import React from 'react';

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

  // App-specific TikTokIcon
  const appTsxContent = `import { LucideProps } from 'lucide-react';

export function TikTokIcon(props: LucideProps) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.32 5.5C19.39 5.51 19.47 5.51 19.55 5.51C19.52 5.51 19.45 5.51 19.37 5.5H19.32Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.55 5.51C19.45 5.51 19.38 5.51 19.32 5.5C17.72 3.56 17.49 2.55 17.49 2.55H14.44V16.62C14.44 17.14 14.33 17.65 14.12 18.12C13.91 18.58 13.6 19 13.21 19.34C12.82 19.68 12.36 19.94 11.86 20.1C11.36 20.26 10.83 20.31 10.31 20.26C9.79 20.21 9.28 20.05 8.82 19.79C8.36 19.53 7.95 19.19 7.63 18.77C7.31 18.35 7.08 17.87 6.95 17.36C6.83 16.85 6.81 16.32 6.9 15.8C6.99 15.28 7.18 14.79 7.47 14.36C7.76 13.92 8.13 13.55 8.57 13.27C9.01 12.98 9.5 12.79 10.02 12.71C10.54 12.63 11.07 12.65 11.58 12.78V9.8C11.23 9.72 10.87 9.68 10.51 9.69C9.61 9.71 8.73 9.93 7.93 10.34C7.13 10.75 6.43 11.33 5.88 12.04C5.33 12.75 4.94 13.57 4.74 14.45C4.54 15.32 4.54 16.23 4.74 17.11C4.94 17.99 5.33 18.81 5.88 19.52C6.43 20.23 7.13 20.81 7.93 21.22C8.73 21.63 9.61 21.85 10.51 21.87C11.41 21.89 12.3 21.71 13.12 21.33C13.94 20.96 14.67 20.4 15.25 19.71C15.83 19.02 16.25 18.21 16.48 17.34C16.71 16.47 16.74 15.55 16.58 14.67V8.97C17.8 9.87 19.02 10.34 19.55 10.51V7.