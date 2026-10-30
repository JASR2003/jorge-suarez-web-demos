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
        clinicaEspecialidades: resolve(projectRoot, 'clinica', 'especialidades', 'index.html'),
        clinicaMedicos: resolve(projectRoot, 'clinica', 'medicos', 'index.html'),
        clinicaDiagnostico: resolve(projectRoot, 'clinica', 'diagnostico', 'index.html'),
        clinicaCitas: resolve(projectRoot, 'clinica', 'citas', 'index.html'),
        clinicaPacientes: resolve(projectRoot, 'clinica', 'pacientes', 'index.html'),
        clinicaUbicacion: resolve(projectRoot, 'clinica', 'ubicacion', 'index.html'),
        inmobiliariaPropiedades: resolve(projectRoot, 'inmobiliaria', 'propiedades', 'index.html'),
        inmobiliariaPropiedad: resolve(projectRoot, 'inmobiliaria', 'propiedad', 'index.html'),
        inmobiliariaVender: resolve(projectRoot, 'inmobiliaria', 'vender', 'index.html'),
        inmobiliariaZonas: resolve(projectRoot, 'inmobiliaria', 'zonas', 'index.html'),
        inmobiliariaAsesores: resolve(projectRoot, 'inmobiliaria', 'asesores', 'index.html'),
        tiendaCatalogo: resolve(projectRoot, 'tienda', 'catalogo', 'index.html'),
        tiendaProducto: resolve(projectRoot, 'tienda', 'producto', 'index.html'),
        tiendaBolsa: resolve(projectRoot, 'tienda', 'bolsa', 'index.html'),
        tiendaEnvios: resolve(projectRoot, 'tienda', 'envios', 'index.html'),
        tiendaFavoritos: resolve(projectRoot, 'tienda', 'favoritos', 'index.html'),
        tiendaCheckout: resolve(projectRoot, 'tienda', 'checkout', 'index.html'),
        tiendaCuenta: resolve(projectRoot, 'tienda', 'cuenta', 'index.html'),
        tiendaPedido: resolve(projectRoot, 'tienda', 'pedido', 'index.html'),
        despachoAreas: resolve(projectRoot, 'despacho', 'areas', 'index.html'),
        despachoArea: resolve(projectRoot, 'despacho', 'area', 'index.html'),
        despachoEquipo: resolve(projectRoot, 'despacho', 'equipo', 'index.html'),
        despachoAbogado: resolve(projectRoot, 'despacho', 'abogado', 'index.html'),
        despachoExperiencia: resolve(projectRoot, 'despacho', 'experiencia', 'index.html'),
        despachoRecursos: resolve(projectRoot, 'despacho', 'recursos', 'index.html'),
        despachoFirma: resolve(projectRoot, 'despacho', 'firma', 'index.html'),
        despachoContacto: resolve(projectRoot, 'despacho', 'contacto', 'index.html'),
        blogSeason2425: resolve(projectRoot, 'blog', 'temporada-2024-25', 'index.html'),
        blogSeason2526: resolve(projectRoot, 'blog', 'temporada-2025-26', 'index.html'),
        blogSeason2627: resolve(projectRoot, 'blog', 'temporada-2026-27', 'index.html'),
      },
    },
  },
})
