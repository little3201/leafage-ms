<template>
  <template v-for="link in essentialLinks" :key="link.name">
    <q-expansion-item v-if="link.children" :icon="link.icon" :label="$t(link.name)">
      <q-card>
        <q-card-section>
          <!-- children -->
          <EssentialList :essentialLinks="link.children" :parent-path="pathResolve(parentPath || '', link.path)" />
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <!-- single item -->
    <EssentialLink v-else v-bind="{ ...link, parentPath }" />
  </template>
</template>

<script setup lang="ts">
import EssentialLink from 'components/EssentialLink.vue'
import type { TreeNode } from 'src/models'
import { pathResolve } from 'src/utils'

defineProps<{
  essentialLinks: TreeNode[],
  parentPath?: string
}>()
</script>
