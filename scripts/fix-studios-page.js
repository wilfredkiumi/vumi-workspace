import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const filePath = path.join(rootDir, 'apps/vumi-gigs/src/pages/StudiosListingPage.tsx');

console.log('🔧 Fixing StudiosListingPage.tsx...');

try {
  if (!fs.existsSync(filePath)) {
    console.error('❌ File not found:', filePath);
    process.exit(1);
  }
  
  // Read the entire file
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Fix the function declaration - this is the source of the syntax errors
  // We need to properly handle the component function declaration
  let fixed = content.replace(
    /function\s+StudiosListingPage\s*\(\{([^}]*)\}\)\s*\{([\s\S]*?)const colorMode = "light";\s*\/\/\s*Default colorMode([^{]*?)\}\s*:\s*StudiosListingPageProps\)\s*\{/m,
    function(match, params, beforeColorMode, afterColorMode) {
      return `function StudiosListingPage({ ${params.trim()} }: StudiosListingPageProps) {\n  const colorMode = "light"; // Default colorMode`;
    }
  );
  
  // Write back the fixed content
  fs.writeFileSync(filePath, fixed);
  console.log('✅ Fixed function declaration in StudiosListingPage.tsx');
  
  // Verify the fix by reading the file again
  const verifyContent = fs.readFileSync(filePath, 'utf8');
  if (verifyContent.includes('const colorMode = "light"; // Default colorMode onStudioSelect }:')) {
    console.error('❌ Fix did not work properly. Manual editing may be required.');
  } else {
    console.log('✅ Verification passed');
  }
  
  console.log('Done. You may need to still do some manual fixes if the automatic fix wasn\'t complete.');
} catch (error) {
  console.error('❌ Error:', error);
}
