<template>
  <v-container fluid class="full-height">
    <!--编辑区-->
    <div ref="vNoteEdit" @scroll="$v_edit_scroll"
          :class="{'scroll-style': s_scrollStyle, 'scroll-style-border-radius': s_scrollStyle && !s_preview_switch && !s_html_code, 'single-edit': !s_preview_switch && !s_html_code, 'single-show': (!s_subfield && s_preview_switch) || (!s_subfield && s_html_code), 'transition': transition}"
          @click="textAreaFocus">
        <div>
          <!-- 双栏 -->
          <v-textarea ref="vNoteTextarea" lineHeight="1.5" v-model="sourceText" fullHeight></v-textarea>
        </div>
    </div>
    <!--展示区-->
    <div :class="{'single-show': (!s_subfield && s_preview_switch) || (!s_subfield && s_html_code)}"
        v-show="s_preview_switch || s_html_code" class="v-note-show">
      <div ref="vShowContent" v-html="d_render" v-show="!s_html_code"
            :class="{'scroll-style': s_scrollStyle, 'scroll-style-border-radius': s_scrollStyle}" class="v-show-content"
            >
      </div>
      <div :class="{'scroll-style': s_scrollStyle, 'scroll-style-border-radius': s_scrollStyle}" class="v-show-content-html">
          {{content}}
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'Articles',
  props: {
    businessId: String
  },

  data: () => ({
    sourceText: '',
    content: ''
  }),

  created: function () {
  },

  methods: {
    dataConvert(pos, url) {
      this.$nextTick(function () {
          this.content = this.markdownIt.render(this.d_value);
      })
    }
  }
}
</script>
