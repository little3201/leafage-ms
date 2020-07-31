import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import vuetify from '@/plugins/vuetify'
import '@/plugins/markdown'
import i18n from '@/plugins/i18n'

Vue.use(VueCookies)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
