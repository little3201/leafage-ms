<template>
  <q-item clickable v-ripple exact :to="parentPath + link.path">
    <q-item-section v-if="link.icon" avatar side>
      <q-icon :name="link.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ $t(link.name) }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import type { TreeNode } from 'src/models'

withDefaults(defineProps<{
  link: TreeNode
  parentPath?: string
}>(), {
  link: {
    name: '', path: '#', icon: ''
  },
  parentPath: ''
})
</script>
