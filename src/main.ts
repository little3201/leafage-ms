import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import router from './router'
import { mockXHR } from '@/mock/index';

// dev mock server
if (process.env.NODE_ENV != 'production') {
    mockXHR()
}

createApp(App).use(router).mount('#app')
