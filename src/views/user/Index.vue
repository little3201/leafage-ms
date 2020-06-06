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
      { text: 'RealName', value: 'realName', align: 'center' },
      { text: 'Mobile', value: 'mobile', align: 'center' },
      { text: 'Email', value: 'email', align: 'center' },
      { text: 'Age', value: 'age' },
      { text: 'Gender', value: 'gender' },
      { text: 'Country', value: 'country' },
      { text: 'Province', value: 'province' },
      { text: 'City', value: 'city' },
      { text: 'Region', value: 'region' }
    ],
    items: [
      {
        realName: 'Frozen',
        mobile: 15967874565,
        email: 'little3201@163.com',
        age: 24,
        gender: 4.0,
        country: '1%',
        province: '1%',
        city: '1%',
        region: '1%'
      },
      {
        realName: 'Frozen',
        mobile: 15967874565,
        email: 'little3201@163.com',
        age: 24,
        gender: 4.0,
        country: '1%',
        province: '1%',
        city: '1%',
        region: '1%'
      },
      {
        realName: 'Frozen',
        mobile: 15967874565,
        email: 'little3201@163.com',
        age: 24,
        gender: 4.0,
        country: '1%',
        province: '1%',
        city: '1%',
        region: '1%'
      }
    ]
  }),

  created () {
    this.retrieveUser()
  },

  methods: {
    retrieveUser () {
      retrieveUserFunc().then(
        response => {
          // this.items = response.data
        },
        error => {
          alert(error.statusText)
        }
      )
    }
  }
}
</script>
