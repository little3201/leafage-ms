<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
      >
        <v-data-table
          :headers="headers"
          :items="items"
        ></v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { retrieveUserFunc } from '@/api/method'

export default {
  name: 'User',

  data: () => ({
    search: '',
    headers: [
      { text: 'No.', value: 'businessId', align: 'center' },
      { text: 'Nickname', value: 'nickname', align: 'center' },
      { text: 'Mobile', value: 'mobile', align: 'center' },
      { text: 'Email', value: 'email', align: 'center' },
      { text: 'Age', value: 'age' },
      { text: 'Gender', value: 'gender' },
      { text: 'Country', value: 'country' },
      { text: 'Province', value: 'province' },
      { text: 'City', value: 'city' },
      { text: 'Region', value: 'region' }
    ],
    items: []
  }),

  created () {
    this.retrieveUser()
  },

  methods: {
    retrieveUser () {
      retrieveUserFunc().then(
        response => {
          this.items = response.data
        },
        error => {
          alert(error.statusText)
        }
      )
    }
  }
}
</script>
