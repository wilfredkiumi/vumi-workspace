import fs from 'fs';
import path from 'path';

// Fix the StudioProfilePage component
const studioProfilePath = path.resolve('src/pages/StudioProfilePage.tsx');

if (fs.existsSync(studioProfilePath)) {
  let content = fs.readFileSync(studioProfilePath, 'utf8');
  
  // Add useParams import
  if (!content.includes('useParams')) {
    content = content.replace(
      'import { useNavigate } from "react-router-dom";',
      'import { useNavigate, useParams } from "react-router-dom";'
    );
  }
  
  // Update the component to use URL params
  content = content.replace(
    'export function StudioProfilePage({ studioId, onBack }: StudioProfilePageProps) {',
    `export function StudioProfilePage({ onBack }: Omit<StudioProfilePageProps, 'studioId'>) {
  const { studioId } = useParams<{ studioId: string }>();`
  );
  
  fs.writeFileSync(studioProfilePath, content, 'utf8');
  console.log('Fixed StudioProfilePage component');
}

// Fix the routes configuration
const routesPath = path.resolve('src/routes/index.tsx');

if (fs.existsSync(routesPath)) {
  let content = fs.readFileSync(routesPath, 'utf8');
  
  // Update the studio route to use a URL parameter instead of prop passing
  content = content.replace(
    `    path: "/studios/:id",
    element: <StudioProfilePage />`,
    `    path: "/studios/:studioId",
    element: <StudioProfilePage onBack={() => navigate('/studios')} />`
  );
  
  fs.writeFileSync(routesPath, content, 'utf8');
  console.log('Fixed routes configuration');
}

// Fix StudioProfilePageProps interface
const modelsPath = path.resolve('src/models.ts');

if (fs.existsSync(modelsPath)) {
  let content = fs.readFileSync(modelsPath, 'utf8');
  
  // Update StudioProfilePageProps to make studioId optional
  if (content.includes('interface StudioProfilePageProps')) {
    content = content.replace(
      'interface StudioProfilePageProps {',
      'interface StudioProfilePageProps {'
    );
    
    content = content.replace(
      'studioId: string;',
      'studioId?: string;'
    );
  }
  
  fs.writeFileSync(modelsPath, content, 'utf8');
  console.log('Fixed StudioProfilePageProps interface');
}

console.log('Fixes applied. Try building with: npm run build:skipcheck');