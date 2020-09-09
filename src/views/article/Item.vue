<template>
  <v-container
    id="article"
    fluid
  >

    <v-row class="mx-3">
      <v-text-field
        label="Search"
        append-icon="mdi-magnify"
        autocomplete="off"
      />
      <v-btn
        icon
        class="ml-8 mt-3"
        @click="retrieveArticle()"
      >
        <v-icon>mdi-refresh</v-icon>
      </v-btn>

      <v-btn
        icon
        class="ma-3"
        to="article/profile"
        color="primary"
      >
        <v-icon left>mdi-plus-circle</v-icon>
      </v-btn>
    </v-row>

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
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title class="h6 grey lighten-2">
                  删除
                </v-card-title>

                <v-card-text>
                  <v-row>
                    <v-col class="text-center mt-6">删除后将无法恢复，确认删除请输入“删除”</v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field label="删除"></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="close">Cancel</v-btn>
                  <v-btn text @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
    dialog: false,
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
      this.dialog = true
    },

    close () {
      this.dialog = false
    },

    save () {
      this.close()
    }
  }
}
</script>
