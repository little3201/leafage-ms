<template>
  <q-btn title="language" icon="sym_r_language" round flat dense>
    <q-menu>
      <q-list dense separator>
        <q-item clickable v-close-popup v-for="option in localeOptions" :key="option.value"
          :active="locale === option.value" @click="changeLocale(option.value)">
          <q-item-section>{{ option.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { localeOptions } from 'src/i18n'
import { useLocaleStore } from 'stores/locale-store'

const { locale } = useI18n({ useScope: 'global' })
const localeStore = useLocaleStore()

function changeLocale(lang: string) {
  locale.value = lang
  localeStore.setLang(lang)
  changeHtmlLang(lang)
}

function changeHtmlLang(lang: string) {
  document.querySelector('html').setAttribute('lang', lang)
}
</script>