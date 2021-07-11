<template>
  <form @submit.prevent="onSumbit" class="bg-white rounded-md">
    <div class="flex items-center p-4 border-b border-gray-200">
      <h2 class="font-medium text-lg mr-auto">Account Information</h2>
      <button
        type="submit"
        @click="onSubmit"
        class="p-2 rounded-md bg-blue-700 text-white ml-auto focus:outline-none"
      >
        Save
      </button>
    </div>
    <div class="grid grid-cols-12 gap-4 p-4">
      <div class="col-span-12 md:col-span-6">
        <label>Last Name</label>
        <input
          type="text"
          class="rounded-md w-full border border-gray-300 mt-1"
          placeholder="Last Name"
          value="Russell Crowe"
          disabled
        />
      </div>
      <div class="col-span-12 md:col-span-6">
        <label>First Name</label>
        <input
          type="text"
          class="rounded-md w-full border border-gray-300 mt-1"
          placeholder="First Name"
          value="Russell Crowe"
          disabled
        />
      </div>
      <div class="col-span-12 md:col-span-6">
        <label>Email</label>
        <input
          type="email"
          class="
            rounded-md
            w-full
            border border-gray-300
            bg-gray-100
            cursor-not-allowed
            mt-1
          "
          placeholder="Email"
          value="leafage@leafage.com"
          disabled
        />
      </div>
      <div class="col-span-12 md:col-span-6">
        <label>Phone Number</label>
        <input
          type="tel"
          class="rounded-md w-full border border-gray-300 mt-1"
          placeholder="Phone Number"
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