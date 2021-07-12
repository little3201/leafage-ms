import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import router from './router'
import { store, key } from './store'

import { setupProdMockServer } from './plugins/mockServer';

// dev mock server
if (process.env.NODE_ENV != 'production') {
    setupProdMockServer();
    sessionStorage.setItem("user", JSON.stringify({ username: "leafage", avatar: "/images/avatar.jpg", nickname: "布吉岛" }))
}

createApp(App).use(router).use(store, key).mount('#app')
