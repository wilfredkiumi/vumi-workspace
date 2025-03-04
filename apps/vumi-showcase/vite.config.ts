import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['ui', '@vumi/shared'],
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
      target: 'es2020'
    }
  },
  build: {
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
    target: 'es2020',
    commonjsOptions: {
      include: [/node_modules/, /ui/, /@vumi\/shared/]
    },
    sourcemap: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      'src': path.resolve(__dirname, './src')
    }
  },
  server: {
    watch: {
      usePolling: true
    },
    fs: {
      strict: false
    }
  }
});