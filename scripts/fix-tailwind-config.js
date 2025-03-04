import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { globSync } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

/**
 * Fix Tailwind configurations to avoid performance issues
 */
function fixTailwindConfigs() {
  console.log('🔧 Updating Tailwind configs to avoid performance issues...');
  
  const configFiles = globSync('apps/*/tailwind.config.{js,ts}', { cwd: rootDir });
  let updatedCount = 0;
  
  for (const configPath of configFiles) {
    const fullPath = path.join(rootDir, configPath);
    let content = fs.readFileSync(fullPath, 'utf8');
    const originalContent = content;
    
    // Check for patterns that might cause performance issues
    if (content.includes('../../packages/ui/**/*.ts') || content.includes('../../packages/ui/**/*.js')) {
      // Replace problematic patterns with more specific ones
      content = content.replace(
        /(['"])\.\.\/\.\.\/packages\/ui\/\*\*\/\*\.ts(['"])/g,
        '$1../../packages/ui/src/**/*.{js,ts,jsx,tsx}$2'
      );
      
      content = content.replace(
        /(['"])\.\.\/\.\.\/packages\/ui\/\*\*\/\*\.js(['"])/g,
        '$1../../packages/ui/src/**/*.{js,ts,jsx,tsx}$2'
      );
      
      // General catch-all pattern fix
      content = content.replace(
        /(['"])\.\.\/\.\.\/packages\/ui\/\*\*\/\*\.(\w+)(['"])/g,
        '$1../../packages/ui/src/**/*.$2$3'
      );
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`✅ Updated Tailwind config in ${configPath}`);
        updatedCount++;
      }
    }
  }
  
  console.log(`\n🎉 Updated ${updatedCount} Tailwind configs`);
  return updatedCount;
}

fixTailwindConfigs();
