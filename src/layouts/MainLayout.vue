<template>
  <q-layout view="hHh LpR lff">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title :shrink="true">
          <q-img alt="logo" src="/logo-only.svg" style="width: 2em; height: 2em;" />
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

        <q-btn title="language" icon="sym_r_language" round flat dense>
          <q-menu>
            <q-list dense separator>
              <q-item clickable v-close-popup :active="locale === 'en-US'" @click="locale = 'en-US'">
                <q-item-section>English(US)</q-item-section>
              </q-item>
              <q-item clickable v-close-popup :active="locale === 'zh-CN'" @click="locale = 'zh-CN'">
                <q-item-section>中文（简体）</q-item-section>
              </q-item>
              <q-item clickable v-close-popup :active="locale === 'zh-TW'" @click="locale = 'zh-TW'">
                <q-item-section>中文（繁體）</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <q-toggle size="sm" v-model="$q.dark.isActive" icon="sym_r_dark_mode" unchecked-icon="sym_r_light_mode"
          :color="$q.dark.isActive ? 'black' : ''" />

        <q-chip clickable color="primary" text-color="white">
          <q-avatar size="32px">
            <img alt="avatar" src="https://cdn.quasar.dev/img/avatar.png" width="32px" height="32px">
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

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" elevated :width="230">
      <SideBarLeft />
    </q-drawer>

    <q-page-container class="overflow-hidden">
      <router-view />
      <slot></slot>
    </q-page-container>

    <q-footer class="bg-transparent">
      <p class="text-center text-black">Copyright &copy; 2018 - {{ new Date().getFullYear() }}
        All rights reserved.</p>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from 'stores/user-store'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

import SideBarLeft from './SideBarLeft.vue'

const userStore = useUserStore()
const router = useRouter()
const $q = useQuasar()

const { locale } = useI18n({ useScope: 'global' })

const leftDrawerOpen = ref(false)

function onLogout() {
  api.post('/logout').then(() => {
    userStore.clearUser()

    router.replace('/login')
  }).catch(error => $q.notify({ type: 'negative', message: error.message }))
}
</script>
