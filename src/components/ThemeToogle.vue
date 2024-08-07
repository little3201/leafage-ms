<template>
  <q-toggle size="sm" v-model="$q.dark.isActive" icon="sym_r_dark_mode" unchecked-icon="sym_r_light_mode"
    :color="$q.dark.isActive ? 'black' : ''" />
</template>