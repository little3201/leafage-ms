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
        <v-file-input
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Pick an avatar"
          prepend-icon="mdi-camera"
        />
      </v-row>
      <v-row>
        <!--编辑区-->
        <v-col class="pa-0">
          <v-textarea label="Markdown" v-model="data.original" height="calc(100vh - 345px)" outlined filled required></v-textarea>
        </v-col>
        <!--展示区-->
        <v-col v-show="isShow" class="pa-0">
          <p v-html="data.content" height="calc(100vh - 345px)"></p>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import md from '@/plugins/markdown'
import 'prismjs/themes/prism-tomorrow.css'
import axios from '@/api'
import { SERVER_URL } from '@/api/request'

export default {
  name: 'Articles',

  props: {
    businessId: {
      type: String,
      default: undefined
    }
  },

  data: () => ({
    valid: true,
    loading: false,
    isShow: true,
    data: {
      businessId: undefined,
      title: undefined,
      subtitle: undefined,
      original: undefined,
      content: undefined,
      imageUrl: undefined,
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
    originalWatcher () {
      return this.data.original
    }
  },

  watch: {
    // 监听sourceText变化
    originalWatcher () {
      this.data.content = md.render(this.data.original)
    }
  },

  created () {
    if (this.businessId) {
      this.fetchArticle(this.businessId)
    }
  },

  methods: {
    // 查询
    fetchArticle (businessId) {
      if (businessId) {
        this.loading = true
        axios.get(SERVER_URL.article.concat('/').concat(businessId)).then(response => {
          this.loading = false
          if (response.data) {
            this.data = response.data
          }
        }).catch(error => {
          this.loading = false
          alert(error.statusText)
        })
        this.loading = false
      }
    },

    // 保存
    storageData () {
      if (this.$refs.form.validate()) {
        this.loading = true
        if (this.data.businessId) {
          axios.put(SERVER_URL.article, this.data).then(response => {
            this.loading = false
            if (response.data) {
              this.items = response.data
            }
          }).catch(error => {
            this.loading = false
            alert(error.statusText)
          })
        } else {
          axios.post(SERVER_URL.article, this.data).then(response => {
            this.loading = false
            if (response.data) {
              this.items = response.data
            }
          }).catch(error => {
            this.loading = false
            alert(error.statusText)
          })
        }
      }
    },

    uploadFile (file) {
      var formData = new FormData()
      let token = ''
      formData.append('token', token)
      formData.append('file', file)
      axios.post('http://up-z1.qiniup.com', formData).then(response => {
        this.loading = false
        if (response.key) {
          this.data.imageUrl = response.key
        }
      }).catch(error => {
        this.loading = false
        alert(error.statusText)
      })
    }
  }
}
</script>
