<template>
  <v-container
    id="article"
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
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>文章信息</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >新增</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">新增/编辑</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field label="Dessert name"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
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
    dialog: false,
    headers: [
      { text: 'No.', value: 'businessId', align: 'center' },
      { text: 'Title', value: 'title', align: 'center' },
      { text: 'Subtitle', value: 'subtitle', align: 'center' },
      { text: 'Author', value: 'author.nickname', align: 'center' },
      { text: 'Published Time', value: 'modifyTime', align: 'center' },
      { text: 'Actions', value: 'actions', sortable: false }
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
          if (response.data) {
            this.items = response.data
          }
        },
        error => {
          alert(error.statusText)
        }
      )
    },

    editItem () {},

    deleteItem () {},

    save () {},

    close () {}
  }
}
</script>
