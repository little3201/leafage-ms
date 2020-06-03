<template>
  <v-content>
    <router-view />

    <Footer />
  </v-content>
</template>

<script>
export default {
  name: 'View',

  components: {
    Footer: () => import('./Footer')
  }
}
</script>
