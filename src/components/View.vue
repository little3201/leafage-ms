<template>
  <v-main>
    <router-view />

    <Footer />
  </v-main>
</template>

<script>
export default {
  name: 'BaseView',

  components: {
    Footer: () => import('./Footer')
  }
}
</script>
