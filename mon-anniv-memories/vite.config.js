import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        'process.env.NODE_ENV': '"development"', // ou "production" selon votre environnement
      },
      plugins: [
        NodeGlobalsPolyfillPlugin()
      ]
    }
  },
  define: {
    global: 'window' // parfois nécessaire pour des compatibilités
  }
})