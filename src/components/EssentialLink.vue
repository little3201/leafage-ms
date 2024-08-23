<template>
  <q-item clickable v-ripple exact :to="pathResolve(parentPath, path)">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ $t(name) }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { pathResolve } from 'src/utils'

withDefaults(defineProps<{
  name: string
  path: string
  icon: string
  parentPath?: string
}>(), {
  name: '',
  path: '#',
  icon: '',
  parentPath: ''
})

</script>
