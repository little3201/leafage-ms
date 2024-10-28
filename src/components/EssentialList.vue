<template>
  <template v-for="link in essentialLinks" :key="link.name">
    <q-expansion-item v-if="Array.isArray(link.children)" :icon="link.meta.icon" :label="$t(link.name)">
      <q-card>
        <q-card-section>
          <!-- children -->
          <EssentialList :essentialLinks="link.children" :parent-path="pathResolve(parentPath, link.meta.path)" />
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <!-- single item -->
    <EssentialLink v-else v-bind="{ name: link.name, icon: link.meta.icon, path: link.meta.path, parentPath }" />
  </template>
</template>

<script setup lang="ts">
import EssentialLink from 'components/EssentialLink.vue'
import type { PrivilegeTreeNode } from 'src/models'
import { pathResolve } from 'src/utils'

withDefaults(defineProps<{
  essentialLinks: PrivilegeTreeNode[]
  parentPath?: string
}>(), {
  parentPath: ''
})
</script>
