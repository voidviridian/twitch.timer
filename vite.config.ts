import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://raw.githubusercontent.com/voidviridian/twitch.timer/",
  plugins: [react()],
})
