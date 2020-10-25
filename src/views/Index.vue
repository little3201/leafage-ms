<template>
  <Landing />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Landing from '../components/common/Landing.vue'

export default defineComponent({
  name: 'Home',

  components: {
    Landing
  },

  setup() {
    return {
    }
  }
})
</script>