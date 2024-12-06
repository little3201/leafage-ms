<template>
  <q-layout class="overflow-hidden" :class="$q.dark.isActive ? '' : 'bg-light-blue-1'">
    <q-header class="transparent text-black">
      <q-toolbar>
        <q-toolbar-title>
          <q-img alt="logo" src="/svgs/vite.svg" width="3rem" height="3rem" />
          <span class="q-ml-sm text-weight-medium">Project Management</span>
        </q-toolbar-title>
        <!-- language -->
        <LanguageSelector />
        <!-- theme -->
        <ThemeToogle />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page padding class="row justify-center items-center">

        <figure class="absolute bg-primary-gradient rounded-full"
          style="height: 35em; width: 35em;  top: -19em; right: -14em; " />
        <figure class="absolute bg-positive-gradient rounded-full"
          style="height: 21em; width: 21em; bottom: 4em; right: -7em; " />
        <figure class="absolute bg-warning-gradient rounded-full"
          style="height: 42em; width: 42em; bottom: -19em; left: -14em; " />
        <figure class="absolute bg-negative-gradient rounded-full"
          style="height: 21em;  width: 21em; bottom: -16em; left: 14em; " />

        <q-card bordered class="column justify-center items-center shadow-12 overflow-hidden"
          style="width: 65vw;height: 70vh;border-radius: 20px;">
          <q-card-section horizontal class="full-height" style="width: 50%;">
            <transition appear enter-active-class="animated slideInLeft" leave-active-class="animated slideOutLeft">
              <div class="column inline justify-center items-center" style="margin-top: -60px">
                <div ref="lottieRef" style="height: 32em; width: 32em" />
                <div class="column q-gutter-y-xs">
                  <span class="text-weight-bold text-h5" style="margin-top: -20px">
                    {{ $t('welcome') }}
                  </span>
                  <span class="text-subtitle1">
                    {{ $t('subtitle') }}
                  </span>
                </div>
              </div>
            </transition>
          </q-card-section>
          <q-separator vertical />
          <q-card-section horizontal class="full-height no-border-radius" style="width: 50%;"
            :class="$q.dark.isActive ? '' : 'bg-light-blue-1'">
            <transition appear enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
              <div class="column justify-center items-center full-width">
                <div class="text-center">
                  <q-img alt="logo" src="/svgs/vite.svg" width="8em" height="8em" />
                </div>
                <div class="text-h6 text-center q-mb-xs">
                  {{ $t('signinTo') }}
                </div>
                <q-form @submit="onSubmit" class="q-mt-md full-width q-px-xl">
                  <q-input :disable="loading" dense no-error-icon v-model.trim="form.username"
                    :placeholder="$t('username')"
                    :rules="[(val) => (val && val.length >= 5 && val.length <= 12) || $t('username')]">
                  </q-input>
                  <q-input :disable="loading" dense no-error-icon :type="showPwd ? 'password' : 'text'"
                    v-model.trim="form.password" :placeholder="$t('password')"
                    :rules="[(val) => (val && val.length >= 8 && val.length <= 32) || $t('password')]">
                    <template v-slot:append>
                      <q-icon size="xs" :name="showPwd ? 'sym_r_visibility_off' : 'sym_r_visibility'"
                        class="cursor-pointer" @click="showPwd = !showPwd" />
                    </template>
                  </q-input>
                  <q-checkbox :disable="loading" v-model="rememberMe" :label="$t('rememberMe')" dense
                    @update:model-value="changeRememberMe" class="q-my-md" />
                  <q-btn title="signin" no-caps rounded glossy :label="$t('signin')" type="submit" color="primary"
                    :loading="loading" class="full-width" />
                </q-form>
              </div>
            </transition>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
    <q-footer class="bg-transparent text-center" :class="$q.dark.isActive ? 'text-white' : 'text-black'">
      <p :class="{ 'text-white': $q.dark.isActive }">&copy; {{ new Date().getFullYear() }}
        All Rights Reserved.</p>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import lottie from 'lottie-web'
import { useQuasar } from 'quasar'
import { useUserStore } from 'stores/user-store'

import LanguageSelector from 'components/LanguageSelector.vue'
import ThemeToogle from 'components/ThemeToogle.vue'

const { currentRoute, replace } = useRouter()
const $q = useQuasar()

const userStore = useUserStore()

const showPwd = ref<boolean>(true)
const rememberMe = ref<boolean>(false)
const loading = ref<boolean>(false)
const lottieRef = ref<HTMLDivElement | null>(null)

const form = ref({
  username: '',
  password: ''
})

onMounted(() => {
  load()
})

function changeRememberMe(value: boolean) {
  return value
}

async function onSubmit() {
  loading.value = true
  userStore.login(form.value.username, form.value.password)
    .then(() => {
      const redirectRoute = currentRoute.value.query.redirect as string
      replace(redirectRoute || '/')
    }).catch(error => $q.notify({ type: 'negative', message: error.message }))
    .finally(() => {
      // 在请求结束后执行
      loading.value = false
    })
}

function load() {
  if (lottieRef.value) {
    lottie.loadAnimation({
      container: lottieRef.value,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/1707289607880.json'
    })
  }
}
</script>
