import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://api-inference.huggingface.co/models/facebook/bart-large-mnli",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
