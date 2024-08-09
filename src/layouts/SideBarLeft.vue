<template>
  <q-list>
    <!-- home -->
    <EssentialLink v-bind="{
      name: 'home',
      icon: 'sym_r_home',
      path: '/'
    }" />
    <!-- privileges -->
    <EssentialList :essentialLinks="essentialLinks" />
  </q-list>
</template>

<script setup lang="ts">
import EssentialLink from 'components/EssentialLink.vue'
import EssentialList from 'components/EssentialList.vue'
import type { TreeNode } from 'src/models'

const essentialLinks: TreeNode[] = [
  {
    name: 'system',
    path: '/system',
    icon: 'sym_r_settings',
    children: [
      {
        name: 'users',
        icon: 'sym_r_manage_accounts',
        path: 'users'
      },
      {
        name: 'groups',
        icon: 'sym_r_group',
        path: 'groups'
      },
      {
        name: 'roles',
        icon: 'sym_r_admin_panel_settings',
        path: 'roles'
      },
      {
        name: 'privileges',
        icon: 'sym_r_lock',
        path: 'privileges'
      },
      {
        name: 'dictionaries',
        icon: 'sym_r_book_2',
        path: 'dictionaries'
      },
      {
        name: 'regions',
        icon: 'sym_r_public',
        path: 'regions'
      }
    ]
  },
  {
    name: 'logs',
    icon: 'sym_r_note_stack',
    path: 'logs',
    children: [
      {
        name: 'accessLogs',
        icon: 'sym_r_lab_profile',
        path: 'access-logs'
      }
    ]
  }
]
</script>
