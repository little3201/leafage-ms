<template>
  <v-navigation-drawer
    v-model="drawer"
    :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
    :src="barImage"
    mobile-breakpoint="960"
    app
  >
    <template v-slot:img="props">
      <v-img
        :gradient="`to bottom, ${barColor}`"
        v-bind="props"
      />
    </template>

    <v-list
      dense
      nav
    >
      <v-list-item>
        <v-img
          src="@/assets/logo.png"
          max-width="4rem"
          contain
        />
        <v-list-item-content>
          <v-list-item-title
            class="text-h4"
            style="line-height: 1"
            v-text="profile.title"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider class="mb-2" />

    <v-list
      expand
      nav
    >

      <template v-for="(item, i) in computedItems">
        <v-list-group
          v-if="item.children"
          :key="`group-${i}`"
          prepend-icon="mdi-account-multiple"
          value="true"
        >
          <template v-slot:activator>
            <v-list-item-title>Manager</v-list-item-title>
          </template>

          <v-list-group
            no-action
            sub-group
            value="true"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>User</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="(admin, i) in admins"
              :key="i"
              link
            >
              <v-list-item-title v-text="admin[0]"></v-list-item-title>
              <v-list-item-icon>
                <v-icon v-text="admin[1]"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>

          <v-list-group
            sub-group
            no-action
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Actions</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(crud, i) in cruds"
              :key="i"
            >
              <v-list-item-title v-text="crud[0]"></v-list-item-title>
              <v-list-item-action>
                <v-icon v-text="crud[1]"></v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list-group>
        </v-list-group>

        <v-list-item
          v-else
          :key="`sub-item-${i}`"
          :to="item.to"
        >

          <v-list-item-icon>
            <v-icon v-text="item.icon" />
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import {
  mapState
} from 'vuex'
import axios from '@/api'
import { SERVER_URL } from '@/api/request'

export default {
  name: 'Drawer',

  data: () => ({
    items: [
      {
        icon: 'mdi-view-dashboard',
        title: 'dashboard',
        to: '/'
      },
      {
        icon: 'mdi-account-multiple',
        title: 'Manager',
        group: 'manager',
        children: [
          {
            icon: 'mdi-account-multiple',
            title: 'user',
            to: 'user'
          },
          {
            icon: 'mdi-account-multiple',
            title: 'role',
            to: 'role'
          },
          {
            icon: 'mdi-account-multiple',
            title: 'source',
            to: 'source'
          },
          {
            icon: 'mdi-account-multiple',
            title: 'group',
            to: 'group'
          }
        ]
      },
      {
        title: 'article',
        icon: 'mdi-book-open-page-variant',
        to: '/article'
      }
    ],
    admins: [
      ['Management', 'mdi-people-outline'],
      ['Settings', 'mdi-settings']
    ],
    cruds: [
      ['Create', 'add'],
      ['Read', 'insert_drive_file'],
      ['Update', 'update'],
      ['Delete', 'delete']
    ]
  }),

  computed: {
    ...mapState(['barColor', 'barImage']),
    drawer: {
      get () {
        return this.$store.state.drawer
      },
      set (val) {
        this.$store.commit('SET_DRAWER', val)
      }
    },
    computedItems () {
      return this.items.map(this.mapItem)
    },
    profile () {
      return {
        title: this.$t('abeille')
      }
    },
    initSource () {
      return this.retrieveSource()
    }
  },

  methods: {
    mapItem (item) {
      return {
        ...item,
        children: item.children ? item.children.map(this.mapItem) : undefined,
        title: this.$t(item.title)
      }
    },
    retrieveSource () {
      axios.get(SERVER_URL.source).then(
        response => {
          alert(response.data)
          // this.items = response.data
        },
        error => {
          alert(error.statusText)
        }
      )
    }
  }
}
</script>
