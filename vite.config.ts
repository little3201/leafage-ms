import path from 'path';

module.exports = {
  alias: {
    '/@/': path.resolve(__dirname, './src')
  },
  // 解决没有 export default module  的问题
  optimizeDeps: {
    include: ["qs", "axios", "mockjs"]
  },
  proxy: {
    '/api': {
        target: 'http://localhost/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
    }
}
}