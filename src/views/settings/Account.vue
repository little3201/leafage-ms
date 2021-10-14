<template>
  <form @submit.prevent="onSubmit" class="bg-white rounded-md">
    <div class="flex items-center p-4 border-b border-gray-200">
      <h2 class="font-medium text-lg mr-auto">Account</h2>
      <button
        type="submit"
        @click="onSubmit"
        class="px-3 py-2 rounded-md bg-blue-700 text-white ml-auto focus:outline-none"
      >Save</button>
    </div>
    <div class="grid grid-cols-12 gap-4 p-4">
      <div class="col-span-12 lg:col-span-6">
        <label for="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          class="rounded-md w-full border border-gray-300 mt-1"
          placeholder="Last Name"
          value="Russell Crowe"
          autofocus
        />
      </div>
      <div class="col-span-12 lg:col-span-6">
        <label for="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          class="rounded-md w-full border border-gray-300 mt-1"
          placeholder="First Name"
          value="Russell Crowe"
        />
      </div>
      <div class="col-span-12 lg:col-span-6">
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          class="rounded-md w-full border border-gray-300 bg-gray-100 cursor-not-allowed mt-1"
          placeholder="Email"
          value="leafage@leafage.com"
          disabled
        />
      </div>
      <div class="col-span-12 lg:col-span-6">
        <label for="phoneNumber">Phone Number</label>
        <input
          id="phoneNumber"
          type="tel"
          class="rounded-md w-full border border-gray-300 mt-1"
          placeholder="Tel Number"
          value="65570828"
        />
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import instance from "../../api";
import SERVER_URL from "../../api/request";

const account = ref();

const onSubmit = async () => {
  await instance
    .put(SERVER_URL.account.concat("/leafage"), account.value)
    .then((res) => {
      alert(res.data.balance);
    });
};
</script>