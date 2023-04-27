<template>
  <label
    class="inline-block relative align-middle cursor-pointer py-1"
    @click="$emit('update:checked', checked)"
  >
    <input
      type="checkbox"
      :checked="checked"
      class="sr-only peer"
    >
    <div class="w-9 h-5 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-neutral-600 peer-checked:bg-green-600" />
  </label>
</template>

<script lang="ts" setup>
defineProps({
    checked: {
        type: Boolean,
        default: false
    }
});
defineEmits(['update:checked'])
</script>