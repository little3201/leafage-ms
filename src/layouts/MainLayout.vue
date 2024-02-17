<template>
  <q-layout view="hHh LpR lFf">

    <q-header elevated>
      <q-toolbar>
        <q-btn id="btn-drawer" title="btn-drawer" dense flat round icon="sym_r_menu" @click="toggleLeftDrawer"
          aria-disabled="false" />

        <q-toolbar-title :shrink="true">
          <q-avatar>
            <img alt="logo" src="/logo.svg">
          </q-avatar>
          Title
        </q-toolbar-title>

        <q-toolbar-title>
          <q-tabs align="center" inline-label>
            <q-route-tab to="/" icon="sym_r_home" label="Home" />
            <q-route-tab to="/dashboard" icon="sym_r_dashboard" label="Dashboard" />
          </q-tabs>
        </q-toolbar-title>

        <q-toolbar-title :shrink="true">
          <q-avatar size="md">
            <!-- <img alt="avatar" src="https://cdn.quasar.dev/img/avatar.png"> -->
            <q-img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
        </q-toolbar-title>
      </q-toolbar>

    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" elevated>
      <SideBarLeft />
    </q-drawer>

    <q-page-container class="overflow-hidden">
      <router-view />
    </q-page-container>

    <q-footer elevated>
      <q-toolbar>
        <q-toolbar-title>
          Footer
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SideBarLeft from './SideBarLeft.vue'

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
