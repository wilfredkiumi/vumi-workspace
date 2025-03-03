import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const typesContent = `import { ReactNode } from 'react';

export interface Creator {
  id: string;
  createdAt: string;
  creatorType: 'influencer' | 'crew';
  platforms?: string[];
  contentTypes?: string[];
  audienceSize?: number;
  teamSize?: number;
  equipmentOwned?: string[];
  specializations?: string[];
  availability?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Showcase {
  id: string;
  title: string;
}

export interface EventTicket {
  id: string;
  eventId: string;
}

export interface ButtonProps {
  icon?: ReactNode;
  content: ReactNode;
}

// Add other missing interfaces
export interface Application {
  id: string;
}

export interface Gig {
  id: string;
}`;

const apiTypesContent = `import { GraphQLQuery } from '@aws-amplify/api';
import { Creator, User, Gig, Application } from '../types/index.js';

export interface PostOperation {
  data?: any;
}

export interface GetUserResponse {
  data?: {
    getUser: User;
  };
}

export interface CreateUserResponse {
  data?: {
    createUser: User;
  };
}

export interface UpdateUserResponse {
  data?: {
    updateUser: User;
  };
}

export interface ListGigsResponse {
  data?: {
    listGigs: {
      items: Gig[];
    };
  };
}

export interface GetGigResponse {
  data?: {
    getGig: Gig;
  };
}

export interface CreateGigResponse {
  data?: {
    createGig: Gig;
  };
}

export interface UpdateGigResponse {
  data?: {
    updateGig: Gig;
  };
}

export interface DeleteGigResponse {
  data?: {
    deleteGig: {
      id: string;
    };
  };
}

export interface ListCreatorsResponse {
  data?: {
    listCreators: {
      items: Creator[];
    };
  };
}

export interface GetCreatorResponse {
  data?: {
    getCreator: Creator;
  };
}

export interface CreateApplicationResponse {
  data?: {
    createApplication: Application;
  };
}

export interface GetApplicationResponse {
  data?: {
    getApplication: Application;
  };
}

export interface ListApplicationsResponse {
  data?: {
    listApplications: {
      items: Application[];
    };
  };
}`;

async function main() {
  try {
    console.log('📝 Creating necessary type definition files...');
    
    // Get the root directory
    const rootDir = path.resolve(__dirname, '..');
    
    // Create types directory if it doesn't exist
    const typesDir = path.join(rootDir, 'types');
    if (!fs.existsSync(typesDir)) {
      fs.mkdirSync(typesDir);
    }
    
    // Write types file
    fs.writeFileSync(path.join(typesDir, 'index.ts'), typesContent);
    console.log('✅ Created types/index.ts');
    
    // Create services directory if it doesn't exist
    const servicesDir = path.join(rootDir, 'services');
    if (!fs.existsSync(servicesDir)) {
      fs.mkdirSync(servicesDir);
    }
    
    // Write API types file
    fs.writeFileSync(path.join(servicesDir, 'api-types.ts'), apiTypesContent);
    console.log('✅ Created services/api-types.ts');
    
    // Update package.json to add fix script if it doesn't exist
    const packageJsonPath = path.join(rootDir, 'package.json');
    let packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    if (!packageJson.scripts.fix) {
      packageJson.scripts.fix = "node scripts/fix-typescript.js";
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log('✅ Added "fix" script to package.json');
    }

    console.log('\n🔧 Running ESLint to fix unused imports...');
    execSync('npx eslint --fix "apps/vumi-gigs/src/**/*.{ts,tsx}" "packages/ui/**/*.{ts,tsx}"', { 
      stdio: 'inherit',
      cwd: rootDir
    });
    
    console.log('\n🔍 Creating symbolic links to type definitions in app directories...');
    
    // Create symlinks to types in the apps directories
    try {
      const gigsTypesDir = path.join(rootDir, 'apps', 'vumi-gigs', 'src', 'types');
      if (!fs.existsSync(gigsTypesDir)) {
        fs.symlinkSync('../../../types', gigsTypesDir, 'dir');
      }
      console.log('✅ Created symlink to types in vumi-gigs app');
    } catch (e) {
      console.log('⚠️ Could not create symlink in vumi-gigs app:', e.message);
    }
    
    try {
      const showcaseTypesDir = path.join(rootDir, 'apps', 'vumi-showcase', 'src', 'types');
      if (!fs.existsSync(showcaseTypesDir)) {
        fs.symlinkSync('../../../types', showcaseTypesDir, 'dir');
      }
      console.log('✅ Created symlink to types in vumi-showcase app');
    } catch (e) {
      console.log('⚠️ Could not create symlink in vumi-showcase app:', e.message);
    }

    console.log('\n✨ All done! Now run "npm run fix" to apply ESLint fixes.');
    console.log('⚠️ You may need to import types where needed:');
    console.log('   import { Creator, User } from "../types";');
    console.log('   import { PostOperation } from "../../services/api-types";');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
