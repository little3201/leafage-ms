<template>
  <q-list>
    <!-- home -->
    <EssentialLink :link="{
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
    children: [
      {
        name: 'users',
        icon: 'sym_r_manage_accounts',
        path: 'users',
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
        icon: 'sym_r_admin_panel_settings',
        path: 'privileges'
      },
      {
        name: 'dictionaries',
        icon: 'sym_r_menu_book',
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
    icon: 'sym_r_public',
    path: 'logs',
    children: [
      {
        name: 'accessLogs',
        icon: 'sym_r_public',
        path: 'access-logs'
      }
    ]
  }
]
</script>
