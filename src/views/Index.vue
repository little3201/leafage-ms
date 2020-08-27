<template>
  <v-container fluid>
    <v-row>
      <v-col md="6">
        <v-sparkline
          :labels="labels"
          :value="value"
          :gradient="gradient"
          smooth
          line-width="1"
          auto-draw
          show-labels
          label-size="4"
        ></v-sparkline>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from '@/api'
import { SERVER_URL } from '@/api/request'

const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea']
]

export default {
  name: 'Dashboard',

  data: () => ({
    gradient: gradients[5],
    labels: [],
    value: []
  }),

  created () {
    this.monthCount()
  },

  methods: {
    monthCount () {
      axios.get(SERVER_URL.article.concat('/statistics')).then(response => {
        if (response.data) {
          this.labels = [...this.labels, ...response.data.map(item => item.label)]
          this.value = [...this.value, ...response.data.map(item => item.value)]
        }
      }).catch(error => {
        alert(error.statusText)
      })
    }
  }
}
</script>
