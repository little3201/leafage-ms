<template>
  <q-list>
    <q-list>
      <EssentialLink v-bind="{
        title: 'dashboard',
        icon: 'sym_r_dashboard',
        link: '/dashboard'
      }" />

      <EssentialLink v-bind="{
        title: 'home',
        icon: 'sym_r_home',
        link: '/'
      }" />
      <q-expansion-item expand-separator icon="sym_r_settings" :label="$t('system')" default-opened>
        <q-card>
          <q-card-section>
            <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
          </q-card-section>
        </q-card>
      </q-expansion-item>

    </q-list>
  </q-list>
</template>

<script setup lang="ts">
import EssentialLink, { EssentialLinkProps } from 'components/EssentialLink.vue'

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'users',
    icon: 'sym_r_manage_accounts',
    link: '/system/users'
  },
  {
    title: 'groups',
    icon: 'sym_r_group',
    link: '/system/groups'
  },
  {
    title: 'roles',
    icon: 'sym_r_admin_panel_settings',
    link: '/system/roles'
  },
  {
    title: 'dictionaries',
    icon: 'sym_r_menu_book',
    link: '/system/dictionaries'
  },
  {
    title: 'regions',
    icon: 'sym_r_public',
    link: '/system/regions'
  }
]
</script>
