<template>
  <q-layout view="hHh LpR lff" :class="$q.dark.isActive ? '' : 'bg-grey-2'">
    <q-header>
      <q-toolbar>
        <q-toolbar-title :shrink="true">
          <q-img alt="logo" src="/vite.svg" width="2em" height="2em" />
          <span>Project Management</span>
        </q-toolbar-title>
        <q-toolbar-title>
          <q-btn title="drawer" type="button" dense flat round icon="mdi-menu" @click="leftDrawerOpen = !leftDrawerOpen"
            aria-disabled="false" />
        </q-toolbar-title>
        <!-- language -->
        <LanguageSelector />
        <!-- theme -->
        <ThemeToogle class="q-mx-sm" />

        <div class="cursor-pointer">
          <q-avatar size="md">
            <q-img alt="avatar" :src="userStore.user?.avatar" width="2rem" height="2rem" />
          </q-avatar>
          <span class="q-ml-sm">{{ userStore.user?.username }}</span>
          <q-menu>
            <q-list dense separator>
              <q-item clickable v-close-popup>
                <q-item-section>{{ $t('profile') }}</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="onLogout">
                <q-item-section>{{ $t('signout') }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>

      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered :width="220">
      <q-list>
        <!-- home -->
        <EssentialLink v-bind="{
          name: 'home',
          icon: 'mdi-home-outline',
          path: '/'
        }" />
        <!-- privileges -->
        <EssentialList :essentialLinks="essentialLinks" />
      </q-list>
    </q-drawer>

    <q-page-container class="overflow-hidden">
      <router-view />
    </q-page-container>

    <q-footer class="bg-transparent">
      <q-toolbar>
        <q-toolbar-title class="text-center text-body2" :class="$q.dark.isActive ? '' : 'text-black'">
          &copy; {{ new Date().getFullYear() }} All Rights Reserved.
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useUserStore } from 'stores/user-store'

import EssentialLink from 'components/EssentialLink.vue'
import EssentialList from 'components/EssentialList.vue'
import LanguageSelector from 'components/LanguageSelector.vue'
import ThemeToogle from 'components/ThemeToogle.vue'

import type { PrivilegeTreeNode } from 'src/models'

const { replace } = useRouter()
const $q = useQuasar()

const userStore = useUserStore()

const leftDrawerOpen = ref<boolean>(false)

const essentialLinks: PrivilegeTreeNode[] = userStore.privileges as PrivilegeTreeNode[]

function onLogout() {
  userStore.logout().then(() => replace('/login'))
    .catch(error => $q.notify({ type: 'negative', message: error.message }))
}
</script>
