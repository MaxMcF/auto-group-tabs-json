// Configuration for bundling the options page

import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// See https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag === 'focus-trap' || tag.startsWith('mwc-')
        }
      }
    })
  ],

  // Code that is copied directly to the extension directory
  publicDir: 'static',
  root: resolve('src'),
  server: { port: 6655 },
  build: {
    assetsDir: '.',
    outDir: '../extension',
    emptyOutDir: true,
    target: 'chrome89',
    polyfillDynamicImport: false,
    sourcemap: true,
    minify: false
  }
})
