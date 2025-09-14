import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',  // Automatically update the service worker when changes occur
      devOptions: {
        enabled: true, // Enable PWA in dev mode
      },
      manifest: {
        name: 'HomeBase',
        short_name: 'HomeBase',
        description: 'Real estate app',
        start_url: '/',
        display: 'standalone',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      inject: {
        // Inject the service worker at build time
        sw: 'service-worker.js',
      },
      workbox: {
        runtimeCaching: [
          // Cache Static Assets (e.g., CSS, JS, Images)
          {
            urlPattern: ({ request }) =>
                ['style', 'script', 'image'].includes(request.destination),
            handler: 'CacheFirst',
            method: 'GET',
            options: {
              cacheName: 'static-assets',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 30, // Cache for 30 days
                maxEntries: 200, // Limit to 200 files
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          // Cache API Responses
          {
            urlPattern: ({ url }) => url.pathname.includes('api'),
            handler: 'NetworkFirst',
            method: 'GET',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24, // Cache for 1 day
                maxEntries: 100, // Limit to 100 entries
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          // Cache HTML Pages
          {
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'StaleWhileRevalidate',
            method: 'GET',
            options: {
              cacheName: 'html-cache',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 7, // Cache for 7 days
                maxEntries: 50, // Limit to 50 pages
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ]
      },
    }),
  ],
});