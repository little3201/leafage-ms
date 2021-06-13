import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import router from './router'
import { store, key } from './store'

createApp(App).use(router).use(store, key).mount('#app')
