import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // App aktualisiert sich im Hintergrund selbst, wenn du neuen Code pushst
      manifest: {
        name: 'Perfusor Laufratenrechner',
        short_name: 'Perfusor',
        description: 'Medizinischer Rechner für Laufraten und Dosierungen',
        theme_color: '#d32f2f',
        background_color: '#f4f6f8',
        display: 'standalone', // Sorgt dafür, dass die Browser-Adressleiste verschwindet
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})