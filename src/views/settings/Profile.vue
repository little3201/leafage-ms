<template>
  <form @submit.prevent>
    <div class="shadow overflow-hidden bg-white sm:rounded-md">
      <div class="px-6 py-4">
        <div class="grid grid-cols-6 gap-4">
          <div class="col-span-6 sm:col-span-3">
            <label for="first-name">First name</label>
            <input
              type="text"
              name="first-name"
              id="first-name"
              autocomplete="given-name"
              v-model.trim="user.firstname"
              class="mt-1 w-full block shadow-sm border-gray-300 rounded-md"
            />
          </div>

          <div class="col-span-6 sm:col-span-3">
            <label for="last-name">Last name</label>
            <input
              type="text"
              name="last-name"
              id="last-name"
              autocomplete="family-name"
              v-model.trim="user.lastname"
              class="mt-1 w-full block shadow-sm border-gray-300 rounded-md"
            />
          </div>

          <div class="col-span-6 sm:col-span-3 lg:col-span-2">
            <label for="birthday">Birthday</label>
            <input
              id="birthday"
              name="birthday"
              type="date"
              v-model.trim="user.birthday"
              class="mt-1 w-full block shadow-sm border-gray-300 rounded-md"
            />
          </div>

          <div class="col-span-6 sm:col-span-3 lg:col-span-2">
            <label for="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              autocomplete="gender-name"
              v-model="user.gender"
              class="mt-1 w-full block shadow-sm border-gray-300 rounded-md"
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>

          <div class="col-span-6 sm:col-span-3 lg:col-span-2">
            <label for="education">Education</label>
            <select
              id="education"
              name="education"
              autocomplete="education-name"
              v-model="user.education"
              class="mt-1 w-full block shadow-sm border-gray-300 rounded-md"
            >
              <option>1</option>
              <option>2</option>
            </select>
          </div>

          <div class="col-span-6 sm:col-span-3">
            <label for="country">Country</label>
            <select
              id="country"
              name="country"
              autocomplete="country-name"
              v-model="user.country"
              class="mt-1 w-full block shadow-sm border-gray-300 rounded-md"
            >
              <option>United States</option>
              <option>Canada</option>
              <option>Mexico</option>
            </select>
          </div>

          <div class="col-span-6 sm:col-span-3">
            <label for="ethnicity">Ethnicity</label>
            <select
              id="ethnicity"
              name="ethnicity"
              autocomplete="ethnicity-name"
              v-model="user.ethnicity"
              class="mt-1 w-full block shadow-sm border-gray-300 rounded-md"
            >
              <option>1</option>
              <option>2</option>
            </select>
          </div>

          <div class="col-span-6 sm:col-span-3 lg:col-span-2">
            <label for="privince">State / Province</label>
            <select
              id="province"
              name="province"
              autocomplete="province-name"
              v-model="user.province"
              class="mt-1 w-full block shadow-sm border-gray-300 rounded-md"
            >
              <option>1</option>
              <option>2</option>
            </select>
          </div>

          <div class="col-span-6 sm:col-span-6 lg:col-span-2">
            <label for="city">City</label>
            <select
              id="city"
              name="city"
              autocomplete="city-name"
              v-model="user.city"
              class="mt-1 w-full block shadow-sm border-gray-300 rounded-md"
            >
              <option>1</option>
              <option>2</option>
            </select>
          </div>

          <div class="col-span-6 sm:col-span-6 lg:col-span-2">
            <label for="region">Region</label>
            <select
              id="region"
              name="region"
              autocomplete="region-name"
              v-model="user.region"
              class="mt-1 w-full block shadow-sm border-gray-300 rounded-md"
            >
              <option>1</option>
              <option>2</option>
            </select>
          </div>

          <div class="col-span-6">
            <label for="street-address">Street address</label>
            <input
              type="text"
              name="street-address"
              id="street-address"
              autocomplete="street-address"
              v-model.trim="user.address"
              class="mt-1 w-full block shadow-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
      <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <button
          type="submit"
          class="inline-flex justify-center py-2 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
        >Save</button>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

import instance from "@/api";
import { SERVER_URL, User } from "@/api/request";

let user = ref<User>({});

const username = ref(JSON.parse(sessionStorage.getItem("user") || '').username)

/**
 * 查询
 */
const fetch = async (): Promise<void> => {
  if (username.value && username.value.length > 0) {
    await instance.get(SERVER_URL.user.concat("/", username.value)).then(res => {
      user.value = res.data
    })
  }
}

/**
 * 表单提交
 */
const onSubmit = async (): Promise<void> => {
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