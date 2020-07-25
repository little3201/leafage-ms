<template>
  <v-list-group
    :group="group"
    :prepend-icon="item.icon"
    :sub-group="subGroup"
    append-icon="mdi-menu-down"
    :color="barColor !== 'rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.7)' ? 'white' : 'grey darken-1'"
  >
    <template v-slot:activator>
      <v-list-item-title v-text="item.title" />
    </template>

    <template v-for="(child, i) in children">
      <base-item-sub-group
        v-if="child.children"
        :key="`sub-group-${i}`"
        :item="child"
        :subGroup="true"
      />

      <v-list-item
        v-else
        :key="i"
        :href="href"
        :rel="href && href !== '#' ? 'noopener' : undefined"
        :target="href && href !== '#' ? '_blank' : undefined"
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
  </v-list-group>
</template>

<script>
// Utilities
import kebabCase from 'lodash/kebabCase'
import { mapState } from 'vuex'

export default {
  name: 'ItemGroup',

  inheritAttrs: false,

  props: {
    item: {
      type: Object,
      default: () => ({
        group: undefined,
        title: undefined,
        children: []
      })
    },
    subGroup: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...mapState(['barColor']),
    children () {
      return this.item.children.map(item => ({
        ...item,
        to: !item.to ? undefined : `${this.item.group}/${item.to}`
      }))
    },
    computedText () {
      if (!this.item || !this.item.title) return ''

      let text = ''

      this.item.title.split(' ').forEach(val => {
        text += val.substring(0, 1)
      })

      return text
    },
    group () {
      return this.genGroup(this.item.children)
    }
  },

  methods: {
    genGroup (children) {
      return children
        .filter(item => item.to)
        .map(item => {
          const parent = item.group || this.item.group
          let group = `${parent}/${kebabCase(item.to)}`

          if (item.children) {
            group = `${group}|${this.genGroup(item.children)}`
          }

          return group
        }).join('|')
    }
  }
}
</script>

<style>
.v-list-group__activator p {
  margin-bottom: 0;
}
</style>
