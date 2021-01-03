<template>
  <div id="editor">
    <textarea :value="data" @input="update"></textarea>
    <div v-html="compiledMarkdown"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  data() {
    return {
      data: "",
    };
  },
  computed: {
    compiledMarkdown(): string {
      return "";
      //   return marked(this.data, { sanitize: true });
    },
  },
  methods: {
    // update: _.debounce(function (e) {
    //   this.data = e.target.value;
    // }, 300),
  },
});
</script>


<style scoped>
html,
body,
#editor {
  margin: 0;
  height: 100%;
  font-family: "Helvetica Neue", Arial, sans-serif;
  color: #333;
}

textarea,
#editor div {
  display: inline-block;
  width: 49%;
  height: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
}

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

code {
  color: #f66;
}
</style>