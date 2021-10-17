<template>
  <form @submit.prevent class="bg-white rounded-md">
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
        <label for="code">Code</label>
        <input
          id="code"
          type="text"
          class="rounded-md w-full border border-gray-300 mt-1"
          placeholder="Code"
          v-model.trim="account.code"
          required
          autofocus
        />
      </div>
      <div class="col-span-12 lg:col-span-6">
        <label for="type">Type</label>
        <select
          id="type"
          class="rounded-md mt-1 w-full border border-gray-300"
          v-model="account.type"
        >
          <option value="undefined">请选择</option>
          <option value="B">Bank</option>
          <option value="A">Alipay</option>
          <option value="W">WechatPay</option>
        </select>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";

import instance from "../../api";
import SERVER_URL from "../../api/request";

const account = ref({});

const username = computed(() => {
  if (sessionStorage.getItem("user") != null) {
    return JSON.parse(sessionStorage.getItem("user") || '').username;
  }
  return '';
})

const fetch = async () => {
  if (username.value && username.value.length > 0) {
    await instance.get(SERVER_URL.account.concat("/", username.value)).then(res => {
      if (res.data.length > 0) {
        account.value = res.data
      }
    })
  }
}

const onSubmit = async () => {
  if (username.value && username.value.length > 0) {
    let data = { ...account.value, modifier: username.value }
    await instance
      .post(SERVER_URL.account, data)
      .then((res) => {
        account.value = res.data
      });
  }
};

onMounted(() => {
  fetch()
})
</script>