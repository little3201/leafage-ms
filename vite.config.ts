import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { fileURLToPath } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src')
    }
  },
  plugins: [
    vue(),
    VueI18nPlugin({
      include: path.resolve(path.dirname(fileURLToPath(import.meta.url)), './path/to/src/locales/**')
    })
  ],

  // server: {
  //   proxy: {
  //     // 选项写法
  //     '^/api': {
  //       target: 'https://console.leafage.top',
  //       changeOrigin: true
  //     }
  //   }
  // }
})