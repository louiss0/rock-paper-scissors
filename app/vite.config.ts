import {defineConfig} from "vite"
import WindiCSS from 'vite-plugin-windicss'
import pugPlugin from 'vite-plugin-pug'
import { resolve } from 'path'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
    watch: {
      usePolling: true
    }
  },
  build: {
    rollupOptions: {
      input: {
          main: resolve(__dirname, "index.html"),
          about: resolve(__dirname, "pages/about.html"),
        }
    },
  },  
  plugins: [
    WindiCSS(),
    pugPlugin(),
    
  ],
})