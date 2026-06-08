import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem")
    },
    proxy: {
      "/tasks": {
        target: "https://localhost:3000",
        changeOrigin: true,
        secure: false, 
      },
    },
  },
})