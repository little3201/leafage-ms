import Vue from 'vue'
import i18n from '@/plugins/i18n'
import Vuetify from 'vuetify/lib/framework'
import '@mdi/font/css/materialdesignicons.css'
import '@/sass/overrides.sass'
import {
  VCol,
  VRow
} from 'vuetify/lib'

Vue.use(Vuetify, {
  components: {
    VCol,
    VRow
  }
})

const opts = {
  lang: {
    t: (key, ...params) => i18n.t(key, params)
  },
  theme: {
    themes: {
      dark: {},
      light: {
        primary: '#FF6F00',
        secondary: '#050b1f',
        accent: '#204165'
      }
    }
  },
  icons: {
    iconfont: 'mdi' // default - only for display purposes
  }
}

export default new Vuetify(opts)
