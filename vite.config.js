import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Modern config — no tailwind.config.js needed
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    port: 5173,
    open: true,
  },
})
