import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { previewHosts } from './preview-hosts'

// renderer-only dev server (embedded by the shell via DOCS_RENDERER_URL for HMR; no standalone Electron)
export default defineConfig({
  root: 'src/renderer',
  plugins: [react()],
  server: {
    port: Number(process.env.DOCS_DEV_PORT) || 5173,
    strictPort: true,
    // Resolve the exact runtime host; never allow every sandbox on a shared domain.
    allowedHosts: previewHosts(process.env.DOCS_PREVIEW_URL ?? process.env.PREVIEW_URL),
  },
})
