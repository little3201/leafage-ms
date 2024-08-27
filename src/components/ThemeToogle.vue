<template>
  <q-toggle size="sm" v-model="$q.dark.isActive" icon="sym_r_dark_mode" unchecked-icon="sym_r_light_mode"
    :color="$q.dark.isActive ? 'black' : ''" @update:model-value="handleChange" />
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'

const $q = useQuasar()

function handleChange(value: boolean) {
  $q.dark.set(value)
}
</script>
