<template>
  <v-row justify="center">
    <v-col
      cols="12"
    >
      <v-simple-table fixed-header>
        <template v-slot:default>
          <thead>
              <tr>
                <th class="text-center">No.</th>
                <th class="text-center">Nickname</th>
                <th class="text-center">Mobile</th>
                <th class="text-center">Email</th>
                <th class="text-center">Modified Time</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items" :key="item.name">
                <td class="text-center">{{ item.businessId }}</td>
                <td class="text-center">{{ item.nickname }}</td>
                <td class="text-center">{{ item.mobile }}</td>
                <td class="text-center">{{ item.email }}</td>
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
  name: 'User',

  data: () => ({
    dialog: false,
    items: [],
    editedIndex: -1,
    editedItem: {
      businessId: undefined,
      nickname: undefined,
      mobile: undefined,
      email: undefined,
      modifyTime: undefined
    },
    defaultItem: {
      businessId: undefined,
      nickname: undefined,
      mobile: undefined,
      email: undefined,
      modifyTime: undefined
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
    this.retrieveUser()
  },

  methods: {
    retrieveUser () {
      axios.get(SERVER_URL.user).then(response => {
        if (response.data) {
          this.items = response.data
        }
      }).catch(error => {
        alert(error.statusText)
      })
    },

    fetchUser (businessId) {
      axios.get(SERVER_URL.user.concat('/').concat(businessId)).then(response => {
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
