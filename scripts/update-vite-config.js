import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { globSync } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

/**
 * Update Vite configs to handle JSX in JS files
 */
function updateViteConfigs() {
  console.log('🔧 Updating Vite configs to handle JSX in JS files...');
  
  const configFiles = globSync('apps/*/vite.config.{js,ts}', { cwd: rootDir });
  let updatedCount = 0;
  
  for (const configPath of configFiles) {
    const fullPath = path.join(rootDir, configPath);
    let content = fs.readFileSync(fullPath, 'utf8');
    const originalContent = content;
    
    // Check if the config already has the loader configuration
    if (!content.includes("'.js': 'jsx'")) {
      // Add the optimizeDeps configuration
      if (content.includes('optimizeDeps')) {
        // If optimizeDeps exists but doesn't have esbuildOptions.loader
        if (!content.includes('esbuildOptions')) {
          content = content.replace(
            /optimizeDeps\s*:\s*{/,
            `optimizeDeps: {\n    esbuildOptions: {\n      loader: {\n        '.js': 'jsx',\n      },\n    },`
          );
        } else if (!content.includes('loader')) {
          content = content.replace(
            /esbuildOptions\s*:\s*{/,
            `esbuildOptions: {\n      loader: {\n        '.js': 'jsx',\n      },`
          );
        }
      } else {
        // If optimizeDeps doesn't exist at all
        content = content.replace(
          /export default defineConfig\(\{/,
          `export default defineConfig({\n  optimizeDeps: {\n    esbuildOptions: {\n      loader: {\n        '.js': 'jsx',\n      },\n    },\n  },`
        );
      }
      
      // Make sure there's a proper build.commonjsOptions configuration
      if (!content.includes('commonjsOptions')) {
        if (content.includes('build')) {
          content = content.replace(
            /build\s*:\s*{/,
            `build: {\n    commonjsOptions: {\n      transformMixedEsModules: true\n    },`
          );
        } else {
          // Add build configuration
          const closingBraceIndex = content.lastIndexOf('}');
          content = content.slice(0, closingBraceIndex) + 
                   `,\n  build: {\n    commonjsOptions: {\n      transformMixedEsModules: true\n    }\n  }` + 
                   content.slice(closingBraceIndex);
        }
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`✅ Updated Vite config in ${configPath}`);
        updatedCount++;
      }
    }
  }
  
  console.log(`\n🎉 Updated ${updatedCount} Vite configs`);
  return updatedCount;
}

updateViteConfigs();
