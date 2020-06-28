<template>
  <v-container fluid class="full-height">
    <!--编辑区-->
    <div>
        <div>
          <!-- 双栏 -->
          <v-textarea lineHeight="1.5" v-model="sourceText" fullHeight></v-textarea>
        </div>
    </div>
    <!--展示区-->
    <div v-show="isShow">
      <div v-html="content"></div>
    </div>
  </v-container>
</template>

<script>
import markdown from '@/markdown'

export default {
  name: 'Articles',

  data: () => ({
    isShow: true,
    sourceText: '',
    content: ''
  }),

  created: function () {
  },

  methods: {
    dataConvert (pos, url) {
      // debugger
      this.content = markdown.render(this.sourceText)
    }
  }
}
</script>
