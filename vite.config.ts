import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '/@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [vue()],
  build: {
    // to make tests faster
    minify: false
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    }
  },
  // server: {
  //   proxy: {
  //     // 选项写法
  //     '/api': {
  //       target: 'http://localhost:8760',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, '')
  //     }
  //   }
  // }
})