<template>
  <div class="login xl:bg-white">
    <div class="container mx-auto">
      <div class="xl:grid grid-cols-2 gap-4">
        <div class="hidden xl:flex flex-col h-screen my-auto md:ml-36 relative">
          <a href="/" class="flex items-center z-0 absolute top-28">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 311.983 311.929"
            >
              <g
                id="Icon_ionic-ios-apps"
                data-name="Icon ionic-ios-apps"
                transform="translate(-4.494 -4.496)"
              >
                <path
                  id="Path_9"
                  data-name="Path 9"
                  d="M305.678,64.318,184.327,9a65.721,65.721,0,0,0-47.842,0L15.22,64.318c-14.293,6.5-14.293,17.117,0,23.639l120.221,54.826a69.059,69.059,0,0,0,50.033,0L305.687,87.956C319.971,81.46,319.971,70.822,305.678,64.318Z"
                  transform="translate(0.07 0)"
                  fill="#b5c8ff"
                />
                <g
                  id="Group_1"
                  data-name="Group 1"
                  transform="translate(4.493 135.941)"
                >
                  <path
                    id="Path_10"
                    data-name="Path 10"
                    d="M135.441,61.195,54.375,24.239a13.18,13.18,0,0,0-10.8,0L15.22,37.154C.927,43.65.927,54.271,15.22,60.792l120.221,54.826a69.058,69.058,0,0,0,50.033,0L305.687,60.792c14.293-6.5,14.293-17.117,0-23.639L277.341,24.239a13.18,13.18,0,0,0-10.8,0L185.474,61.195A69.058,69.058,0,0,1,135.441,61.195Z"
                    transform="translate(-4.423 60.176)"
                    fill="#fff"
                  />
                  <path
                    id="Path_11"
                    data-name="Path 11"
                    d="M305.757,28.732,280,17.033a12.992,12.992,0,0,0-10.724,0l-87.724,39.72a71.712,71.712,0,0,1-42.159,0L51.681,17.033a12.992,12.992,0,0,0-10.724,0l-25.744,11.7C.92,35.228.92,45.849,15.213,52.371L135.426,107.2a69.058,69.058,0,0,0,50.033,0L305.671,52.371C320.049,45.866,320.049,35.228,305.757,28.732Z"
                    transform="translate(-4.493 -15.875)"
                    fill="#fff"
                  />
                </g>
              </g>
            </svg>
            <span class="text-white text-xl ml-3">
              Leaf<span class="font-medium">age</span>
            </span>
          </a>
          <img src="/svg/illustration.svg" class="my-auto" alt="leafage" />
          <div class="z-0 absolute bottom-28">
            <p class="text-white font-medium text-xl leading-tight">
              一个使用 Vue3、 Tailwindcss 的网站管理系统
            </p>
            <p class="text-white">致力于提供一个开源、好用、好看的管理系统</p>
          </div>
        </div>
        <div class="h-screen flex px-2">
          <div
            class="
              max-w-xs
              m-auto
              bg-white
              xl:bg-transparent
              px-4
              py-8
              xl:p-0
              rounded-md
              shadow-sm
              xl:shadow-none
              w-full
            "
          >
            <h2 class="font-bold text-2xl xl:text-3xl text-center xl:text-left">
              Sign Up
            </h2>
            <form @submit.prevent="onSubmit" class="mx-auto">
              <div class="mt-6">
                <input
                  type="email"
                  v-model="formData.email"
                  class="
                    border border-gray-300
                    rounded-md
                    w-full
                    my-6
                    shadow-sm
                  "
                  placeholder="Email"
                  required
                  autocomplete="off"
                />
                <input
                  type="password"
                  v-model.trim="formData.password"
                  class="border border-gray-300 rounded-md w-full shadow-sm"
                  placeholder="Password"
                  required
                  autocomplete="off"
                />
                <input
                  type="password"
                  v-model.trim="confirmPassword"
                  class="
                    border border-gray-300
                    rounded-md
                    w-full
                    my-6
                    shadow-sm
                  "
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
                class="
                  w-full
                  mt-6
                  focus:outline-none
                  text-white
                  bg-blue-600
                  hover:bg-blue-700
                  hover:text-white
                  py-2
                  rounded-md
                "
              >
                Sign up
              </button>
            </form>
            <div class="my-6 text-center xl:text-left">
              Already have an account?
              <router-link class="text-blue-600" to="/signin"
                >Sign in</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

import instance from "../../api";

const formData = ref({});
const confirmPassword = ref("");

const onSubmit = async () => {
  // await instance
  //   .post("/register", new URLSearchParams(formData.value))
  //   .then(() => {
  //     router.replace("/");
  //   });
  alert("注册功能在加速开发中...")
};

onMounted(() => {
  instance.get("/check");
});
</script>

<style scoped>
@media (min-width: 1280px) {
  .login:before {
    content: "";
    margin-left: -48%;
    min-width: 768px;
    @apply absolute w-full h-full bg-no-repeat bg-right;
    background-image: url(/svg/bg-login-page.svg);
    background-size: auto 100%;
  }
}
</style>