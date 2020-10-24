<template>
  <div class="app">
    <Menu />
  </div>
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

<style lang="scss">
.app {
  background: #1C3FAA;
  -webkit-font-smoothing: antialiased;
  @apply overflow-x-hidden py-3 px-8 text-sm text-gray-800;
  @media (max-width: theme('screens.sm')) {
      @apply px-3;
  }
}
</style>