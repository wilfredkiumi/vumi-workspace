import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const configsToFix = [
  {
    path: path.join(rootDir, 'packages', 'shared', 'tsconfig.json'),
    newConfig: {
      compilerOptions: {
        target: "es2020",
        lib: ["DOM", "DOM.Iterable", "ESNext"],
        module: "ESNext",
        skipLibCheck: true,
        moduleResolution: "bundler",
        allowImportingTsExtensions: true,
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        jsx: "react-jsx",
        strict: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        noFallthroughCasesInSwitch: true,
        baseUrl: ".",
        paths: {
          "@/*": ["./src/*"]
        }
      },
      include: ["src"],
      exclude: ["node_modules"]
    }
  }
];

console.log('🔧 Fixing tsconfig files...');

for (const config of configsToFix) {
  try {
    fs.writeFileSync(config.path, JSON.stringify(config.newConfig, null, 2));
    console.log(`✅ Fixed: ${path.relative(rootDir, config.path)}`);
  } catch (error) {
    console.error(`❌ Error fixing ${config.path}:`, error.message);
  }
}

console.log('Done! Run build again with:');
console.log('npm run build:force');
