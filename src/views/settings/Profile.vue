<template>
  <form @submit.prevent="onSumbit" class="bg-white rounded-md">
    <div class="flex items-center p-4 border-b border-gray-200">
      <h2 class="font-medium text-lg mr-auto">Profile</h2>
      <button
        type="submit"
        @click="onSubmit"
        class="px-3 py-2 rounded-md bg-blue-700 text-white focus:outline-none"
      >Save</button>
    </div>
    <div class="grid grid-cols-12 gap-4 p-4">
      <div class="col-span-12 lg:col-span-4">
        <div class="border border-gray-200 rounded-md p-4">
          <div class="w-40 h-40 relative mx-auto">
            <img
              class="rounded-md"
              alt="Midone Tailwind HTML Admin Template"
              src="/images/avatar.jpg"
            />
            <span
              title="Remove this photo?"
              class="cursor-pointer tooltip w-5 h-5 inline-flex items-center justify-center absolute rounded-full text-white bg-red-600 right-0 top-0 -mr-2 -mt-2"
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
          <div class="w-40 mx-auto relative my-4">
            <label
              for="avatar-upload"
              class="bg-blue-700 flex justify-center text-white py-2 rounded-md cursor-pointer"
            >Change Photo</label>
            <input
              id="avatar-upload"
              type="file"
              class="sr-only"
              accept="image/png, image/jpeg, image/jpg"
            />
          </div>
        </div>
      </div>
      <div class="col-span-12 lg:col-span-8">
        <div class="grid grid-cols-2 gap-4">
          <div class="col-span-2 lg:col-span-1">
            <label for="username">Username</label>
            <input
              id="username"
              type="text"
              class="mt-1 rounded-md w-full bg-gray-100 cursor-not-allowed border border-gray-300"
              placeholder="Username"
              value="leafage"
              disabled
            />
          </div>
          <div class="col-span-2 lg:col-span-1">
            <label for="nickname">Nickname</label>
            <input
              id="nickname"
              type="text"
              class="mt-1 rounded-md w-full border border-gray-300"
              placeholder="Nickname"
              value="布吉岛"
              required
              autofocus
            />
          </div>
          <div class="col-span-2 lg:col-span-1">
            <label for="birthday">Birthday</label>
            <input
              id="birthday"
              type="date"
              class="w-full mt-1 rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div class="col-span-2 md:col-span-1">
            <label for="gender">Gender</label>
            <select id="gender" class="rounded-md mt-1 w-full border border-gray-300">
              <option>请选择</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
          <div class="col-span-2">
            <label for="address">Address</label>
            <textarea
              id="address"
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