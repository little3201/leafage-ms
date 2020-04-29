import Vue from 'vue'
import i18n from '@/i18n'
import '@mdi/font/css/materialdesignicons.css'
import '@/sass/overrides.sass'
import Vuetify, {
  VApp,
  VAppBar,
  VAvatar,
  VAlert,
  VBtn,
  VBadge,
  VCard,
  VCardActions,
  VCardText,
  VCardTitle,
  VCheckbox,
  VCol,
  VContent,
  VContainer,
  VDataTable,
  VDivider,
  VDialog,
  VForm,
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
  VSimpleTable,
  VSpacer,
  VSnackbar,
  VSwitch,
  VTabs,
  VTabsItems,
  VTabItem,
  VTab,
  VTextarea,
  VTextField,
  VTimePicker,
  VToolbar,
  VTooltip,
  VToolbarTitle,
  VToolbarItems
} from 'vuetify/lib'
import { Ripple } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  components: {
    VApp,
    VAppBar,
    VAvatar,
    VAlert,
    VBtn,
    VBadge,
    VCard,
    VCardActions,
    VCardText,
    VCardTitle,
    VCheckbox,
    VCol,
    VContent,
    VContainer,
    VDataTable,
    VDivider,
    VDialog,
    VForm,
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
    VSimpleTable,
    VSpacer,
    VSnackbar,
    VSwitch,
    VTabs,
    VTabsItems,
    VTabItem,
    VTab,
    VTextarea,
    VTextField,
    VTimePicker,
    VToolbar,
    VTooltip,
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
