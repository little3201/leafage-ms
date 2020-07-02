<template>
  <v-form v-model="valid">
    <v-container fluid class="full-height">
      <v-row>
        文章标题：<v-text-field outlined filled required :counter="100" />
      </v-row>
      <v-row>
        文章描述：<v-text-field outlined filled required :counter="100" />
      </v-row>
      <v-row>
          <!--编辑区-->
          <v-col>
            <v-textarea lineHeight="1.5" v-model="sourceText" auto-grow clearable outlined filled required></v-textarea>
          </v-col>
          <!--展示区-->
          <v-col v-show="isShow">
            <div v-html="content"></div>
          </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import md from '@/plugins/markdown'
import 'prismjs/themes/prism-okaidia.css'

export default {
  name: 'Articles',

  data: () => ({
    valid: false,
    isShow: true,
    title: '',
    titleRules: [
      v => !!v || 'Title is required',
      v => v.length <= 100 || 'Title must be less than 100 characters'
    ],
    sourceText: '示例代码：',
    content: ''
  }),

  created: function () {
  },

  watch: {
    // 监听文章内容，如果变化则存入localStorage
    sourceText () {
      this.content = md.render(this.sourceText)
    }
  },

  methods: {
  }
}
</script>
