import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Files to fix
const files = [
  {
    path: 'packages/ui/components/studio/StudioContact.tsx',
    componentName: 'StudioContact'
  },
  {
    path: 'packages/ui/components/studio/StudioFacilities.tsx',
    componentName: 'StudioFacilities'
  },
  {
    path: 'packages/ui/components/studio/StudioHeader.tsx',
    componentName: 'StudioHeader'
  },
  {
    path: 'packages/ui/components/studio/StudioMetrics.tsx',
    componentName: 'StudioMetrics'
  },
  {
    path: 'packages/ui/components/studio/StudioProjects.tsx',
    componentName: 'StudioProjects'
  },
  {
    path: 'packages/ui/components/studio/StudioServices.tsx',
    componentName: 'StudioServices'
  },
  {
    path: 'packages/ui/components/studio/StudioTeam.tsx',
    componentName: 'StudioTeam'
  },
  {
    path: 'packages/ui/CreatorPlans.tsx',
    componentName: 'CreatorPlans'
  },
  {
    path: 'packages/ui/CreatorProfile.tsx',
    componentName: 'CreatorProfile'
  }
];

console.log('🔧 Fixing function syntax in components...');

files.forEach(file => {
  const filePath = path.join(rootDir, file.path);
  if (fs.existsSync(filePath)) {
    console.log(`Processing ${file.path}...`);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find the problematic function declaration and fix it
    const incorrectSyntaxPattern = new RegExp(
      `export\\s+function\\s+${file.componentName}\\s*=\\s*\\(\\{([^}]*?)\\}\\s*:\\s*[\\w]+Props\\)\\s*\\{`, 
      'g'
    );
    
    if (incorrectSyntaxPattern.test(content)) {
      // Fix the syntax - convert "function Name = ()" to "function Name()"
      content = content.replace(
        incorrectSyntaxPattern,
        `export function ${file.componentName}({$1}: ${file.componentName}Props) {`
      );
      
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed ${file.path}`);
    } else {
      console.log(`ℹ️ No syntax error found in ${file.path}`);
    }
  } else {
    console.log(`⚠️ File not found: ${file.path}`);
  }
});

console.log('\n✅ All function syntax errors fixed!');
console.log('  Run: npm run build:skipcheck');
