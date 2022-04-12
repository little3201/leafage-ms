<template>
  <Sign>
    <h2 class="font-bold text-2xl xl:text-3xl text-center xl:text-left">Sign In</h2>
    <form @submit.prevent>
      <div class="mt-6">
        <input
          type="text"
          name="username"
          v-model="formData.username"
          class="block border-gray-300 rounded-md w-full my-6 shadow-sm"
          placeholder="Username/Email"
          required
          autofocus
          autocomplete="off"
        />
        <input
          type="password"
          name="password"
          v-model="formData.password"
          class="block border-gray-300 rounded-md w-full shadow-sm"
          placeholder="Password"
          required
          autocomplete="off"
        />
        <p v-show="errMsg.length > 0" class="text-red-600 text-xs pt-1">{{ errMsg }}</p>
      </div>
      <div class="flex text-gray-700 mt-6">
        <div class="inline-flex items-center mr-auto">
          <input type="checkbox" class="rounded border-gray-300 shadow-sm mr-2" id="remember-me" />
          <label class="cursor-pointer" for="remember-me">Remember me</label>
        </div>
        <a href="#" class="text-blue-600">Forgot Password ?</a>
      </div>
      <button
        type="submit"
        :disabled="isLoad"
        @click="onSubmit"
        class="w-full inline-flex items-center justify-center mt-6 focus:outline-none text-white bg-blue-600 hover:bg-blue-700 hover:text-white py-2 rounded-md active:cursor-wait"
      >
        <svg
          v-if="isLoad"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="animate-spin"
        >
          <use :xlink:href="'/svg/feather-sprite.svg#' + 'loader'" />
        </svg>
        <span v-else>{{$t('signin')}}</span>
      </button>
    </form>
    <div class="my-6 text-center xl:text-left">
      Not registered?
      <RouterLink class="text-blue-600" to="/signup">Create account</RouterLink>
    </div>
  </Sign>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { instance, SERVER_URL } from "@/api";

import Sign from "@/layouts/Sign.vue";

let formData = reactive({
  username: '',
  password: ''
});
let errMsg = ref('')
let isLoad = ref(false)

const route = useRoute();
const router = useRouter();

/**
 * 表单提交
 */
const onSubmit = async (): Promise<void> => {
  errMsg.value = ''
  if (!formData.username) {
    errMsg.value = "username must not blank."
  } else if (!formData.password) {
    errMsg.value = "password must not blank."
  } else {
    isLoad.value = true
    await instance.get("/check").then(() => {
      instance.post("/login", new URLSearchParams(formData))
        .then(res => {
          if (res.data.username && res.data.username.length > 0) {
            storage(res.data.username)
          } else {
            errMsg.value = res.data
            isLoad.value = false
          }
        }).catch(() => isLoad.value = false);
    })
  }
};

/**
 * 数据存储
 */
const storage = async (username: string): Promise<void> => {
  if (username && username.length > 0) {
    await Promise.all([
      instance.get(SERVER_URL.account.concat("/", username)).then(res => sessionStorage.setItem("account", JSON.stringify(res.data))),
      instance.get(SERVER_URL.account.concat("/", username, "/authority"))
        .then(res => {
          if (res.data && res.data.length > 0) {
            sessionStorage.setItem("menus", JSON.stringify(res.data))
          }
        })
    ]).then(() => {
      // 登录完成后，调整原请求页
      router.replace({ path: route.query.redirect?.toString() || "/" });
    })
  }

}

</script>