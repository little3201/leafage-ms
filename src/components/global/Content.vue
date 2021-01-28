<template>
  <div class="grid grid-flow-row grid-rows-1 grid-cols-1" :class="{isShow: grid-cols-2}">
    <textarea class="border-r border-gray-700 bg-gray-50" :value="content" @input="compileContent"></textarea>
    <div v-show="isShow" v-html="compiled"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Content",

  props:{
    content: {
      tyep: String,
      default: ''
    }
  },

  data() {
    return {
      isShow: false,
      compiled: ''
    };
  },

  methods: {
    compileContent () {
      
    }
  },
});
</script>