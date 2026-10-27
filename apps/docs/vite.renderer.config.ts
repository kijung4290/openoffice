import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// renderer-only dev server (embedded by the shell via DOCS_RENDERER_URL for HMR; no standalone Electron)
export default defineConfig({
  root: 'src/renderer',
  plugins: [react()],
  server: {
    port: Number(process.env.DOCS_DEV_PORT) || 5173,
    strictPort: true,
    // Allow only this preview endpoint; keep Vite host checks enabled.
    allowedHosts: ['local--docs.previews.kosuke.ai'],
  },
})
