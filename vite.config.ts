import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import { useEnv } from './src/utils/useEnv'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const ENV = useEnv(env)
  console.log(env, ENV)
  return {
    envPrefix: ['VITE_', 'APP_'],
    base: ENV.VITE_BASE,
    plugins: [vue()],
    resolve: {
      alias: {  // 配置项目别名
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
          rewrite: path => path.replace(/^\/api\//, '')
        }
      }
    }
  }
})
