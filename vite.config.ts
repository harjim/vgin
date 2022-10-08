/// <reference types="vitest" />

import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv, PluginOption } from 'vite'
import { createStyleImportPlugin } from 'vite-plugin-style-import'
import Jsx from '@vitejs/plugin-vue-jsx'
import { viteMockServe } from 'vite-plugin-mock'

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
    define: {
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: false,
      __INTLIFY_PROD_DEVTOOLS__: false
    },
    envPrefix: ['VITE_', 'APP_'],
    base: ENV.VITE_BASE,
    plugins: [
      vue(),
      Jsx(),
      Components({
        dirs: ['src/components'],
        extensions: ['vue', 'tsx', 'jsx'],
        dts: './src/types/components.d.ts',
        resolvers: [ArcoResolver({ sideEffect: true })]
      }),
      AutoImport({
        imports: [
          'vue',
          'pinia',
          'vue-router',
          'vue-i18n',
          {
            axios: [['default', 'axios']]
          }
        ],
        dts: './src/types/auto-import.d.ts',
        eslintrc: {
          enabled: false,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true
        },
        resolvers: [ArcoResolver()]
      }) as PluginOption,
      createStyleImportPlugin({
        libs: [
          {
            libraryName: '@arco-design/web-vue',
            esModule: true,
            resolveStyle: (name) => {
              return `@arco-design/web-vue/es/${name}/style/css.js`
            }
          }
        ]
      }),
      viteMockServe({
        mockPath: './mock',
        localEnabled: ENV.APP_USE_MOCK,
        prodEnabled: ENV.APP_USE_MOCK,
        watchFiles: true,
        injectCode: `
        import { setupProdMockServer } from './mockProdServer.js'
        setupProdMockServer()
        `
      })
    ],
    resolve: {
      alias: {
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
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    },
    test: {
      globals: true,
      environment: 'jsdom',
      transformMode: {
        web: [/.[tj]sx$/]
      }
    }
  }
})
