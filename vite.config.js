import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Stamps public/sw.js's cache name with a build-unique id at build time, so a
// deploy always busts old service-worker caches without a developer having to
// remember to hand-bump a version string.
function swCacheVersionPlugin() {
  return {
    name: 'sw-cache-version',
    closeBundle() {
      const swPath = resolve(__dirname, 'dist/sw.js')
      if (!existsSync(swPath)) return
      let buildId
      try {
        buildId = execSync('git rev-parse --short HEAD', { cwd: __dirname }).toString().trim()
      } catch {
        buildId = Date.now().toString(36)
      }
      const contents = readFileSync(swPath, 'utf-8').replace('__CACHE_VERSION__', buildId)
      writeFileSync(swPath, contents)
    },
  }
}

export default defineConfig({
  plugins: [react(), swCacheVersionPlugin()],
  base: process.env.VITE_BASE_PATH || '/looksmaxxing/',
})
