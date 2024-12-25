<template>
  <q-toggle size="sm" v-model="$q.dark.isActive" icon="sym_r_dark_mode" unchecked-icon="sym_r_light_mode"
    :color="$q.dark.isActive ? 'black' : ''" @update:model-value="handleChange" />
</template>

<script setup lang="ts">
import { Cookies, useQuasar } from 'quasar'

const $q = useQuasar()
$q.dark.set(Cookies.get('theme') === 'dark')

function handleChange(value: boolean) {
  Cookies.set('theme', value ? 'dark' : 'light')
  $q.dark.set(value)
}
</script>
