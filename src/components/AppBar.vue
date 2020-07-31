<template>
  <v-app-bar
    id="app-bar"
    absolute
    app
    flat
  >
    <v-btn
      class="mr-3"
      elevation="1"
      fab
      small
      @click="setDrawer(!drawer)"
    >
      <v-icon>
        mdi-dots-vertical
      </v-icon>
    </v-btn>

    <v-toolbar-title
      class="hidden-sm-and-down font-weight-light"
      v-text="$route.name"
    />

    <v-spacer />

    <div class="mx-3" />

    <v-menu
      left
      eager
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          text
          rounded
          v-bind="attrs"
          v-on="on"
        >
          <v-badge
            color="red"
            overlap
            content="6"
          >
            <template v-slot:badge>
              <span>5</span>
            </template>

            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-list
        dense
      >
        <v-list-item-group>
          <v-list-item
            v-for="(text, i) in notifications"
            :key="`text-${i}`"
          >
            <v-list-item-content>
              <v-list-item-title v-text="text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>

    <v-menu
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          text
          rounded
          v-bind="attrs"
          v-on="on"
        >
          <v-avatar color="black" size="32">
            <img
              v-if="avatar"
              src="@/assets/avatar.jpg"
              alt="John"
            />
            <span v-else class="white--text">WL</span>
          </v-avatar>
        </v-btn>
      </template>

      <v-list
        dense
      >
        <v-list-item-group>
          <v-list-item
            v-for="(item, i) in items"
            :key="`item-${i}`"
          >
            <v-list-item-content>
              <v-list-item-title v-text="item"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
// Utilities
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'AppBar',

  components: {
  },

  data: () => ({
    avatar: undefined,
    notifications: [
      'Mike John Responded to your email',
      'You have 5 new tasks',
      'You\'re now friends with Andrew',
      'Another Notification',
      'Another one'
    ],
    items: [
      'Profile',
      'Settings',
      'Logout'
    ]
  }),

  computed: {
    ...mapState(['drawer'])
  },

  methods: {
    ...mapMutations({
      setDrawer: 'SET_DRAWER'
    })
  }
}
</script>
