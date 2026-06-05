import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// User page (victorcodificando.github.io) served at the domain root → base '/'
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
