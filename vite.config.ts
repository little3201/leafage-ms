import path from 'path';

module.exports = {
  alias: {
    '/@/': path.resolve(__dirname, './src')
  },
  optimizeDeps: {
    include: ["axios", "mockjs"]
  }
}