/// <reference types="vite/client" />

type ErudaLike = {
  init: (options?: { useShadowDom?: boolean }) => void
  show: () => void
  hide: () => void
  get: (name: string) => { hide?: () => void } | undefined
}

declare global {
  interface Window {
    __ERUDA_ENABLED__?: boolean
    __ERUDA__?: ErudaLike
  }
}

export {}
