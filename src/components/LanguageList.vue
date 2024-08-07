<template>
  <q-btn title="language" icon="sym_r_language" round flat dense>
    <q-menu>
      <q-list dense separator>
        <q-item clickable v-close-popup v-for="option in localeOptions" :key="option.value"
          :active="locale === option.value" @click="locale = option.value">
          <q-item-section>{{ option.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { localeOptions } from 'src/i18n'

const { locale } = useI18n({ useScope: 'global' })
</script>