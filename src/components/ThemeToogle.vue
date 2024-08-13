<template>
  <q-toggle size="sm" v-model="$q.dark.isActive" icon="mdi-weather-night" unchecked-icon="mdi-white-balance-sunny"
    :color="$q.dark.isActive ? 'black' : ''" @update:model-value="handleChange" />
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'

const $q = useQuasar()

function handleChange(value: boolean) {
  $q.dark.set(value)
}
</script>
