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
        fitnessInstalaciones: resolve(projectRoot, 'fitness', 'instalaciones', 'index.html'),
        fitnessClases: resolve(projectRoot, 'fitness', 'clases', 'index.html'),
        fitnessEntrenadores: resolve(projectRoot, 'fitness', 'entrenadores', 'index.html'),
        fitnessEventos: resolve(projectRoot, 'fitness', 'eventos', 'index.html'),
        fitnessHorarios: resolve(projectRoot, 'fitness', 'horarios', 'index.html'),
      },
    },
  },
})
