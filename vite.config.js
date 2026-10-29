import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
  ],

  server: {
    host: true,

    proxy: {
      '/api/leads': {
        target: 'https://server.digitalness.co.in',
        changeOrigin: true,
        secure: false,
      },
      '/api/contact': {
        target: 'https://server.digitalness.co.in',
        changeOrigin: true,
        secure: false,
      },
      '/api': {
        target: 'https://server.digitalness.co.in',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
