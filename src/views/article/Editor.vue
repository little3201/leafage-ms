<template>
  <v-form ref="form" v-model="valid" lazy-validation class="ma-3">
    <v-container fluid>
      <v-row>
        文章标题：<v-text-field
                  dense
                  outlined
                  filled
                  required
                  :counter="80"
                  v-model="data.title"
                  :rules="titleRules"
                  maxlength="80"
                />
        <v-btn depressed class="mx-3" @click="storageData">提交</v-btn>
      </v-row>
      <v-row>
        文章描述：<v-text-field
                  dense
                  outlined
                  filled
                  required
                  :counter="100"
                  v-model="data.subtitle"
                  :rules="subtitleRules"
                  maxlength="100"
                />
      </v-row>
      <v-row>
          <!--编辑区-->
          <v-col>
            <v-textarea v-model="data.sourceText" rows="14" outlined filled required></v-textarea>
          </v-col>
          <!--展示区-->
          <v-col v-show="isShow">
            <v-textarea v-html="data.content" outlined readonly></v-textarea>
          </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import md from '@/plugins/markdown'
import 'prismjs/themes/prism-okaidia.css'
import { createArticleFunc, modifyArticleFunc } from '@/api/method'

export default {
  name: 'Articles',

  data: () => ({
    valid: true,
    isShow: true,
    data: {
      businessId: '',
      title: '',
      subtitle: '',
      sourceText: '',
      content: ''
    },
    titleRules: [
      v => !!v || 'Title is required',
      v => v.length <= 80 || 'Title must be less than 100 characters'
    ],
    subtitleRules: [
      v => !!v || 'SubTitle is required',
      v => v.length <= 100 || 'SubTitle must be less than 100 characters'
    ]
  }),

  computed: {
    getSourceTest () {
      return this.data.sourceText
    }
  },

  watch: {
    // 监听sourceText变化
    getSourceTest: {
      handler: function () {
        this.data.content = md.render(this.data.sourceText)
      }
    }
  },

  methods: {
    storageData () {
      if (this.$refs.form.validate()) {
        debugger
        if (this.data.businessId) {
          modifyArticleFunc(this.data).then(
            response => {
              this.data = response.data
            },
            error => {
              // 执行失败的回调函数
              alert(error.message)
            }
          )
        } else {
          createArticleFunc(this.data).then(
            response => {
              this.data = response.data
            },
            error => {
              // 执行失败的回调函数
              alert(error.message)
            })
        }
      }
    }
  }
}
</script>
