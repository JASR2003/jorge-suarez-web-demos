import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = fileURLToPath(new URL('.', import.meta.url))
const demoPages = [
  'restaurante',
  'fitness',
  'clinica',
  'inmobiliaria',
  'tienda',
  'producto',
  'despacho',
  'evento',
  'blog',
  'corporativo',
]

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(projectRoot, 'index.html'),
        ...Object.fromEntries(
          demoPages.map((page) => [page, resolve(projectRoot, page, 'index.html')]),
        ),
      },
    },
  },
})
