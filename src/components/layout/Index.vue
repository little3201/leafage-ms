<template>
  <Menu />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Menu from './Menu.vue'

export default defineComponent({
  name: 'Layout',

  components: {
    Menu
  },

  setup() {
    return {
    }
  }
})
</script>
