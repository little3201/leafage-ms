<template>
  <q-list>
    <q-list>
      <q-expansion-item expand-separator icon="settings" label="System" default-opened>
        <q-card>
          <q-card-section>
            <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <EssentialLink v-bind="{
        title: 'Dashboard',
        icon: 'dashboard',
        link: '/dashboard'
      }" />
    </q-list>
  </q-list>
</template>

<script setup lang="ts">
import EssentialLink, { EssentialLinkProps } from 'components/EssentialLink.vue'

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'User',
    icon: 'manage_accounts',
    link: '/system/user'
  },
  {
    title: 'Group',
    icon: 'group',
    link: '/system/group'
  },
  {
    title: 'Role',
    icon: 'admin_panel_settings',
    link: '/system/role'
  },
  {
    title: 'Dictionary',
    icon: 'library_books',
    link: '/system/dictionary'
  }
]
</script>
