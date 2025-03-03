import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@vumi/shared': path.resolve(__dirname, '../../packages/shared/src')
    }
  },
  define: {
    global: 'window',
    'process.env': {}
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['@vumi/shared'],
  },
  server: {
    port: 3000,
    open: true
  }
});