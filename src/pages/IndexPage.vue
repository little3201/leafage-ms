<template>
  <q-page padding>
    <!-- <q-card flat>
      <q-card-section> -->
    <q-date v-model="data" />
    <!-- </q-card-section>
    </q-card> -->
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { date } from 'quasar'

const data = ref(date.formatDate(Date.now(), 'YYYY/MM/DD'))
</script>
