import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/localhost:7172\/api\/.*/i,
            handler: 'NetworkFirst',
            method: 'GET', // Solo cachear GET
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 10,
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            // NO cachear POST, PUT, DELETE, PATCH
            urlPattern: /^https:\/\/localhost:7172\/api\/.*/i,
            handler: 'NetworkOnly', // Siempre ir a la red
            method: 'POST'
          },
          {
            urlPattern: /^https:\/\/localhost:7172\/api\/.*/i,
            handler: 'NetworkOnly',
            method: 'PUT'
          },
          {
            urlPattern: /^https:\/\/localhost:7172\/api\/.*/i,
            handler: 'NetworkOnly',
            method: 'DELETE'
          },
          {
            urlPattern: /^https:\/\/localhost:7172\/api\/.*/i,
            handler: 'NetworkOnly',
            method: 'PATCH'
          }
        ]
      },
      manifest: {
        name: 'Gestión Hantonio Jaramillo',
        short_name: 'Hantonio',
        description: 'Sistema de gestión para sastrería Hantonio Jaramillo',
        theme_color: '#2563eb',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      devOptions: {
        enabled: true
      }
    })
  ],
})
