import Vue from 'vue'
import i18n from '@/i18n'
import '@/sass/overrides.sass'
import Vuetify, {
  VApp,
  VAppBar,
  VAvatar,
  VBtn,
  VBadge,
  VCard,
  VCardActions,
  VCardText,
  VCheckbox,
  VCol,
  VContent,
  VContainer,
  VDataTable,
  VDivider,
  VFooter,
  VIcon,
  VItem,
  VItemGroup,
  VImg,
  VList,
  VListItem,
  VListItemAction,
  VListItemIcon,
  VListItemContent,
  VListItemTitle,
  VListItemSubtitle,
  VListItemAvatar,
  VMenu,
  VNavigationDrawer,
  VRating,
  VRow,
  VSheet,
  VSpacer,
  VSwitch,
  VTabs,
  VTabsItems,
  VTabItem,
  VTab,
  VTextField,
  VTimePicker,
  VToolbar,
  VToolbarTitle,
  VToolbarItems
} from 'vuetify/lib'
import { Ripple } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  components: {
    VApp,
    VAppBar,
    VAvatar,
    VBtn,
    VBadge,
    VCard,
    VCardActions,
    VCardText,
    VCheckbox,
    VCol,
    VContent,
    VContainer,
    VDataTable,
    VDivider,
    VFooter,
    VIcon,
    VItem,
    VItemGroup,
    VImg,
    VList,
    VListItem,
    VListItemAction,
    VListItemIcon,
    VListItemContent,
    VListItemTitle,
    VListItemSubtitle,
    VListItemAvatar,
    VMenu,
    VNavigationDrawer,
    VRating,
    VRow,
    VSheet,
    VSpacer,
    VSwitch,
    VTabs,
    VTabsItems,
    VTabItem,
    VTab,
    VTextField,
    VTimePicker,
    VToolbar,
    VToolbarTitle,
    VToolbarItems
  },
  directives: {
    Ripple
  }
})

const theme = {
  primary: '#4CAF50',
  secondary: '#9C27b0',
  accent: '#9C27b0',
  info: '#00CAE3'
}

const opts = {
  lang: {
    t: (key, ...params) => i18n.t(key, params)
  },
  theme: {
    themes: {
      dark: theme,
      light: theme
    }
  },
  icons: {
    iconfont: 'mdi' // default - only for display purposes
  }
}

export default new Vuetify(opts)
