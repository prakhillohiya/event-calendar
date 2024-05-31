import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tsconfigPaths from 'vite-tsconfig-paths';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

/** @type {import('vite').UserConfig} */
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react(), tsconfigPaths(), TanStackRouterVite()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }

  },
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'unsafe-none'
    }
  }
})
