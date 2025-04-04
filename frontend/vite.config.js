import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Escucha en todas las interfaces
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Usa el nombre del servicio Docker del backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    watch: {
      usePolling: true, // Necesario para entornos Docker
    },
  }
})

