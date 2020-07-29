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
            <v-icon
              small
              color="green"
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              color="red"
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
import axios from '@/api'
import { SERVER_URL } from '@/api/request'

export default {
  name: 'User',

  data: () => ({
    dialog: false,
    headers: [
      { text: 'No.', value: 'businessId', align: 'center' },
      { text: 'Title', value: 'title', align: 'center' },
      { text: 'Subtitle', value: 'subtitle', align: 'center' },
      { text: 'Author', value: 'author.nickname', align: 'center' },
      { text: 'Published Time', value: 'modifyTime', align: 'center' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    items: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

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

    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.items.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem)
      } else {
        this.items.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>
