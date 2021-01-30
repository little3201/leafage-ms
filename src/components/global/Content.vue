<template>
  <div
    class="grid grid-flow-row grid-rows-1 rounded-md border mt-2"
    :class="{ 'grid-cols-2': isShow, 'grid-cols-1': !isShow }"
  >
    <textarea class="p-2 min-h-screen" :value="input" @input="update"></textarea>
    <div class="border-l overflow-auto bg-white" v-show="isShow" v-html="rendedHtml">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

export default defineComponent({
  name: "Content",

  props: {
    content: {
      tyep: String,
      default: "",
    },
  },

  setup(props) {
    const isShow = ref(true)
    const input = ref(props.content);

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

    const update = (e: any) => {
      setTimeout(() => {
        input.value  = e.target.value;
      }, 300);
    };

    const rendedHtml = computed(() => {
      return md.render(input.value);
    });

    return { isShow, rendedHtml, input, update };
  },
});
</script>