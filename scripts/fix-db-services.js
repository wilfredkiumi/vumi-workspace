import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Create a proper types directory in the apps folder
const appTypesDir = path.join(rootDir, 'apps', 'vumi-gigs', 'src', 'types');
if (!fs.existsSync(appTypesDir)) {
  fs.mkdirSync(appTypesDir, { recursive: true });
}

// Copy the types file directly (no symlinks)
const typesContent = fs.readFileSync(path.join(rootDir, 'types', 'index.ts'), 'utf8');
fs.writeFileSync(path.join(appTypesDir, 'index.ts'), typesContent);
console.log('✅ Created types file in app directory');

// Fix database service files
const dbServiceFiles = [
  'src/services/db/creatorService.ts',
  'src/services/db/showcaseService.ts',
  'src/services/db/ticketService.ts',
  'src/services/db/userService.ts',
];

dbServiceFiles.forEach(file => {
  const filePath = path.join(rootDir, 'apps', 'vumi-gigs', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix imports
    content = content.replace(/import { API } from '@aws-amplify\/api';/g, 
      `import { API } from '@aws-amplify/api';
// For type checking only
import type { Creator, User, Showcase, EventTicket } from '../../../types/index';`);
    
    // Fix DynamoDB mock
    content = content.replace(/const DynamoDB = {[^}]+};/gs, 
      `// Mock DynamoDB for type checking
const DynamoDB = {
  query: () => ({ Items: [] }),
  put: () => ({}),
  update: () => ({ Attributes: {} }),
  delete: () => ({}),
  get: () => ({}),
  scan: () => ({ Items: [] })
};`);
    
    // Remove redundant import
    content = content.replace(/import { User, Creator, Showcase, EventTicket } from "\.\.\/\.\.\/\.\.\/types\/index\.js";/g, '');
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed ${file}`);
  } else {
    console.log(`⚠️ File not found: ${file}`);
  }
});

// Fix API service
const apiServicePath = path.join(rootDir, 'apps', 'vumi-gigs', 'src/services/api.ts');
if (fs.existsSync(apiServicePath)) {
  let content = fs.readFileSync(apiServicePath, 'utf8');
  
  // Fix imports and add PostOperation implementation
  content = content.replace(/import { post } from '@aws-amplify\/api';/g, 
    `import { post } from '@aws-amplify/api';
import type { Creator, User, Gig, Application } from '../../types/index';

// Define PostOperation interface
interface PostOperation {
  data?: any;
}`);
  
  // Fix post<> calls
  content = content.replace(/post<any>\/\*GraphQLQuery<([^>]+)>\*\//g, 'post');
  
  fs.writeFileSync(apiServicePath, content);
  console.log('✅ Fixed API service');
} else {
  console.log('⚠️ API service file not found');
}

console.log('\n🎉 Fixed DB and API services');
