<template>
  <Sign>
    <h2 class="font-bold text-2xl xl:text-3xl text-center xl:text-left">Sign In</h2>
    <form @submit.prevent="onSubmit">
      <div class="mt-6">
        <input
          type="text"
          name="username"
          v-model="formData.username"
          class="border border-gray-300 rounded-md w-full my-6 shadow-sm"
          placeholder="Username/Email"
          required
          autofocus
          autocomplete="off"
        />
        <input
          type="password"
          name="password"
          v-model="formData.password"
          class="border border-gray-300 rounded-md w-full mb-6 shadow-sm"
          placeholder="Password"
          required
          autocomplete="off"
        />
      </div>
      <div class="flex text-gray-700">
        <div class="inline-flex items-center mr-auto">
          <input type="checkbox" class="rounded border-gray-300 shadow-sm mr-2" id="remember-me" />
          <label class="cursor-pointer" for="remember-me">Remember me</label>
        </div>
        <a href="#" class="text-blue-600">Forgot Password ?</a>
      </div>
      <button
        type="submit"
        @click="onSubmit"
        class="w-full mt-6 focus:outline-none text-white bg-blue-600 hover:bg-blue-700 hover:text-white py-2 rounded-md active:cursor-wait"
      >Sign in</button>
    </form>
    <div class="my-6 text-center xl:text-left">
      Not registered?
      <RouterLink class="text-blue-600" to="/signup">Create account</RouterLink>
    </div>
  </Sign>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Sign from "/@/layouts/Sign.vue";

import { useRoute, useRouter } from "vue-router";

import instance from "../../api";
import { SERVER_URL } from "../../api/request";

let formData = ref({});

const route = useRoute();
const router = useRouter();

const onSubmit = async (): Promise<void> => {
  await instance.get("/check").then(() => {
    instance.post("/login", new URLSearchParams(formData.value))
      .then(res => init(res.data.username));
  })
};

const init = async (username: string): Promise<void> => {
  await Promise.all([
    instance.get(SERVER_URL.user.concat("/", username)).then(res =>
      sessionStorage.setItem("user", JSON.stringify(res.data))),
    instance
      .get(SERVER_URL.user.concat("/", username, "/authority"))
      .then(res => sessionStorage.setItem("menus", JSON.stringify(res.data)))
  ]).then(() => {
    // 登录完成后，调整原请求页
    router.replace({ path: route.query.redirect?.toString() || "/" });
  })
}

</script>