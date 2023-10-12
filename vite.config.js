import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'restaurantapp',
        short_name: 'restaurantapp',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        lang: 'en',
        scope: '/',
        icons: [
          {
            src: '/image/logo.png',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  define: { 'process.env': process.env },
});
