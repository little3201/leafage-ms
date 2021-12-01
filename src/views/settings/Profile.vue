<template>
  <form @submit.prevent class="bg-white rounded-md">
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
            <img class="rounded-md" alt="avatar" :src="user.avatar" />
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
              name="avatar"
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
              name="username"
              type="text"
              class="mt-1 rounded-md w-full bg-gray-100 cursor-not-allowed border border-gray-300"
              placeholder="Username"
              v-model="user.username"
              disabled
              minlength="4"
              maxlength="16"
            />
          </div>
          <div class="col-span-2 lg:col-span-1">
            <label for="nickname">Nickname</label>
            <input
              id="nickname"
              name="nickname"
              type="text"
              class="mt-1 rounded-md w-full border border-gray-300"
              placeholder="Nickname"
              v-model="user.nickname"
              required
              autofocus
              minlength="4"
              maxlength="16"
            />
          </div>
          <div class="col-span-2 lg:col-span-1">
            <label for="birthday">Birthday</label>
            <input
              id="birthday"
              name="birthday"
              type="date"
              class="w-full mt-1 rounded-md border-gray-300 shadow-sm"
              v-model="user.birthday"
            />
          </div>
          <div class="col-span-2 md:col-span-1">
            <label for="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              class="rounded-md mt-1 w-full border border-gray-300"
              v-model="user.gender"
            >
              <option value="undefined">请选择</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
          <div class="col-span-2 md:col-span-1">
            <label for="ethnicity">Ethnicity</label>
            <select
              id="ethnicity"
              name="ethnicity"
              class="rounded-md mt-1 w-full border border-gray-300"
              v-model="user.ethnicity"
            >
              <option value="undefined">请选择</option>
              <option value="H">汉族</option>
              <option value="Z">藏族</option>
            </select>
          </div>
          <div class="col-span-2 md:col-span-1">
            <label for="nation">Degree</label>
            <select
              id="degree"
              name="degree"
              class="rounded-md mt-1 w-full border border-gray-300"
              v-model="user.degree"
            >
              <option value="undefined">请选择</option>
              <option value="x">学士</option>
              <option value="s">硕士</option>
            </select>
          </div>
          <div class="col-span-2 md:col-span-1">
            <label for="nation">Marital Status</label>
            <select
              id="degree"
              name="degree"
              class="rounded-md mt-1 w-full border border-gray-300"
              v-model="user.degree"
            >
              <option value="undefined">请选择</option>
              <option value="y">已婚</option>
              <option value="w">未婚</option>
            </select>
          </div>
          <div class="col-span-2 md:col-span-1">
            <label for="country">Country</label>
            <select
              id="country"
              name="country"
              class="rounded-md w-full border border-gray-300 mt-1"
              v-model="user.country"
            >
              <option value="undefined">请选择</option>
              <option value="china">China</option>
              <option value="america">America</option>
            </select>
          </div>
          <div class="col-span-2 md:col-span-1">
            <label for="province">Province</label>
            <select
              id="province"
              name="province"
              class="rounded-md w-full border border-gray-300 mt-1"
              v-model="user.province"
            >
              <option value="undefined">请选择</option>
              <option value="shaanxi">Shaanxi</option>
              <option value="shanghai">Shanghai</option>
            </select>
          </div>
          <div class="col-span-2 md:col-span-1">
            <label for="city">City</label>
            <select
              id="city"
              name="city"
              class="rounded-md w-full border border-gray-300 mt-1"
              v-model="user.city"
            >
              <option value="undefined">请选择</option>
              <option value="xian">Xi'an</option>
              <option value="xianyang">Xianyang</option>
            </select>
          </div>
          <div class="col-span-2 md:col-span-1">
            <label for="area">Area</label>
            <select
              id="area"
              name="area"
              class="rounded-md w-full border border-gray-300 mt-1"
              v-model="user.area"
            >
              <option value="undefined">请选择</option>
              <option value="beilin">Beilin</option>
              <option value="gaoxin">Gaoxin</option>
            </select>
          </div>
          <div class="col-span-2">
            <label for="address">Address</label>
            <input
              id="address"
              name="address"
              type="text"
              class="rounded-md w-full border border-gray-300 mt-1"
              placeholder="Address"
              v-model="user.address"
            />
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

import instance from "../../api";
import SERVER_URL from "../../api/request";

let user = ref({});

const username = ref(JSON.parse(sessionStorage.getItem("user") || '').username)

const fetch = async () => {
  if (username.value && username.value.length > 0) {
    await instance.get(SERVER_URL.user.concat("/", username.value)).then(res => {
      user.value = res.data
    })
  }
}

const onSubmit = async () => {
  if (username.value && username.value.length > 0) {
    await instance
      .put(SERVER_URL.user.concat("/", username.value), user.value)
      .then(res => {
        user.value = res.data
      });
  }
};

onMounted(() => {
  fetch()
})
</script>