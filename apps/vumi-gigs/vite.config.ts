import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  build: {
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  define: {
    global: 'window',
    'process.env': {}
  },
  server: {
    port: 3000,
    open: true
  }
});