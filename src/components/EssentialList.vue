<template>
  <template v-for="link in essentialLinks" :key="link.name">
    <q-expansion-item v-if="link.children && isSubMenu(link)" :icon="link.icon" :label="$t(link.name)">
      <q-card>
        <q-card-section>
          <!-- children -->
          <EssentialList :essentialLinks="link.children" :parent-path="pathResolve(parentPath, link.path)" />
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <!-- single item -->
    <EssentialLink v-else v-bind="{ ...link, parentPath }" />
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

function isSubMenu(route: PrivilegeTreeNode) {
  if (route.children && route.children.length > 0) {
    const children = route.children
    for (const child of children) {
      if (child.hidden) {
        return false
      }
    }
    return true
  } else {
    return false
  }
}
</script>
