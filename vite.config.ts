import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'docs',
  },
  base: "https://raw.githubusercontent.com/voidviridian/twitch.timer/",
  plugins: [react()],
})
