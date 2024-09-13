import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // The third parameter is set to '' to load all env variables regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      vue(),
      vueDevTools(),
      vuetify({
        styles: {
          configFile: 'src/styles/vuetify/settings.scss'
        }
      })
    ],
    optimizeDeps: {
      exclude: ['vuetify']
    },
    css: {
      preprocessorOptions: {
        sass: {
          api: 'modern'
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: true,
      proxy: {
        // '/argo' 경로에 대한 프록시 설정
        '/argo': {
          target: env.VITE_ARGO_WORKFLOW_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/argo/, '')
        }
      }
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV)
    }
  }
})
