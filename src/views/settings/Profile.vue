<template>
  <form @submit.prevent>
    <div class="shadow overflow-hidden bg-white sm:rounded-md">
      <div class="px-6 py-4 space-y-6 divide-y">
        <fieldset class="-mb-4"></fieldset>
        <fieldset>
          <legend class="font-medium text-gray-900 pr-4">Public email</legend>
          <div class="mt-4 text-sm">
            <label for="email" class="font-medium text-gray-700">Public email</label>
            <div class="flex items-center space-x-4 mt-1">
              <input
                id="email"
                name="email"
                type="email"
                class="block border-gray-300 py-1 rounded-md"
                v-model="user.email"
                :disabled="!isEdit"
              />
              <button
                type="button"
                @click="editAllow"
                class="text-blue-600 hover:underline"
              >{{ isEdit ? 'Save' : 'Edit' }}</button>
            </div>
            <span
              class="text-xs text-gray-400"
            >You can manage verified email addresses in your email settings.</span>
          </div>
        </fieldset>
        <fieldset>
          <legend class="font-medium text-gray-900 pr-4">Public profile</legend>
          <form @submit.prevent>
            <div class="mt-4 space-y-2 max-w-md">
              <div class="flex space-x-4 text-sm">
                <div>
                  <label for="firstname" class="font-medium text-gray-700">Firstname</label>
                  <input
                    id="firstname"
                    name="firstname"
                    type="text"
                    class="border-gray-300 py-1 mt-1 rounded-md w-full"
                v-model="user.firstname"
                  />
                </div>
                <div>
                  <label for="lastname" class="font-medium text-gray-700">Lastname</label>
                  <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    class="border-gray-300 py-1 mt-1 rounded-md w-full"
                v-model="user.lastname"
                  />
                </div>
              </div>
              <div class="flex space-x-4 text-sm">
                <div>
                  <label for="gender" class="font-medium text-gray-700">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    class="border-gray-300 py-1 mt-1 rounded-md w-full"
                v-model="user.gender"
                  >
                    <option value="F">Female</option>
                    <option value="M">Male</option>
                  </select>
                </div>
                <div>
                  <label for="married" class="font-medium text-gray-700">Married</label>
                  <select
                    id="married"
                    name="married"
                    class="border-gray-300 py-1 mt-1 rounded-md w-full"
                  >
                    <option>Single</option>
                    <option>Married</option>
                  </select>
                </div>
                <div>
                  <label for="education" class="font-medium text-gray-700">Education</label>
                  <select
                    id="education"
                    name="education"
                    class="border-gray-300 py-1 mt-1 rounded-md w-full"
                  >
                    <option>高中</option>
                    <option>大学本科</option>
                  </select>
                </div>
              </div>
              <div class="text-sm">
                <label for="bio" class="font-medium text-gray-700">Bio</label>
                <textarea id="bio" name="bio" class="border-gray-300 py-1 mt-1 rounded-md w-full" 
                v-model="user.description" />
                <span
                  class="text-xs text-gray-400"
                >You can @mention other users and organizations to link to them.</span>
              </div>
              <div>
                <button
                  @click="onSubmit"
                  type="submit"
                  class="border-blue-400 text-blue-600 hover:bg-blue-600 hover:text-white block border px-2 py-1 rounded-md"
                >Update profile</button>
              </div>
            </div>
          </form>
        </fieldset>
        <fieldset>
          <legend class="font-medium text-gray-900 pr-4">Public address</legend>
          <form @submit.prevent>
            <div class="mt-4 space-y-2 max-w-xl">
              <div class="flex space-x-4 text-sm">
                <div>
                  <label for="country" class="font-medium text-gray-700">Country</label>
                  <select
                    id="country"
                    name="country"
                    class="border-gray-300 py-1 mt-1 rounded-md w-full"
                  >
                    <option>China</option>
                    <option>America</option>
                  </select>
                </div>
                <div>
                  <label for="province" class="font-medium text-gray-700">Province</label>
                  <select
                    id="province"
                    name="province"
                    class="border-gray-300 py-1 mt-1 rounded-md w-full"
                  >
                    <option>Shaanxi</option>
                    <option>Beijing</option>
                  </select>
                </div>
                <div>
                  <label for="city" class="font-medium text-gray-700">City</label>
                  <select id="city" name="city" class="border-gray-300 py-1 mt-1 rounded-md w-full">
                    <option>Xian</option>
                    <option>Xianyang</option>
                  </select>
                </div>
                <div>
                  <label for="region" class="font-medium text-gray-700">Region</label>
                  <select
                    id="region"
                    name="region"
                    class="border-gray-300 py-1 mt-1 rounded-md w-full"
                  >
                    <option>莲湖区</option>
                    <option>未央区</option>
                  </select>
                </div>
              </div>
              <div class="flex space-x-4 text-sm">
                <div>
                  <label for="street" class="font-medium text-gray-700">Street</label>
                  <select
                    id="street"
                    name="street"
                    class="border-gray-300 py-1 mt-1 rounded-md w-full"
                  >
                    <option>北大街</option>
                    <option>南大街</option>
                  </select>
                </div>
                <div class="w-full">
                  <label for="details" class="font-medium text-gray-700">Details</label>
                  <input
                    id="details"
                    name="details"
                    type="text"
                    class="border-gray-300 py-1 mt-1 rounded-md w-full"
                  />
                </div>
              </div>
              <div>
                <span
                  class="text-xs text-gray-400"
                >All of the fields on this page are optional and can be deleted at any time</span>
                <button
                  @click.stop="submitAddress"
                  type="submit"
                  class="border-blue-400 text-blue-600 hover:bg-blue-600 hover:text-white block border px-2 py-1 rounded-md"
                >Update address</button>
              </div>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

import instance from "@/api";
import { SERVER_URL, User } from "@/api/request";

let user = ref<User>({});
let isEdit = ref(false)

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

const editAllow = () => {
  isEdit.value = !isEdit.value
  if (!isEdit.value) {
    alert('保存成功')
  }
}

const onSubmit = async (): Promise<void> => {
  if (username.value && username.value.length > 0) {
    // await instance
    //   .put(SERVER_URL.user.concat("/", username.value), user.value)
    //   .then(res => {
    //     user.value = res.data
    //   });
    alert("修改成功")
  }
};
/**
 * 表单提交
 */
const submitAddress = async (): Promise<void> => {
  if (username.value && username.value.length > 0) {
    alert("提交成功")
  }
};

onMounted(() => {
  fetch()
})
</script>