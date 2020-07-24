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

    <v-divider class="mb-1" />

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
        <base-item-group
          v-if="item.children"
          :key="`group-${i}`"
          :item="item"
        >
          <!--  -->
        </base-item-group>

        <base-item
          v-else
          :key="`item-${i}`"
          :item="item"
        />
      </template>

      <div />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import {
  mapState
} from 'vuex'
import { retrieveSourceFunc } from '@/api/method'

export default {
  name: 'Drawer',

  props: {
    expandOnHover: {
      type: Boolean,
      default: false
    }
  },

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
        subGroup: true,
        children: [
          {
            icon: 'mdi-account-multiple',
            title: 'user',
            to: 'user',
            subGroup: true
          },
          {
            icon: 'mdi-account-multiple',
            title: 'role',
            to: 'role',
            subGroup: true
          },
          {
            icon: 'mdi-account-multiple',
            title: 'source',
            to: 'source',
            subGroup: true
          },
          {
            icon: 'mdi-account-multiple',
            title: 'group',
            to: 'group',
            subGroup: true
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
      retrieveSourceFunc().then(
        response => {
          alert(response.data.budinessId)
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
