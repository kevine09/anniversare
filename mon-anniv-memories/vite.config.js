import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'

export default defineConfig({
  plugins: [react()],
  
  optimizeDeps: {
    esbuildOptions: {
      // Assure la compatibilité avec les modules Node
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true
        }),
        NodeModulesPolyfillPlugin()
      ],
      define: {
        global: 'globalThis' // Solution plus moderne que 'window'
      }
    }
  },

  resolve: {
    alias: {
      // Polyfills pour les modules Node
      util: 'rollup-plugin-node-polyfills/polyfills/util',
      stream: 'rollup-plugin-node-polyfills/polyfills/stream',
      events: 'rollup-plugin-node-polyfills/polyfills/events',
      assert: 'rollup-plugin-node-polyfills/polyfills/assert',
      http: 'rollup-plugin-node-polyfills/polyfills/http',
      https: 'rollup-plugin-node-polyfills/polyfills/https',
      os: 'rollup-plugin-node-polyfills/polyfills/os',
      url: 'rollup-plugin-node-polyfills/polyfills/url',
      querystring: 'rollup-plugin-node-polyfills/polyfills/qs'
    }
  },

  build: {
    rollupOptions: {
      plugins: [
        // Injecte les polyfills nécessaires
        rollupNodePolyFill()
      ]
    },
    outDir: 'dist',
    assetsDir: 'assets'
  },

  define: {
    'process.env': process.env,
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    global: 'globalThis'
  }
})