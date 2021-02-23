import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import router from './router'
import { setupProdMockServer } from './plugins/mockServer';

// dev mock server
if (process.env.NODE_ENV != 'production') {
    setupProdMockServer();
}

createApp(App).use(router).mount('#app')
