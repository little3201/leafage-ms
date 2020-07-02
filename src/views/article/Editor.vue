<template>
  <v-container fluid class="full-height">
    <!--编辑区-->
    <v-row>
        <v-col>
          <!-- 双栏 -->
          <v-textarea lineHeight="1.5" v-model="sourceText" fullHeight></v-textarea>
        </v-col>
        <!--展示区-->
        <v-col v-show="isShow">
          <div v-html="content"></div>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import md from '@/plugins/markdown'

export default {
  name: 'Articles',

  data: () => ({
    isShow: true,
    sourceText: '',
    content: ''
  }),

  created: function () {
  },

  watch: {
    // 监听文章内容，如果变化则存入localStorage
    sourceText (val) {
      this.content = md.render(val)
    }
  },

  methods: {
  }
}
</script>
