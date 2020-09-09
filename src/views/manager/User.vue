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
          @click="retrieveUser()"
        >
          <v-icon>mdi-refresh</v-icon>
        </v-btn>

        <v-btn
          icon
          class="ma-3"
          @click="editedItem()"
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
                <th class="text-center">Nickname</th>
                <th class="text-center">Mobile</th>
                <th class="text-center">Email</th>
                <th class="text-center">Expired</th>
                <th class="text-center">Locked</th>
                <th class="text-center">CredentialsExpired</th>
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
                <td class="text-center">{{ item.accountNonExpired ? '否' : '是' }}</td>
                <td class="text-center">{{ item.accountNonLocked ? '否' : '是' }}</td>
                <td class="text-center">{{ item.credentialsNonExpired ? '否' : '是' }}</td>
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
