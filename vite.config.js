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
      workbox: {
        globPatterns: ['**/*'], // cache all imports
      },
      manifest: {
        name: 'restaurantapp',
        short_name: 'restaurantapp',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        lang: 'en',
        scope: '/',
        form_factor: ['wide', 'fullscreen'],
        icons: [
          {
            src: '/image/144Icon.png',
            sizes: '144x144',
            type: 'image/png',
            purpose: 'any',
          },
        ],
        screenshots: [
          {
            src: '/image/512Icon.png',
            sizes: '512x512',
            type: 'image/gif',
            form_factor: 'wide',
          },
          {
            src: '/image/logo.png',
            sizes: '512x512',
            type: 'image/gif',
          },
        ],
      },
    }),
  ],
  define: { 'process.env': process.env },
});
