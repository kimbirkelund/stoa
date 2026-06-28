import type { StoaApi } from '../../shared/api'

// `window.stoa` is injected by the preload bridge (src/preload/index.ts).
declare global {
  interface Window {
    stoa: StoaApi
  }
}

export {}
