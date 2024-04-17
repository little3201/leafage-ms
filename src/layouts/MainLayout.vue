<template>
  <q-layout view="hHh LpR lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title :shrink="true">
          <span>Management System</span>
        </q-toolbar-title>
        <q-toolbar-title>
          <q-btn id="btn-drawer" title="btn-drawer" dense flat round icon="sym_r_menu" @click="toggleLeftDrawer"
            aria-disabled="false" />
        </q-toolbar-title>

        <!-- <q-breadcrumbs class="q-ma-sm" active-color="white" style="font-size: 16px">
          <q-breadcrumbs-el v-for="(route, index) in $route.matched" :key="index"
            :label="$t(route.name ? route.name.toString() : '')"
            :icon="route.meta.icon ? route.meta.icon.toString() : undefined" />
        </q-breadcrumbs> -->

        <q-toggle size="sm" v-model="$q.dark.isActive" icon="sym_r_dark_mode" unchecked-icon="sym_r_light_mode"
          :color="$q.dark.isActive ? 'black' : ''" />

        <q-btn icon="sym_r_translate" round flat dense>
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

        <q-chip clickable color="primary" text-color="white">
          <q-avatar size="sm">
            <img alt="avatar" src="https://cdn.quasar.dev/img/avatar.png">
          </q-avatar>{{ userStore.getUsername }}
          <q-menu>
            <q-list dense separator>
              <q-item clickable v-close-popup>
                <q-item-section>Sign out</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Home</q-item-section>
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
    </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from 'stores/user-store'
import SideBarLeft from './SideBarLeft.vue'

const userStore = useUserStore()

const { locale } = useI18n({ useScope: 'global' })

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
