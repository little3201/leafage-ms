<template>
  <v-form ref="form" v-model="valid" lazy-validation class="ma-3">
    <v-container fluid>
      <v-row>
        <v-text-field
          label="文章标题"
          dense
          outlined
          filled
          required
          :counter="80"
          v-model="data.title"
          :rules="titleRules"
          maxlength="80"
          class="mr-4"
        />
        <v-btn
          depressed
          style="margin-top:2px"
          @click="storageData"
          :loading="loading"
          color="primary"
        >发表文章</v-btn>
      </v-row>
      <v-row>
        <v-text-field
          label="文章描述"
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
        <v-col class="pa-0">
          <v-textarea label="Markdown" v-model="data.original" height="calc(100vh - 345px)" outlined filled required></v-textarea>
        </v-col>
        <!--展示区-->
        <v-col v-show="isShow" class="pa-0">
          <div v-html="data.content" height="calc(100vh - 345px)"></div>
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
    loading: false,
    isShow: true,
    data: {
      businessId: '',
      title: '',
      subtitle: '',
      original: '',
      content: '',
      modifier: 'US328CNJ9'
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
    originalConvert () {
      return this.data.original
    }
  },

  watch: {
    // 监听sourceText变化
    originalConvert () {
      this.data.content = md.render(this.data.original)
    }
  },

  methods: {
    storageData () {
      if (this.$refs.form.validate()) {
        this.loading = true
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
          this.loading = false
        } else {
          createArticleFunc(this.data).then(
            response => {
              this.data = response.data
            },
            error => {
              // 执行失败的回调函数
              alert(error.message)
            }
          )
          this.loading = false
        }
      }
    }
  }
}
</script>
