<template>
  <q-list>
    <q-list>
      <q-expansion-item expand-separator icon="sym_r_settings" label="System" default-opened>
        <q-card>
          <q-card-section>
            <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <EssentialLink v-bind="{
        title: 'Dashboard',
        icon: 'sym_r_dashboard',
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
    icon: 'sym_r_manage_accounts',
    link: '/system/user'
  },
  {
    title: 'Group',
    icon: 'sym_r_group',
    link: '/system/group'
  },
  {
    title: 'Role',
    icon: 'sym_r_admin_panel_settings',
    link: '/system/role'
  },
  {
    title: 'Dictionary',
    icon: 'sym_r_library_books',
    link: '/system/dictionary'
  },
  {
    title: 'Region',
    icon: 'sym_r_public',
    link: '/system/region'
  }
]
</script>
