<template>
  <form @submit.prevent="onSumbit" class="bg-white rounded-md">
    <div class="flex items-center p-4 border-b border-gray-200">
      <h2 class="font-medium text-lg mr-auto">Personal Information</h2>
      <button
        type="submit"
        @click="onSubmit"
        class="p-2 rounded-md bg-blue-700 text-white focus:outline-none"
      >
        Save
      </button>
    </div>
    <div class="grid grid-cols-12 gap-4 p-4">
      <div class="col-span-12 md:col-span-4">
        <div class="border border-gray-200 rounded-md p-4">
          <div class="w-40 h-40 relative mx-auto">
            <img
              class="rounded-md"
              alt="Midone Tailwind HTML Admin Template"
              src="/images/avatar.jpg"
            />
            <span
              title="Remove this photo?"
              class="
                cursor-pointer
                tooltip
                w-5
                h-5
                inline-flex
                items-center
                justify-center
                absolute
                rounded-full
                text-white
                bg-red-600
                right-0
                top-0
                -mr-2
                -mt-2
              "
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <use xlink:href="/svg/feather-sprite.svg#x" />
              </svg>
            </span>
          </div>
          <div class="w-40 mx-auto cursor-pointer relative my-4">
            <button
              type="button"
              class="
                w-full
                bg-blue-700
                text-white
                p-2
                rounded-md
                focus:outline-none
              "
            >
              Change Photo
            </button>
            <input type="file" class="sr-only" />
          </div>
        </div>
      </div>
      <div class="col-span-12 md:col-span-8">
        <div class="grid grid-cols-2 gap-4">
          <div class="col-span-2 md:col-span-1">
            <label>Username</label>
            <input
              type="text"
              class="
                mt-1
                rounded-md
                w-full
                bg-gray-100
                cursor-not-allowed
                border border-gray-300
              "
              placeholder="Username"
              value="leafage"
              disabled
            />
          </div>
          <div class="col-span-2 md:col-span-1">
            <label>Nickname</label>
            <input
              type="text"
              class="mt-1 rounded-md w-full border border-gray-300"
              placeholder="Nickname"
              value="布吉岛"
              required
            />
          </div>
          <div class="col-span-2 md:col-span-1">
            <label>Birthday</label>
            <input
              type="date"
              class="w-full mt-1 rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div class="col-span-2 md:col-span-1">
            <label>Gender</label>
            <select class="rounded-md mt-1 w-full border border-gray-300">
              <option>请选择</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
          <div class="col-span-2">
            <label>Address</label>
            <textarea
              class="rounded-md w-full border border-gray-300 mt-1"
              placeholder="Adress"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import instance from "../../api";
import SERVER_URL from "../../api/request";

const user = ref();

const onSubmit = async () => {
  await instance
    .put(SERVER_URL.user.concat("/leafage"), user.value)
    .then((res) => {
      alert(res.data.username);
    });
};
</script>