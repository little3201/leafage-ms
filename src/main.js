import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// element-ui
import ElementUI from 'element-ui'
import './element.scss'

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
