import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [preact()],
  build: {
    target: "esnext", // or "es2019",
  }, 
  preview: {
    port: 3000,
    strictPort: true,
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true,
    origin: "http://localhost:3000",#test
    allowedHosts: ["hydalert.dev.hertshtengroup.com"]
  },
})
