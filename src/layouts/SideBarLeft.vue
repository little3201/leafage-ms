<template>
  <q-list>
    <q-list>
      <q-expansion-item expand-separator icon="settings" label="System">
        <q-card>
          <q-card-section>
            <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item icon="assessment" label="Dashboard">
        <q-card>
          <q-card-section>
            <EssentialLink v-bind="{
              title: 'Dashboard',
              icon: 'dashboard',
              link: '/dashboard'
            }" />
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
    title: 'User',
    icon: 'people',
    link: '/system/user'
  },
  {
    title: 'Role',
    icon: 'code',
    link: '/system/role'
  },
  {
    title: 'Dictionary',
    icon: 'book',
    link: '/system/dictionary'
  }
]
</script>
