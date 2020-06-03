<template>
  <v-tabs>
    <v-tab><sign-in /></v-tab>
    <v-tab><sign-up /></v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: 'Sign',

  components: {
    SignIn: () => import('./SignIn'),
    SignUp: () => import('./SignUp')
  },

  data: () => ({
  })
}
</script>
