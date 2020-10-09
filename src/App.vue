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
    @apply overflow-x-hidden text-sm text-gray-800;
    @media (max-width: 768px) {
        @apply px-3;
    }
}
</style>