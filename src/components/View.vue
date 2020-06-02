<template>
  <v-content>
    <router-view />
    <footers />
  </v-content>
</template>

<script>
export default {
  name: 'View',

  components: {
    Footers: () => import('./Footers')
  }
}
</script>
