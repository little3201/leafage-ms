<template>
  <v-container
    id="article"
    fluid
  >
    <v-row justify="center">
      <v-col
        cols="12"
      >
        <v-simple-table fixed-header>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">No.</th>
                <th class="text-center">Title</th>
                <th class="text-center">Subtitle</th>
                <th class="text-center">Author</th>
                <th class="text-center">Published Time</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items" :key="item.name">
                <td class="text-center">{{ item.businessId }}</td>
                <td class="text-center">{{ item.title }}</td>
                <td class="text-center">{{ item.subtitle }}</td>
                <td class="text-center">{{ item.author.nickname }}</td>
                <td class="text-center">{{ item.modifyTime }}</td>
                <td class="text-center">
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
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
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
