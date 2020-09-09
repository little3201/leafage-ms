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
          @click="retrieveSource()"
        >
          <v-icon>mdi-refresh</v-icon>
        </v-btn>

        <v-btn
          icon
          class="ma-3"
          to="article/profile"
          color="primary"
        >
          <v-icon>mdi-plus-circle</v-icon>
        </v-btn>
      </v-row>

      <v-simple-table fixed-header>
        <template v-slot:default>
          <thead>
              <tr>
                <th class="text-center">No.</th>
                <th class="text-center">Name</th>
                <th class="text-center">Type</th>
                <th class="text-center">Path</th>
                <th class="text-center">Description</th>
                <th class="text-center">Modified Time</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items" :key="item.name">
                <td class="text-center">{{ item.businessId }}</td>
                <td class="text-center">{{ item.name }}</td>
                <td class="text-center">{{ item.type }}</td>
                <td class="text-center">{{ item.path }}</td>
                <td class="text-center">{{ item.description }}</td>
                <td class="text-center">{{ item.modifyTime }}</td>
                <td class="text-center">
                  <v-btn
                    small
                    icon
                    color="green"
                    class="mr-2"
                    @click="editItem(item)"
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
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Open Dialog
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Source Profile</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Legal first name*" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Legal last name*"
                      hint="example of persistent helper text"
                      persistent-hint
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field label="Email*" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field label="Password*" type="password" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      :items="['0-17', '18-29', '30-54', '54+']"
                      label="Age*"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-autocomplete
                      :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                      label="Interests"
                      multiple
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
              <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-simple-table>
    </v-col>
  </v-row>
</template>

<script>
import axios from '@/api'
import { SERVER_URL } from '@/api/request'

export default {
  name: 'Source',

  data: () => ({
    dialog: false,
    items: [],
    defaultItem: {
      businessId: undefined,
      name: '',
      type: 0,
      path: '',
      author: undefined
    }
  }),

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.retrieveSource()
  },

  methods: {
    retrieveSource () {
      axios.get(SERVER_URL.source).then(response => {
        if (response.data) {
          this.items = response.data
        }
      }).catch(error => {
        alert(error.statusText)
      })
    },

    fetchSource (businessId) {
      axios.get(SERVER_URL.source.concat('/').concat(businessId)).then(response => {
        if (response.data) {
          this.items = response.data
        }
      }).catch(error => {
        alert(error.statusText)
      })
    },

    editItem (item) {
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.items.indexOf(item)
      confirm('Are you sure to delete this item?') && this.items.splice(index, 1)
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
