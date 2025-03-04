import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { globSync } from 'glob';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

/**
 * Fix JSX in JS files by renaming them to .jsx or reconfiguring Vite
 */
async function fixJsxInJsFiles() {
  console.log('🔧 Fixing JSX in .js files...');

  // First, update Vite config to properly handle JSX in .js files
  const viteConfigPaths = globSync('apps/*/vite.config.{js,ts}', { cwd: rootDir });
  
  for (const configPath of viteConfigPaths) {
    const fullPath = path.join(rootDir, configPath);
    let content = fs.readFileSync(fullPath, 'utf8');
    let wasModified = false;
    
    // Check if the optimizeDeps.esbuildOptions.loader configuration has '.js': 'jsx'
    if (!content.includes("'.js': 'jsx'")) {
      if (content.includes('optimizeDeps')) {
        if (content.includes('esbuildOptions')) {
          // Add loader config to existing esbuildOptions
          if (!content.includes('loader')) {
            content = content.replace(
              /esbuildOptions\s*:\s*\{/,
              `esbuildOptions: {\n      loader: {\n        '.js': 'jsx',\n      },`
            );
            wasModified = true;
          }
        } else {
          // Add esbuildOptions with loader config
          content = content.replace(
            /optimizeDeps\s*:\s*\{/,
            `optimizeDeps: {\n    esbuildOptions: {\n      loader: {\n        '.js': 'jsx',\n      },\n    },`
          );
          wasModified = true;
        }
      } else {
        // Add optimizeDeps with esbuildOptions and loader config
        content = content.replace(
          /export default defineConfig\(\{/,
          `export default defineConfig({\n  optimizeDeps: {\n    esbuildOptions: {\n      loader: {\n        '.js': 'jsx',\n      },\n    },\n  },`
        );
        wasModified = true;
      }
    }
    
    // Add necessary parts to rollupOptions if not present
    if (!content.includes('rollupOptions')) {
      // Check if build section exists
      if (content.includes('build')) {
        // Add rollupOptions to existing build section
        content = content.replace(
          /build\s*:\s*\{/,
          `build: {\n    rollupOptions: {\n      external: ['react', 'react-dom'],\n    },`
        );
        wasModified = true;
      } else {
        // Add build section with rollupOptions before the last closing brace
        const closingBraceIndex = content.lastIndexOf('}');
        content = content.slice(0, closingBraceIndex) + 
                 `,\n  build: {\n    rollupOptions: {\n      external: ['react', 'react-dom'],\n    }\n  }` + 
                 content.slice(closingBraceIndex);
        wasModified = true;
      }
    }
    
    if (wasModified) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`✅ Updated Vite config in ${configPath}`);
    }
  }
  
  // Second approach: Rename problematic .js files with JSX to .jsx
  const sharedDistDir = path.join(rootDir, 'packages', 'shared', 'dist');
  if (fs.existsSync(sharedDistDir)) {
    const jsFiles = globSync('**/*.js', { cwd: sharedDistDir });
    
    for (const jsFile of jsFiles) {
      const fullPath = path.join(sharedDistDir, jsFile);
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Check if the file contains JSX syntax
      if (content.includes('<') && content.includes('/>') || 
          content.includes('</') && content.includes('>')) {
        
        // Create a new file with .jsx extension
        const jsxFilePath = fullPath.replace(/\.js$/, '.jsx');
        fs.writeFileSync(jsxFilePath, content, 'utf8');
        console.log(`✅ Created JSX version of: ${jsFile}`);
        
        // Update imports in other files to reference the .jsx file instead of .js
        const fileToFind = jsFile.replace(/\.js$/, '');
        const filesToUpdate = globSync('**/*.{js,jsx}', { 
          cwd: sharedDistDir,
          ignore: [jsFile] // Ignore the original file
        });
        
        for (const fileToUpdate of filesToUpdate) {
          const updatePath = path.join(sharedDistDir, fileToUpdate);
          let updateContent = fs.readFileSync(updatePath, 'utf8');
          const originalContent = updateContent;
          
          // Look for imports of the renamed file
          const importRegex = new RegExp(`from\\s+['"](.*?/${fileToFind}(?:\\.js)?)['\"]`, 'g');
          updateContent = updateContent.replace(importRegex, (match, p1) => {
            const basePath = p1.replace(/\.js$/, '');
            return `from '${basePath}.jsx'`;
          });
          
          if (updateContent !== originalContent) {
            fs.writeFileSync(updatePath, updateContent, 'utf8');
            console.log(`✅ Updated imports in: ${fileToUpdate}`);
          }
        }
      }
    }
  }
  
  // Third approach: Add a resolve.extensions configuration to Vite
  for (const configPath of viteConfigPaths) {
    const fullPath = path.join(rootDir, configPath);
    let content = fs.readFileSync(fullPath, 'utf8');
    let wasModified = false;
    
    // Add or update resolve.extensions
    if (!content.includes('resolve.extensions')) {
      if (content.includes('resolve')) {
        // Add extensions to existing resolve
        if (!content.includes('extensions')) {
          content = content.replace(
            /resolve\s*:\s*\{/,
            `resolve: {\n    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],`
          );
          wasModified = true;
        }
      } else {
        // Add resolve with extensions
        content = content.replace(
          /export default defineConfig\(\{/,
          `export default defineConfig({\n  resolve: {\n    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],\n  },`
        );
        wasModified = true;
      }
    }
    
    if (wasModified) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`✅ Added resolve.extensions to Vite config in ${configPath}`);
    }
  }
  
  console.log('🎉 Completed JSX in JS fixes');

  // Clean and rebuild the project
  console.log('🔄 Cleaning build artifacts...');
  try {
    // Clean builds
    await execAsync('npx rimraf apps/vumi-gigs/dist');
    console.log('✅ Clean completed');
  } catch (error) {
    console.error('❌ Clean failed:', error);
  }
}

// Run the fix
fixJsxInJsFiles();
