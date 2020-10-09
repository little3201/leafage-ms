import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import feather from 'feather-icons'

createApp(App).use(router).use(feather).mount('#app')
