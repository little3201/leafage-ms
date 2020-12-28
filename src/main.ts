import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
// import { setupProdMockServer } from './mockServer';

// dev mock server
// if (process.env.NODE_ENV === 'dev') {
//     setupProdMockServer();
// }

createApp(App).use(router).mount('#app')
