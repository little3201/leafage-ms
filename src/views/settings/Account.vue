<template>
  <div class="shadow overflow-hidden sm:rounded-md">
    <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
      <fieldset>
        <legend class="text-base font-medium text-gray-900">Privileges</legend>
        <div class="mt-4 space-y-4">
          <div class="flex items-start justify-between">
            <div class="text-sm">
              <label for="comments" class="font-medium text-gray-700">Phone Number</label>
              <input
                id="comments"
                name="comments"
                type="text"
                class="border-gray-300 rounded cursor-pointer sr-only"
              />
              <p class="text-gray-500">187****3090</p>
            </div>
            <button type="button" class="text-gray-500 hover:text-blue-600">edit</button>
          </div>
          <div class="flex items-start justify-between">
            <div class="text-sm">
              <label for="candidates" class="font-medium text-gray-700">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                class="border-gray-300 rounded cursor-pointer sr-only"
              />
              <p class="text-gray-500">lea***e@leafage.top</p>
            </div>
            <button type="button" class="text-gray-500 hover:text-blue-600">edit</button>
          </div>
        </div>
      </fieldset>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

import instance from "../../api";
import { SERVER_URL, Account } from "../../api/request";

let account = ref<Account>({});

const username = ref(JSON.parse(sessionStorage.getItem("user") || '').username)

const fetch = async (): Promise<void> => {
  if (username.value && username.value.length > 0) {
    await instance.get(SERVER_URL.account.concat("/", username.value)).then(res =>
      account.value = res.data
    )
  }
}

const onSubmit = async (): Promise<void> => {
  if (username.value && username.value.length > 0) {
    let data = { ...account.value, modifier: username.value }
    await instance.post(SERVER_URL.account, data).then((res) =>
      account.value = res.data
    );
  }
};

onMounted(() => {
  fetch()
})
</script>