<template>
  <v-content>
    <router-view />

    <Footer />
  </v-content>
</template>

<script>
export default {
  name: 'BaseView',

  components: {
    Footer: () => import('./Footer')
  }
}
</script>
