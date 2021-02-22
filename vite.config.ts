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
  // 解决没有 export default module  的问题
  optimizeDeps: {
    include: ["qs", "axios", "mockjs"]
  }
})