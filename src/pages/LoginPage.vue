<template>
  <q-layout>
    <q-page-container>
      <q-page padding class="row justify-center items-center overflow-hidden window-height"
        :style="{ background: $q.dark.isActive ? 'black' : '#e3f4fa' }">
        <div class="fixed-top-left absolute-top-left q-pa-md">
          <q-img alt="logo" src="/logo-only.svg" style="width: 64px; height: 64px;" />
        </div>
        <div class="z-top fixed-top-right absolute-top-right q-pa-md">
          <q-btn icon="sym_r_language" round flat>
            <q-menu>
              <q-list dense>
                <q-item clickable v-close-popup>
                  <q-item-section>简体中文</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup>
                  <q-item-section>繁体中文</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup>
                  <q-item-section>English(US)</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-toggle v-model="darkTheme" icon="sym_r_dark_mode" unchecked-icon="sym_r_light_mode"
            :color="darkTheme ? 'black' : ''" />
        </div>
        <figure class="absolute" style="height: 500px;
        width: 500px;
        background: #1976D2;
        border-radius: 50%;
        top: -200px;
        right: -200px;
        background: -webkit-radial-gradient(circle at top right, #ffffff, #1976D2);
        background: -moz-radial-gradient(circle at top right, #ffffff, #1976D2);
        background: radial-gradient(circle at top right, #ffffff, #1976D2);" />
        <figure class="absolute" style="height: 300px;
        width: 300px;
        background: #21BA45;
        border-radius: 50%;
        bottom: 100px;
        right: -100px;
        background: -webkit-radial-gradient(circle at center right, #26A69A, #21BA45);
        background: -moz-radial-gradient(circle at center right, #26A69A, #21BA45);
        background: radial-gradient(circle at center right, #26A69A, #21BA45);" />
        <figure class="absolute" style="height: 600px;
        width: 600px;
        background: #F2C037;
        border-radius: 50%;
        bottom: -200px;
        left: -200px;
        background: -webkit-radial-gradient(circle at bottom left, #cf9900, #F2C037);
        background: -moz-radial-gradient(circle at bottom left, #cf9900, #F2C037);
        background: radial-gradient(circle at bottom left, #ffbb00, #F2C037);" />
        <figure class="absolute" style="height: 300px;
        width: 300px;
        background: #C10015;
        border-radius: 50%;
        bottom: -150px;
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
                      {{ $t('welcome') }}
                    </span>
                  </div>
                </div>
              </transition>
            </q-card-section>
          </q-card-section>
          <q-separator vertical dark />
          <q-card-section horizontal class="full-height" style="width: 50%; background: #f3fbff;">
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
                          {{ $t('welcome') }}
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
                          <div class="column q-gutter-y-md q-mt-none">
                            <q-checkbox :disable="loading" v-model="rememberMe" :label="$t('rememberMe')" dense
                              @update:model-value="changeRememberMe" />
                          </div>
                          <div class="col items-center justify-around q-mt-md">
                            <q-btn rounded glossy :label="$t('signin')" type="submit" color="primary" :loading="loading"
                              class="full-width" />
                          </div>
                        </q-form>
                        <q-inner-loading :showing="loading" style="background-color: rgba(0, 0, 0, 0);">
                          <q-spinner-hourglass color="primary" size="3em" />
                        </q-inner-loading>
                      </q-card-section>
                    </q-card-section>
                  </q-card>
                </div>
              </transition>
            </q-card-section>
          </q-card-section>
        </q-card>

        <footer class="fixed-bottom absolute-bottom text-center">
          <q-btn flat rounded label="Github" @click="openLink('https://github.com/little3201/leafage-ms')" />
          <q-btn flat rounded label="Gitee" @click="openLink('https://gitee.com/little3201/leafage-ms')" />
          <p>Copyright &copy; 2018 - {{ new Date().getFullYear() }} leafage.top All rights reserved.</p>
        </footer>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onBeforeMount, ref, onMounted } from 'vue'
// import { useQuasar } from 'quasar'
import lottie from 'lottie-web'

// const $q = useQuasar()

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
const loading = ref(false)
const changeRememberMe = (value) => {
  return value
}

const openLink = (url) => {
  window.open(url)
}
const darkTheme = ref(false)

const onSubmit = async () => { }

const lottieRef = ref(null)
onMounted(() => {
  show()
})
const show = () => {
  lottie.loadAnimation({
    container: lottieRef.value,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'src/assets/bg.json'
  })
}
</script>
