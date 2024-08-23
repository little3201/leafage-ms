<template>
  <template v-for="link in essentialLinks" :key="link.name">
    <q-expansion-item v-if="Array.isArray(link.children) && isSubMenu(link.children)" :icon="link.icon"
      :label="$t(link.name)">
      <q-card>
        <q-card-section>
          <!-- children -->
          <EssentialList :essentialLinks="link.children" :parent-path="pathResolve(parentPath, link.path)" />
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <!-- single item -->
    <EssentialLink v-else v-bind="{ name: link.name, icon: link.icon, path: link.path, parentPath }" />
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

function isSubMenu(children: PrivilegeTreeNode[]) {
  for (const child of children) {
    if (child.hidden) {
      return false
    }
  }
  return true
}
</script>
