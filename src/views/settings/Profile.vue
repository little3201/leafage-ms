<template>
  <form @submit.prevent>
    <div class="shadow overflow-hidden bg-white sm:rounded-md">
      <div class="px-6 py-4 space-y-6 divide-y">
        <fieldset class="-mb-4"></fieldset>
        <fieldset>
          <legend class="font-medium text-gray-900 pr-4">Change nickname</legend>
          <p class="text-sm text-gray-500">Changing your username can have unintended side effects.</p>
          <div class="flex">
            <div class="mt-4 text-sm">
              <label for="password" class="font-medium text-gray-700">Nicknmae</label>
              <div class="flex items-center space-x-4 mt-1">
                <input
                  id="password"
                  name="password"
                  type="text"
                  class="block border-gray-300 py-1 rounded-md"
                  v-model="account.nickname"
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
              >Your name may appear around GitHub where you contribute or are mentioned. You can remove it at any time.</span>
            </div>
            <div class="mr-20 ml-8 text-center relative">
              <figure class="w-32 h-32 border rounded-full">
                <img alt="avatar" class="w-full h-full rounded-full" :src="account.avatar" />
              </figure>
              <button
                title="delete"
                type="button"
                class="absolute top-2.5 right-2.5 inline-flex bg-red-600 text-white rounded-full items-center"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <use :xlink:href="'/svg/feather-sprite.svg#' + 'x'" />
                </svg>
              </button>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend class="font-medium text-gray-900 pr-4">Public profile</legend>
          <form @submit.prevent>
            <div class="mt-4 space-y-2 max-w-lg">
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
                    <option value="undefined">请选择</option>
                    <option value="F">Female</option>
                    <option value="M">Male</option>
                  </select>
                </div>
                <div>
                  <label for="birthday" class="font-medium text-gray-700">Birthday</label>
                  <input
                    id="birthday"
                    name="birthday"
                    type="date"
                    class="border-gray-300 py-1 mt-1 rounded-md w-full"
                    v-model="user.birthday"
                  />
                </div>
                <div>
                  <label for="degree" class="font-medium text-gray-700">Degree</label>
                  <select
                    id="degree"
                    name="degree"
                    class="border-gray-300 py-1 mt-1 rounded-md w-full"
                    v-model="user.degree"
                  >
                    <option value="undefined">请选择</option>
                    <option value="A">小学</option>
                    <option value="B">初中</option>
                    <option value="C">高中</option>
                    <option value="D">中专</option>
                    <option value="E">大专</option>
                    <option value="F">本科</option>
                    <option value="G">硕士</option>
                    <option value="H">博士</option>
                  </select>
                </div>
              </div>
              <div class="flex space-x-4 text-sm">
                <div>
                  <label for="company" class="font-medium text-gray-700">Company</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    class="border-gray-300 py-1 mt-1 rounded-md w-full"
                    v-model="user.company"
                  />
                </div>
                <div>
                  <label for="position" class="font-medium text-gray-700">Position</label>
                  <input
                    id="position"
                    name="position"
                    type="text"
                    class="border-gray-300 py-1 mt-1 rounded-md w-full"
                    v-model="user.position"
                  />
                </div>
              </div>
              <div>
                <span
                  class="text-xs text-gray-400"
                >All of the fields on this page are optional and can be deleted at any time</span>
                <button
                  @click.stop="onSubmit"
                  type="submit"
                  class="border-blue-400 text-blue-600 hover:bg-blue-600 hover:text-white block border px-2 py-1 rounded-md"
                >Update profile</button>
              </div>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";

import instance from "@/api";
import { SERVER_URL, User, Account } from "@/api/request";

let user = ref<User>({})

let isEdit = ref(false)

let account: Account = reactive(JSON.parse(sessionStorage.getItem("account") || ''))

onMounted(() => {
  fetch()
})
/**
 * 查询
 */
const fetch = async (): Promise<void> => {
  if (account.username && account.username.length > 0) {
    await instance.get(SERVER_URL.user.concat("/", account.username)).then(res => {
      user.value = res.data
    })
  }
}

const editAllow = async () => {
  isEdit.value = !isEdit.value
  if (!isEdit.value) {
    await instance.put(SERVER_URL.account.concat('/', account.username), account).then((res) => {
      account = res.data
      sessionStorage.setItem("account", JSON.stringify(res.data))
    })
  }
}
/**
 * 表单提交
 */
const onSubmit = async (): Promise<void> => {
  if (account.username && account.username.length > 0) {
    // await instance
    //   .put(SERVER_URL.user.concat("/", username.value), user.value)
    //   .then(res => {
    //     user.value = res.data
    //   });
    alert("修改成功")
  }
}

</script>