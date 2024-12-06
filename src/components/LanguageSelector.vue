<template>
  <q-btn title="translate" icon="sym_r_translate" round flat dense>
    <q-menu>
      <q-list dense separator>
        <q-item clickable v-close-popup v-for="option in langOptions" :key="option.value"
          :active="locale === option.value" @click="changeLocale(option.value)">
          <q-item-section>{{ option.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import languages from 'quasar/lang/index.json'
import { useLocaleStore } from 'stores/locale-store'

const { locale } = useI18n({ useScope: 'global' })

// const modules = import.meta.glob('../../node_modules/quasar/lang/(en-US|zh-CN|zh-TW).js')

const $q = useQuasar()
const lang = ref($q.lang.isoName)
const localeStore = useLocaleStore()

const langOptions = languages.filter(lang => ['en-US', 'zh-CN', 'zh-TW'].includes(lang.isoName))
  .map(lang => ({
    label: lang.nativeName, value: lang.isoName
  }))

// watch(lang, val => {
//   modules[`../../node_modules/quasar/lang/${val}.js`]().then(lang => {
//     $q.lang.set(lang.default)
//   })
// })

function changeLocale(langIso: string) {
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
