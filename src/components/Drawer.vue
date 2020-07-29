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

      <template v-for="(item, i) in items">
        <v-list-group
          v-if="item.children"
          :key="`group-${i}`"
          :prepend-icon="item.icon"
          value="true"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-title v-text="item.title" />
          </template>

          <v-list-item
            v-for="(child, i) in item.children"
            :key="`child-${i}`"
            :to="child.to"
          >
            <v-list-item-icon>
              <v-icon v-text="child.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-item
          v-else
          :key="`item-${i}`"
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
        title: 'manager',
        children: [
          {
            icon: 'mdi-account-multiple',
            title: 'user',
            to: 'manager/user'
          },
          {
            icon: 'mdi-account-multiple',
            title: 'role',
            to: 'manager/role'
          },
          {
            icon: 'mdi-account-multiple',
            title: 'source',
            to: 'manager/source'
          },
          {
            icon: 'mdi-account-multiple',
            title: 'group',
            to: 'manager/group'
          }
        ]
      },
      {
        title: 'article',
        icon: 'mdi-book-open-page-variant',
        to: '/article'
      }
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
    retrieveSource () {
      axios.get(SERVER_URL.source).then(response => {
        alert(response.data)
        // this.items = response.data
      }).cache(error => {
        alert(error.statusText)
      })
    }
  }
}
</script>
