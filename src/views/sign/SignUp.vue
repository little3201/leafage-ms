<template>
  <Sign>
    <h2 class="font-bold text-2xl xl:text-3xl text-center xl:text-left">
      Sign Up
    </h2>
    <form
      class="mx-auto"
      @submit.prevent
    >
      <div class="mt-6">
        <input
          v-model="formData.email"
          type="email"
          class="block border-gray-300 rounded-md w-full my-6 shadow-sm"
          placeholder="Email"
          required
          
          autocomplete="off"
          aria-label="email"
        >
        <input
          v-model.trim="formData.password"
          type="password"
          class="block border-gray-300 rounded-md w-full shadow-sm"
          placeholder="Password"
          required
          autocomplete="off"
          aria-label="password"
        >
        <input
          v-model.trim="confirmPassword"
          type="password"
          class="block border-gray-300 rounded-md w-full my-6 shadow-sm"
          placeholder="Confirm Password"
          required
          autocomplete="off"
          aria-label="confirm password"
        >
      </div>
      <div class="flex items-center text-gray-700">
        <input
          v-model="agree"
          type="checkbox"
          class="rounded border-gray-300 shadow-sm mr-2"
          aria-label="agree"
        >
        <label class="cursor-pointer">I agree to the Leafage</label>
        <a
          class="text-blue-600 ml-1"
          href="#"
        >Privacy Policy</a>.
      </div>
      <button
        type="submit"
        name="submit"
        aria-label="submit"
        class="w-full mt-6 focus:outline-none text-white bg-blue-600 hover:bg-blue-700 hover:text-white py-2 rounded-md active:cursor-wait"
        @click="onSubmit"
      >
        {{
          $t('signup')
        }}
      </button>
    </form>
    <div class="my-6 text-center xl:text-left">
      Already have an user?
      <RouterLink
        class="text-blue-600"
        to="/signin"
      >
        Sign in
      </RouterLink>
    </div>
  </Sign>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Sign from "~/components/Sign.vue"
import { useRouter } from "vue-router"

import { instance } from "~/api";

const router = useRouter();

let formData = ref({
  email: '',
  password: ''
});
const confirmPassword = ref("");
const agree = ref(false)

const onSubmit = async () => {
  await instance.get("/check").then(() => {
    instance
      .post("/register", new URLSearchParams(formData.value))
      .then(() => router.replace("/"));
  })
};
</script>