<template>
  <v-app>
    <App-bar />

    <Drawer />

    <View />

    <Settings />
  </v-app>
</template>

<script>
export default {
  name: 'Dashboard',

  components: {
    AppBar: () => import('@/components/AppBar'),
    Drawer: () => import('@/components/Drawer'),
    Settings: () => import('@/components/Settings'),
    View: () => import('@/components/View')
  },

  data: () => ({
    expandOnHover: false
  })
}
</script>
