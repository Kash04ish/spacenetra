import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // suppress warning for large bundles
  },
  server: {
    port: 3000, // optional: dev server port
  },
});
