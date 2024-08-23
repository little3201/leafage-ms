<template>
  <q-btn title="language" icon="mdi-translate" round flat dense>
    <q-menu>
      <q-list dense separator>
        <q-item clickable v-close-popup v-for="option in localeOptions" :key="option.value"
          :active="locale === option.value" @click="changeLocale(option.value)">
          <q-item-section>{{ option.label }}{{ lang }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import { localeOptions } from 'src/i18n'
import { useLocaleStore } from 'stores/locale-store'

const { locale } = useI18n({ useScope: 'global' })

const modules = import.meta.glob('../../node_modules/quasar/lang/(en-US|zh-CN|zh-TW).js')

const $q = useQuasar()
const lang = ref($q.lang.isoName)

watch(lang, val => {
  modules[`../../node_modules/quasar/lang/${val}.js`]().then(lang => {
    $q.lang.set(lang.default)
  })
})

const localeStore = useLocaleStore()

function changeLocale(langIso: string = 'en-US') {
  lang.value = langIso
  locale.value = langIso
  localeStore.changeLang(langIso)
  // set html lang
  const htmlElement = document.querySelector('html')
  if (htmlElement) {
    htmlElement.setAttribute('lang', langIso)
  }
}
</script>
