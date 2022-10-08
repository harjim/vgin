/// <reference types="vite/client" />

type Recordable<T = any> = Record<string, T>

interface ImportMetaEnv {
  readonly VITE_PORT: number
  readonly VITE_BASE: string
  readonly APP_BASE_PROXY: string
  readonly APP_BASE_URL: string
  readonly APP_USE_MOCK: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
