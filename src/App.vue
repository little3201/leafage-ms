<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style lang="scss">
body {
    -webkit-font-smoothing: antialiased;
    @apply overflow-x-hidden py-0 px-0 text-sm text-gray-800;
}
</style>