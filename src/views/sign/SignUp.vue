<template>
  <Sign>
    <h2 class="font-bold text-2xl xl:text-3xl text-center xl:text-left">Sign Up</h2>
    <form @submit.prevent class="mx-auto">
      <div class="mt-6">
        <input
          type="email"
          v-model="formData.email"
          class="block border-gray-300 rounded-md w-full my-6 shadow-sm"
          placeholder="Email"
          required
          autofocus
          autocomplete="off"
        />
        <input
          type="password"
          v-model.trim="formData.password"
          class="block border-gray-300 rounded-md w-full shadow-sm"
          placeholder="Password"
          required
          autocomplete="off"
        />
        <input
          type="password"
          v-model.trim="confirmPassword"
          class="block border-gray-300 rounded-md w-full my-6 shadow-sm"
          placeholder="Confirm Password"
          required
          autocomplete="off"
        />
      </div>
      <div class="flex items-center text-gray-700">
        <input
          type="checkbox"
          v-model="formData.agree"
          class="rounded border-gray-300 shadow-sm mr-2"
        />
        <label class="cursor-pointer">I agree to the Leafage</label>
        <a class="text-blue-600 ml-1" href="#">Privacy Policy</a>.
      </div>
      <button
        type="submit"
        @click="onSumbit"
        class="w-full mt-6 focus:outline-none text-white bg-blue-600 hover:bg-blue-700 hover:text-white py-2 rounded-md active:cursor-wait"
      >Sign up</button>
    </form>
    <div class="my-6 text-center xl:text-left">
      Already have an account?
      <RouterLink class="text-blue-600" to="/signin">Sign in</RouterLink>
    </div>
  </Sign>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Sign from "@/layouts/Sign.vue";

import instance from "@/api";

let formData = ref({});
const confirmPassword = ref("");

const onSubmit = async (): Promise<void> => {
  await instance.get("/check").then(() => {
    // await instance
    //   .post("/register", new URLSearchParams(formData.value))
    //   .then(() => {
    //     router.replace("/");
    //   });
    alert("注册功能在加速开发中...")
  })
};
</script>