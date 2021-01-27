<template>
  <div class="grid grid-flow-row grid-rows-1 grid-cols-2">
    <textarea :value="content" @input="compileContent"></textarea>
    <div v-html="compiled"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Content",

  data() {
    return {
      content:  "",
      compiled: ''
    };
  },

  methods: {
    compileContent () {
      
    }
  },
});
</script>

<style scoped>
textarea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: "Monaco", courier, monospace;
  padding: 20px;
}
</style>