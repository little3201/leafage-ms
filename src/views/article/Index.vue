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
        >
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { retrieveArticleFunc } from '@/api/method'

export default {
  name: 'User',

  data: () => ({
    search: '',
    headers: [
      { text: 'No.', value: 'businessId', align: 'center' },
      { text: 'Title', value: 'title', align: 'center' },
      { text: 'Subtitle', value: 'subtitle', align: 'center' },
      { text: 'Author', value: 'author.nickname', align: 'center' }
    ],
    items: []
  }),

  created () {
    this.retrieveArticle()
  },

  methods: {
    retrieveArticle () {
      retrieveArticleFunc().then(
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
