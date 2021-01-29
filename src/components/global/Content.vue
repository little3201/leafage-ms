<template>
  <div
    class="grid grid-flow-row grid-rows-1 rounded-md border mt-2"
    :class="{ 'grid-cols-2': isShow, 'grid-cols-1': !isShow }"
  >
    <textarea class="p-2" :value="content" @input="compileContent"></textarea>
    <div class="border-l" v-show="isShow">
      <p v-html="html"></p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";

export default defineComponent({
  name: "Content",

  props: {
    content: {
      tyep: String,
      default: "",
    },
  },

  data() {
    return {
      isShow: true,
      html: "",
    };
  },

  methods: {
    compileContent() {
      const md = new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
        highlight: function (str: string, lang: string): string {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return (
                '<pre class="hljs"><code>' +
                hljs.highlight(lang, str, true).value +
                "</code></pre>"
              );
            } catch (__) {}
          }

          return (
            '<pre class="hljs"><code>' +
            md.utils.escapeHtml(str) +
            "</code></pre>"
          );
        },
      });

      this.html = md.render(this.content);
    },
  },
});
</script>

<style scoped>
@import url("highlight.js/styles/github.css");
</style>