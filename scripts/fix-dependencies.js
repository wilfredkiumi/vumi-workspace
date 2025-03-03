import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🔧 Fixing missing dependencies...');

// Define missing dependencies
const missingDependencies = {
  'apps/vumi-gigs/package.json': {
    dependencies: {
      'react-router-dom': '^6.15.0',
      '@aws-amplify/api': '^5.4.0',
      'lucide-react': '^0.263.1'
    },
    devDependencies: {
      '@types/react-router-dom': '^5.3.3'
    }
  },
  'packages/ui/package.json': {
    dependencies: {
      'react-router-dom': '^6.15.0',
      'lucide-react': '^0.263.1'
    },
    peerDependencies: {
      'react': '>=18.0.0',
      'react-dom': '>=18.0.0'
    }
  }
};

// Process each package.json file
for (const [packagePath, deps] of Object.entries(missingDependencies)) {
  const fullPath = path.join(rootDir, packagePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️ Package file not found: ${packagePath}`);
    continue;
  }

  try {
    console.log(`📦 Updating dependencies in ${packagePath}...`);
    const packageJson = JSON.parse(fs.readFileSync(fullPath, 'utf8'));

    // Update dependencies
    if (deps.dependencies) {
      packageJson.dependencies = packageJson.dependencies || {};
      for (const [dep, version] of Object.entries(deps.dependencies)) {
        if (!packageJson.dependencies[dep]) {
          packageJson.dependencies[dep] = version;
          console.log(`  + Added dependency: ${dep}@${version}`);
        }
      }
    }

    // Update devDependencies
    if (deps.devDependencies) {
      packageJson.devDependencies = packageJson.devDependencies || {};
      for (const [dep, version] of Object.entries(deps.devDependencies)) {
        if (!packageJson.devDependencies[dep]) {
          packageJson.devDependencies[dep] = version;
          console.log(`  + Added devDependency: ${dep}@${version}`);
        }
      }
    }

    // Update peerDependencies
    if (deps.peerDependencies) {
      packageJson.peerDependencies = packageJson.peerDependencies || {};
      for (const [dep, version] of Object.entries(deps.peerDependencies)) {
        if (!packageJson.peerDependencies[dep]) {
          packageJson.peerDependencies[dep] = version;
          console.log(`  + Added peerDependency: ${dep}@${version}`);
        }
      }
    }

    // Write back the updated package.json
    fs.writeFileSync(fullPath, JSON.stringify(packageJson, null, 2));
  } catch (error) {
    console.error(`❌ Error updating ${packagePath}: ${error.message}`);
  }
}

// Create a script to fix specific import issues
console.log('\n🔧 Checking for import issues in CreatorProfilePage.tsx...');

const creatorProfilePath = path.join(rootDir, 'apps/vumi-gigs/src/CreatorProfilePage.tsx');

if (fs.existsSync(creatorProfilePath)) {
  try {
    let content = fs.readFileSync(creatorProfilePath, 'utf8');
    
    // Replace react-router-dom direct import with relative import to router
    if (content.includes('import { useParams } from \'react-router-dom\';')) {
      content = content.replace(
        'import { useParams } from \'react-router-dom\';',
        'import { useParams } from \'./router\';'
      );
      
      fs.writeFileSync(creatorProfilePath, content);
      console.log('✅ Fixed react-router-dom import in CreatorProfilePage.tsx');
    } else {
      console.log('ℹ️ No import issue found in CreatorProfilePage.tsx');
    }
  } catch (error) {
    console.error(`❌ Error fixing CreatorProfilePage.tsx: ${error.message}`);
  }
}

// Create router.ts file if it doesn't exist
const routerFilePath = path.join(rootDir, 'apps/vumi-gigs/src/router.ts');

if (!fs.existsSync(routerFilePath)) {
  console.log('📄 Creating router.ts file...');
  
  const routerContent = `// Re-export from react-router-dom to avoid direct dependency
import { 
  useParams, 
  useNavigate, 
  useLocation,
  Link,
  Outlet,
  Navigate
} from 'react-router-dom';

export { 
  useParams, 
  useNavigate, 
  useLocation,
  Link,
  Outlet,
  Navigate
};`;
  
  fs.writeFileSync(routerFilePath, routerContent);
  console.log('✅ Created router.ts file');
}

console.log('\n🎉 All dependency fixes applied!');
console.log('📋 Next steps:');
console.log('  1. Run: npm install');
console.log('  2. Run: npm run build:skipcheck');
