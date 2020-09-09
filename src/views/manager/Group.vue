<template>
  <v-row justify="center">
    <v-col
      cols="12"
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
          @click="retrieveGroup()"
        >
          <v-icon>mdi-refresh</v-icon>
        </v-btn>

        <v-btn
          icon
          class="ma-3"
          @click="editedItem()"
          color="primary"
        >
          <v-icon left>mdi-plus-circle</v-icon>
          创&emsp;建
        </v-btn>
      </v-row>

      <v-simple-table fixed-header>
        <template v-slot:default>
          <thead>
              <tr>
                <th class="text-center">No.</th>
                <th class="text-center">Name</th>
                <th class="text-center">Description</th>
                <th class="text-center">Modified Time</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items" :key="item.name">
                <td class="text-center">{{ item.businessId }}</td>
                <td class="text-center">{{ item.name }}</td>
                <td class="text-center">{{ item.description }}</td>
                <td class="text-center">{{ item.modifyTime }}</td>
                <td class="text-center">
                  <v-btn
                    small
                    icon
                    color="green"
                    class="mr-2"
                    @click="editedItem(item)"
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
</template>

<script>
import axios from '@/api'
import { SERVER_URL } from '@/api/request'

export default {
  name: 'Group',

  data: () => ({
    dialog: false,
    items: [],
    editedIndex: -1,
    editedItem: {
      businessId: undefined,
      name: undefined,
      description: undefined,
      author: undefined
    },
    defaultItem: {
      businessId: undefined,
      name: undefined,
      description: undefined,
      author: undefined
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
    this.retrieveGroup()
  },

  methods: {
    retrieveGroup () {
      axios.get(SERVER_URL.group).then(response => {
        if (response.data) {
          this.items = response.data
        }
      }).catch(error => {
        alert(error.statusText)
      })
    },

    fetchGroup (businessId) {
      axios.get(SERVER_URL.group.concat('/').concat(businessId)).then(response => {
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
      confirm('Are you sure to delete this item?') && this.items.splice(index, 1)
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
