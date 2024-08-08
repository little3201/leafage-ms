<template>
  <q-layout view="hHh LpR lff" :class="$q.dark.isActive ? 'bg-dark-page' : 'bg-grey-2'">
    <q-header>
      <q-toolbar>
        <q-toolbar-title :shrink="true">
          <q-img alt="logo" src="/logo-only.svg" width="2em" height="2em" />
          <span>Management System</span>
        </q-toolbar-title>
        <q-toolbar-title>
          <q-btn title="drawer" type="button" dense flat round icon="sym_r_menu"
            @click="leftDrawerOpen = !leftDrawerOpen" aria-disabled="false" />
        </q-toolbar-title>

        <!-- <q-breadcrumbs class="q-ma-sm" active-color="white" style="font-size: 16px">
          <q-breadcrumbs-el v-for="(route, index) in $route.matched" :key="index"
            :label="$t(route.name ? route.name.toString() : '')"
            :icon="route.meta.icon ? route.meta.icon.toString() : undefined" />
        </q-breadcrumbs> -->

        <LanguageList />

        <ThemeToogle />

        <q-chip clickable color="primary" size="md" text-color="white">
          <q-avatar size="2em">
            <img alt="avatar" src="https://cdn.quasar.dev/img/avatar.png" width="2em" height="2em">
          </q-avatar>{{ userStore.getUsername }}
          <q-menu>
            <q-list dense separator>
              <q-item clickable v-close-popup>
                <q-item-section>Change Password</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="onLogout">
                <q-item-section>Sign Out</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-chip>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered :width="220">
      <SideBarLeft />
    </q-drawer>

    <q-page-container class="overflow-hidden">
      <router-view />
    </q-page-container>

    <q-footer class="bg-transparent">
      <q-toolbar>
        <q-toolbar-title class="text-center text-body2" :class="$q.dark.isActive ? 'text-white' : 'text-black'">
          &copy; {{ new Date().getFullYear() }} All Rights Reserved.
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from 'stores/user-store'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

import SideBarLeft from './SideBarLeft.vue'
import LanguageList from 'components/LanguageList.vue'
import ThemeToogle from 'components/ThemeToogle.vue'

const userStore = useUserStore()
const { replace } = useRouter()
const $q = useQuasar()

const leftDrawerOpen = ref<boolean>(false)

function onLogout() {
  api.post('/logout').then(() => {
    userStore.clearUser()

    replace('/login')
  }).catch(error => $q.notify({ type: 'negative', message: error.message }))
}
</script>
