<template>
<v-app>
  <v-container
    class="fill-height"
    fluid
  >
    <!-- content -->
    <v-row justify="center" class="my-0">
      <v-sheet class="pa-5" width="296">
        <v-row justify="center">
          <router-link to="/">
            <v-img max-width="6rem" src="@/assets/logo.png"></v-img>
          </router-link>
        </v-row>
        <v-row justify="center">
          <h4 class="my-3 text-uppercase">Create Your Account</h4>
        </v-row>
        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submitForm()">
          <v-text-field
            v-model="formData.username"
            :rules="formRules.username"
            label="手机号/邮箱"
            prepend-inner-icon="mdi-account"
            required
            autocomplete="off"
          />
          <v-text-field
            v-model="formData.password"
            :rules="formRules.password"
            label="登录密码"
            prepend-inner-icon="mdi-lock"
            required
            autocomplete="off"
          />
          <p class="text-subtitle-2">
            <span>已有账号？</span>
            <a href="/signin">去登录</a>
          </p>
          <p>
            <v-btn
              depressed
              rounded
              type="submit"
              class="text-body-1"
              :loading="loading"
              color="primary"
              block
            >
              注&emsp;册
            </v-btn>
          </p>
        </v-form>
        <p class="text-subtitle-2 text-center">
          <span>注册即表示同意</span>
          <a href="#" target="_blank">《Abeille用户协议》</a>
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
  </v-app>
</template>

<script>
import axios from '@/api'
import qs from 'qs'
import { SERVER_URL } from '@/api/request'

export default {
  name: 'signup',
  data () {
    return {
      loading: false,
      valid: true,
      formData: {
        username: '',
        password: ''
      },
      formRules: {
        username: [
          v => !!v || '请输入手机号/邮箱',
          v => (v && v.length <= 10) || 'Name must be less than 10 characters'
        ],
        password: [
          v => !!v || '请输入密码',
          v => (v && v.length <= 10) || 'Name must be less than 10 characters'
        ]
      }
    }
  },
  methods: {
    submitForm () {
      if (this.$refs.form.validate()) {
        this.loading = true
        axios.post(SERVER_URL.signin, qs.stringify(this.formData, { indices: false })).then(response => {
          this.loading = false
          this.$store.dispatch('validUser', response.data.isAuth).then((data) => {
            // 注册成功之后，路由跳转至用户账户页或者进行你需要的操作
            this.$router.push({
              name: 'dashbord'
            })
          })
        }).catch(error => {
          this.loading = false
          alert(error.statusText)
        })
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
</style>
