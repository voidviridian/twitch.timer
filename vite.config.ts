import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://voidviridian.github.io/twitch.timer/",
  plugins: [react()],
})
