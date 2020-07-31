<template>
  <v-app>
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <!-- content -->
        <v-row justify="space-around" class="my-0">
          <v-sheet class="pa-5" width="296">
            <v-row justify="center">
              <router-link to="/">
                <v-img max-width="6rem" src="@/assets/logo.png"></v-img>
              </router-link>
            </v-row>
            <v-row justify="center">
              <h4 class="my-3 text-uppercase">Sign In To Abeille</h4>
            </v-row>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="formData.username"
                :rules="formRules.username"
                label="手机号/邮箱"
                prepend-inner-icon="mdi-account"
                required
                autocomplete="off"
              ></v-text-field>
              <v-text-field
                v-model="formData.password"
                :rules="formRules.password"
                label="登录密码"
                prepend-inner-icon="mdi-lock"
                required
                autocomplete="off"
                :type="pwdShow ? 'text' : 'password'"
                :append-icon="pwdShow ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="pwdShow = !pwdShow"
              ></v-text-field>
            </v-form>
            <p class="text-right">
              <a href="#" class="text-subtitle-2">忘记密码</a>
            </p>
            <p>
              <v-btn
                depressed
                rounded
                class="text-body-1"
                :loading="loading"
                color="primary"
                block
                @click="submitForm"
              >
                登&emsp;录
              </v-btn>
            </p>
            <p>
              <span class="text-subtitle-2">没有账号？</span>
              <a href="/signup" class="text-subtitle-2">
                去注册
              </a>
            </p>
            <p class="mb-0 text-center">第三方账号登录</p>
            <p class="mb-0 text-center">
              <v-btn text icon x-large>
                <v-icon>mdi-twitter</v-icon>
              </v-btn>
              <v-btn text icon x-large>
                <v-icon>mdi-github</v-icon>
              </v-btn>
              <v-btn text icon x-large>
                <v-icon>mdi-wechat</v-icon>
              </v-btn>
            </p>
          </v-sheet>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from '@/api'
import qs from 'qs'
import { SERVER_URL } from '@/api/request'

export default {
  name: 'signin',
  data () {
    return {
      loading: false,
      valid: true,
      pwdShow: false,
      formData: {
        username: '',
        password: ''
      },
      formRules: {
        username: [
          v => !!v || '请输入手机号/邮箱'
        ],
        password: [
          v => !!v || '请输入密码'
        ]
      }
    }
  },
  methods: {
    submitForm () {
      if (this.$refs.form.validate()) {
        this.loading = true
        axios.post(SERVER_URL.signin, qs.stringify(this.formData, { indices: false })).then(response => {
          debugger
          this.$cookies.set('keyName', 'time')
          this.$router.push({
            name: 'dashbord'
          })
        }).catch(error => {
          alert(error.statusText)
        })
        this.loading = false
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="sass" scoped>
a
  text-decoration: none
</style>
