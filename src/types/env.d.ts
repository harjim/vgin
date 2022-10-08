/// <reference types="vite/client" />

type Recordable<T = any> = Record<string, T>
type LocaleType = 'zh' | 'en'

interface ImportMetaEnv {
  readonly VITE_PORT: number
  readonly VITE_BASE: string
  readonly APP_BASE_PROXY: string
  readonly APP_BASE_URL: string
  readonly APP_USE_MOCK: boolean
  readonly APP_LOCALE: LocaleType
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
