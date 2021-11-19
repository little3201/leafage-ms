import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import router from './router'

import { setupProdMockServer } from './plugins/mockServer';

// dev mock server
if (process.env.NODE_ENV != 'production') {
    // sessionStorage.setItem("user", JSON.stringify({ username: "little3201", nickname: "布吉岛", 
    // avatar: "https://cdn.leafage.top/logo.png" }));
    // setupProdMockServer();
}

createApp(App).use(router).mount('#app')
