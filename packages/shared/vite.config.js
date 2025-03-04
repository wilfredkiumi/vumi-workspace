import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VumiShared',
      formats: ['es', 'umd'],
      fileName: (format) => `vumi-shared.${format}.js`
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'aws-amplify',
        '@aws-amplify/auth',
        'react-router-dom'
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          'aws-amplify': 'Amplify',
          '@aws-amplify/auth': 'Auth',
          'react-router-dom': 'ReactRouterDOM'
        }
      }
    },
    sourcemap: true,
    minify: 'esbuild',
    outDir: 'dist',
    emptyOutDir: true
  }
});
