<template>
  <div class="login p-0">
    <div class="container sm:px-10">
      <div class="block xl:grid grid-cols-2 gap-4">
        <!-- BEGIN: Login Info -->
        <div class="hidden xl:flex flex-col min-h-screen">
          <a href="/" class="flex items-center pt-5">
            <img
              alt="Midone Tailwind HTML Admin Template"
              class="w-6"
              src="/images/logo.svg"
            />
            <span class="text-white text-lg ml-3">
              Abe<span class="font-medium">ille</span>
            </span>
          </a>
          <div class="my-auto">
            <img
              alt="Midone Tailwind HTML Admin Template"
              class="w-1/2 -mt-16"
              src="/images/illustration.svg"
            />
            <div
              class="text-white font-medium text-4xl leading-tight mt-10"
            >
              A few more clicks to
              <br />
              sign in to your account.
            </div>
            <div class="mt-5 text-lg text-white">
              Manage all your e-commerce accounts in one place
            </div>
          </div>
        </div>
        <!-- END: Login Info -->
        <!-- BEGIN: Login Form -->
        <div class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
          <div
            class="my-auto mx-auto xl:ml-20 bg-white xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto"
          >
            <h2
              class="font-bold text-2xl xl:text-3xl text-center xl:text-left"
            >
              Sign In
            </h2>
            <div class="mt-2 text-gray-500 xl:hidden text-center">
              A few more clicks to sign in to your account. Manage all your
              e-commerce accounts in one place
            </div>
            <form>
              <div class="mt-8">
                <input
                  type="text"
                  name="username"
                  class="login__input rounded-md py-2 px-3 lg:py-3 lg:px-4 border border-gray-300 block"
                  placeholder="Username/Phone/Email"
                  required
                  autofocus
                />
                <input
                  type="password"
                  name="password"
                  class="login__input rounded-md py-2 px-3 lg:py-3 lg:px-4 border border-gray-300 block mt-4"
                  placeholder="Password"
                  required
                />
              </div>
              <div class="flex text-gray-700 text-xs sm:text-sm mt-4">
                <div class="flex items-center mr-auto">
                  <input
                    type="checkbox"
                    class="py-2 px-3 border mr-2"
                    id="remember-me"
                  />
                  <label class="cursor-pointer select-none" for="remember-me"
                    >Remember me</label
                  >
                </div>
                <a href="">Forgot Password?</a>
              </div>
              <div class="mt-5 xl:mt-8 text-center xl:text-left">
                <button
                  type="submit"
                  @click="onSumbit"
                  class="button button--lg w-full xl:w-32 text-white bg-theme-1 xl:mr-3"
                >
                  Login
                </button>
                <button
                  class="button button--lg w-full xl:w-32 text-gray-700 border border-gray-300 mt-3 xl:mt-0"
                >
                  Sign up
                </button>
              </div>
            </form>
            <div
              class="mt-10 xl:mt-24 text-gray-700 text-center xl:text-left"
            >
              By signin up, you agree to our
              <br />
              <a class="text-theme-1" href="">Terms and Conditions</a> &
              <a class="text-theme-1" href="">Privacy Policy</a>
            </div>
          </div>
        </div>
        <!-- END: Login Form -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import instance from "../../api";

export default defineComponent({
  setup() {
    const data = computed(() => instance.post("/login"));

    function onSubmit() {
      alert("submit");
    }

    return {
      data,
    };
  },
});
</script>