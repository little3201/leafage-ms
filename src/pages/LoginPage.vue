<template>
  <q-layout class="overflow-hidden" :style="{ background: $q.dark.isActive ? 'black' : '#e3f4fa' }">
    <q-header class="transparent text-black">
      <q-toolbar>
        <q-toolbar-title :shrink="true">
          <q-img alt="logo" src="/logo-only.svg" style="width: 64px; height: 64px;" />
        </q-toolbar-title>
        <q-space />

        <q-toolbar-title :shrink="true">
          <q-btn icon="sym_r_language" round flat>
            <q-menu>
              <q-list dense separator>
                <q-item clickable v-close-popup :active="locale === 'en-US'" @click="locale = 'en-US'">
                  <q-item-section>English(US)</q-item-section>
                </q-item>
                <q-item clickable v-close-popup :active="locale === 'zh-CN'" @click="locale = 'zh-CN'">
                  <q-item-section>简体中文</q-item-section>
                </q-item>
                <q-item clickable v-close-popup :active="locale === 'zh-TW'" @click="locale = 'zh-TW'">
                  <q-item-section>繁體中文</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>

          <q-toggle v-model="darkTheme" icon="sym_r_dark_mode" unchecked-icon="sym_r_light_mode"
            :color="darkTheme ? 'black' : ''" />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page class="row justify-center items-center full-height">

        <figure class="absolute" style="height: 500px;
        width: 500px;
        background: #1976D2;
        border-radius: 50%;
        top: -270px;
        right: -200px;
        background: -webkit-radial-gradient(circle at top right, #ffffff, #1976D2);
        background: -moz-radial-gradient(circle at top right, #ffffff, #1976D2);
        background: radial-gradient(circle at top right, #ffffff, #1976D2);" />
        <figure class="absolute" style="height: 300px;
        width: 300px;
        background: #21BA45;
        border-radius: 50%;
        bottom: 50px;
        right: -100px;
        background: -webkit-radial-gradient(circle at center right, #26A69A, #21BA45);
        background: -moz-radial-gradient(circle at center right, #26A69A, #21BA45);
        background: radial-gradient(circle at center right, #26A69A, #21BA45);" />
        <figure class="absolute" style="height: 600px;
        width: 600px;
        background: #F2C037;
        border-radius: 50%;
        bottom: -270px;
        left: -200px;
        background: -webkit-radial-gradient(circle at bottom left, #cf9900, #F2C037);
        background: -moz-radial-gradient(circle at bottom left, #cf9900, #F2C037);
        background: radial-gradient(circle at bottom left, #ffbb00, #F2C037);" />
        <figure class="absolute" style="height: 300px;
        width: 300px;
        background: #C10015;
        border-radius: 50%;
        bottom: -230px;
        left: 200px;
        background: -webkit-radial-gradient(circle at center bottom, #ffffff, #C10015);
        background: -moz-radial-gradient(circle at center bottom, #ffffff, #C10015);
        background: radial-gradient(circle at center bottom, #e05969, #C10015);" />

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
                          <q-input :disable="loading" dense no-error-icon v-model.trim="form.username" color="black"
                            :placeholder="$t('username')" :rules="[(val) => (val && val.length > 0) || $t('username')]" />
                          <q-input :disable="loading" dense no-error-icon :type="isPwd ? 'password' : 'text'"
                            v-model.trim="form.password" :placeholder="$t('password')" color="black"
                            :rules="[(val) => (val && val.length > 0) || $t('password')]">
                            <template v-slot:append>
                              <q-icon size="xs" :name="isPwd ? 'sym_r_visibility_off' : 'sym_r_visibility'"
                                class="cursor-pointer" @click="isPwd = !isPwd" />
                            </template>
                          </q-input>
                          <q-checkbox :disable="loading" v-model="rememberMe" :label="$t('rememberMe')" dense
                            @update:model-value="changeRememberMe" class="q-my-md" />
                          <q-btn no-caps rounded glossy :label="$t('signin')" type="submit" color="primary"
                            :loading="loading" class="full-width" />
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
      <q-btn flat rounded label="Github" @click="openLink('https://github.com/little3201/leafage-ms')" />
      <q-btn flat rounded label="Gitee" @click="openLink('https://gitee.com/little3201/leafage-ms')" />
      <p>Copyright &copy; 2018 - {{ new Date().getFullYear() }} leafage.top All rights reserved.</p>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import lottie from 'lottie-web'

const router = useRouter()
const { locale } = useI18n({ useScope: 'global' })

onBeforeMount(() => {
})

const isPwd = ref(true)
const rememberMe = ref(true)
const form = ref({
  username: '',
  password: '',
  captcha: '',
  captcha_id: ''
})

const darkTheme = ref(false)

const loading = ref(false)
const lottieRef = ref<Element | null>(null)

onMounted(() => {
  show()
})

function changeRememberMe(value: boolean) {
  return value
}

function openLink(url: string) {
  window.open(url)
}

async function onSubmit() {
  loading.value = true
  setTimeout(() => {
    router.replace('/')
    loading.value = false
  }, 300)
}

function show() {
  if (lottieRef.value) {
    lottie.loadAnimation({
      container: lottieRef.value,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'src/assets/bg.json'
    })
  }
}
</script>
