<template>
  <q-layout class="overflow-hidden" :style="{ background: $q.dark.isActive ? 'black' : '#e3f4fa' }">
    <q-header class="transparent text-black">
      <q-toolbar>
        <q-toolbar-title :shrink="true">
          <q-img alt="logo" src="/logo-only.svg" style="width: 64px; height: 64px;" />
        </q-toolbar-title>
        <q-space />

        <q-toolbar-title :shrink="true">
          <q-btn icon="sym_r_language" round flat title="language_switch">
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

          <q-toggle v-model="darkTheme" icon="sym_r_dark_mode" unchecked-icon="sym_r_light_mode" title="theme_toogle"
            :color="darkTheme ? 'black' : ''" />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page class="row justify-center items-center full-height">

        <figure class="absolute bg-primary-gradient rounded-full"
          style="height: 500px; width: 500px;  top: -270px; right: -200px; background-color: var($primary);" />
        <figure class="absolute bg-positive-gradient rounded-full"
          style="height: 300px; width: 300px; bottom: 50px; right: -100px; background-color: var($positive );" />
        <figure class="absolute bg-warning-gradient rounded-full"
          style="height: 600px; width: 600px; bottom: -270px; left: -200px; background-color: var($warning);" />
        <figure class="absolute bg-negative-gradient rounded-full"
          style="height: 300px;  width: 300px; bottom: -230px; left: 200px; background-color: var($negative);" />

        <q-card bordered class="column justify-center items-center shadow-15 overflow-hidden"
          style="width: 65vw;height: 70vh;border-radius: 20px;">
          <q-card-section horizontal style="width: 50%;">
            <q-card-section class="row justify-center" style="width: 100%;">
              <transition appear enter-active-class="animated slideInLeft" leave-active-class="animated slideOutLeft">
                <div class="column justify-center items-center" style="margin-top: -120px">
                  <div ref="lottieRef" style="height: 450px, width: 450px" />
                  <div class="column q-gutter-y-xs">
                    <span class="text-weight-bold text-h5" style="margin-top: -40px">
                      {{ $t('welcome') }}
                    </span>
                    <span class="text-subtitle1">
                      {{ $t('subtitle') }}
                    </span>
                  </div>
                </div>
              </transition>
            </q-card-section>
          </q-card-section>
          <q-separator vertical dark />
          <q-card-section horizontal class="full-height no-border-radius" style="width: 50%; background: #f3fbff;">
            <q-card-section class="row justify-center full-width">
              <transition appear enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
                <div class="col justify-center items-center">
                  <q-card flat class="q-px-md transparent">
                    <q-card-section>
                      <q-card-section>
                        <div class="text-center">
                          <q-img alt="logo" src="/logo.svg" style="height: 140px; max-width: 150px" />
                        </div>
                        <div class="text-h6 text-center q-mb-xs">
                          {{ $t('signinTo') }}
                        </div>
                        <q-form @submit="onSubmit" class="q-mt-md">
                          <q-input :disable="loading" dense no-error-icon v-model.trim="form.username"
                            :placeholder="$t('username')" :rules="[(val) => (val && val.length > 0) || $t('username')]" />
                          <q-input :disable="loading" dense no-error-icon :type="isPwd ? 'password' : 'text'"
                            v-model.trim="form.password" :placeholder="$t('password')"
                            :rules="[(val) => (val && val.length > 0) || $t('password')]">
                            <template v-slot:append>
                              <q-icon size="xs" :name="isPwd ? 'sym_r_visibility_off' : 'sym_r_visibility'"
                                class="cursor-pointer" @click="isPwd = !isPwd" />
                            </template>
                          </q-input>
                          <q-checkbox :disable="loading" v-model="rememberMe" :label="$t('rememberMe')" dense
                            @update:model-value="changeRememberMe" class="q-my-md" />
                          <q-btn no-caps rounded glossy :label="$t('signin')" type="submit" color="primary"
                            :loading="loading" class="full-width" title="signin_submit" />
                        </q-form>
                      </q-card-section>
                    </q-card-section>
                  </q-card>
                </div>
              </transition>
            </q-card-section>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
    <q-footer class="transparent text-center text-black">
      <q-btn flat rounded label="Github" title="github" @click="openLink('https://github.com/little3201/leafage-ms')" />
      <q-btn flat rounded label="Gitee" title="gitee" @click="openLink('https://gitee.com/little3201/leafage-ms')" />
      <p>Copyright &copy; 2018 - {{ new Date().getFullYear() }} leafage.top All rights reserved.</p>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import lottie from 'lottie-web'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
import { useUserStore } from 'stores/user-store'

const router = useRouter()
const $q = useQuasar()
const userStore = useUserStore()

onBeforeMount(() => {
})

const { locale } = useI18n({ useScope: 'global' })
const isPwd = ref(true)
const rememberMe = ref(true)
const darkTheme = ref(false)
const loading = ref(false)
const lottieRef = ref<HTMLDivElement | null>(null)

const form = ref({
  username: '',
  password: ''
})

onMounted(() => {
  show()
})

function changeRememberMe(value: boolean) {
  return value
}

function openLink(url: string) {
  window.open(url)
}

function onSubmit() {
  loading.value = true

  api.post('/login', new URLSearchParams(form.value)).then(res => {
    console.log(res.data)
    userStore.updateUser(form.value.username)
    // 获取之前路由
    const redirectRoute = router.currentRoute.value.query.redirect as string | undefined
    router.replace(redirectRoute || '/')
  }).catch(error => $q.notify({ type: 'negative', message: `Request failed: ${error.message}`, position: 'top' }))
    .finally(() => {
      // 在请求结束后执行
      loading.value = false
    })
}

function show() {
  if (lottieRef.value) {
    lottie.loadAnimation({
      container: lottieRef.value,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/bg.json'
    })
  }
}
</script>
src/stores/user-store
