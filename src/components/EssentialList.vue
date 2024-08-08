<template>
  <template v-for="link in essentialLinks" :key="link.name">
    <q-expansion-item v-if="link.children" icon="sym_r_settings" :label="$t(link.name)">
      <q-card>
        <q-card-section>
          <!-- children -->
          <EssentialList :essentialLinks="link.children" :parent-path="link.path" />
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <!-- single item -->
    <EssentialLink v-else :link="link" :parent-path="parentPath" />
  </template>
</template>

<script setup lang="ts">
import EssentialLink from 'components/EssentialLink.vue'
import type { PropType } from 'vue'
import type { TreeNode } from 'src/models'

defineProps({
  essentialLinks: {
    type: Array as PropType<TreeNode[]>,
    required: true
  },
  parentPath: {
    type: String,
    default: ''
  }
})
</script>
