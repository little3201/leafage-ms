import { boot } from 'quasar/wrappers'
import { setupWorker } from 'msw/browser'
import { handlers } from 'src/mocks' // 您的请求处理程序

export default boot(() => {
  // dev
  if (process.env.DEV) {
    const worker = setupWorker(...handlers)
    worker.start()
  }
})
