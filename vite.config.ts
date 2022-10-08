/// <reference types="vitest" />

import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'

const useEnv = (env: Recordable<unknown>): ImportMetaEnv => {
  const ret: unknown = {}
  for (const envKey of Object.keys(env)) {
    let envVal = env[envKey]

    envVal = envVal === 'true' ? true : envVal === 'false' ? false : envVal

    if (/^[1-9]+[0-9]*]*$/.test(envVal as string)) {
      envVal = parseInt(envVal as string)
    }

    ret[envKey] = envVal
  }
  return ret as ImportMetaEnv
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ['VITE_', 'APP_'])
  const ENV = useEnv(env)

  return {
    envPrefix: ['VITE_', 'APP_'],
    base: ENV.VITE_BASE,
    plugins: [vue()],
    resolve: {
      alias: {
        // 配置项目别名
        '@': resolve(__dirname, 'src')
      }
    },
    server: {
      port: ENV.VITE_PORT,
      open: false,
      cors: true,
      proxy: {
        '/api/': {
          target: ENV.APP_BASE_PROXY,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\//, '')
        }
      }
    },
    test: {
      globals: true,
      environment: 'jsdom'
    }
  }
})
