<template>
  <v-container
    id="article"
    fluid
  >
    <v-row justify="center">
      <v-col
        cols="12"
      >
        <v-data-table
          :headers="headers"
          :items="items"
        >
          <template v-slot:item.actions="{ item }">
            <v-btn
              small
              icon
              color="green"
              class="mr-2"
              :to="'article/profile/' + item.businessId"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              small
              icon
              color="red"
              @click="deleteItem(item)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from '@/api'
import { SERVER_URL } from '@/api/request'

export default {
  name: 'User',

  data: () => ({
    headers: [
      { text: 'No.', value: 'businessId', align: 'center' },
      { text: 'Title', value: 'title', align: 'center' },
      { text: 'Subtitle', value: 'subtitle', align: 'center' },
      { text: 'Author', value: 'author.nickname', align: 'center' },
      { text: 'Published Time', value: 'modifyTime', align: 'center' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    items: [],
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    }
  }),

  created () {
    this.retrieveArticle()
  },

  methods: {
    retrieveArticle () {
      axios.get(SERVER_URL.article).then(response => {
        if (response.data) {
          this.items = response.data
        }
      }).catch(error => {
        alert(error.statusText)
      })
    },

    deleteItem (item) {
      const index = this.items.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
    }
  }
}
</script>
