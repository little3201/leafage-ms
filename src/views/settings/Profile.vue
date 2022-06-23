<template>
  <form @submit.prevent>
    <div class="divide-y">
      <fieldset>
        <legend class=" sr-only" />
      </fieldset>
      <fieldset class="my-4">
        <legend class="font-medium text-gray-900 pr-4">
          Change nickname
        </legend>
        <p class="text-sm text-gray-500">
          Changing your username can have unintended side effects.
        </p>
        <div class="flex">
          <div class="mt-4 text-sm">
            <label
              for="nickname"
              class="font-medium text-gray-700"
            >Nicknmae</label>
            <div class="flex items-center space-x-4 mt-1">
              <input
                id="nickname"
                v-model="account.nickname"
                name="nickname"
                type="text"
                class="block border-gray-300 py-1 rounded-md"
                :disabled="!isEdit"
                aria-label="nickname"
              >
              <button
                type="button"
                class="text-blue-600 hover:underline"
                @click="editAllow"
              >
                {{
                  isEdit ? 'Save' : 'Edit'
                }}
              </button>
            </div>
            <span class="text-xs text-gray-400">Your name may appear around GitHub where you contribute or are
              mentioned. You can remove it at any time.</span>
          </div>
          <div class="mr-20 ml-8 text-center">
            <figure
              v-if="account.avatar"
              class="w-32 h-32 border rounded-full relative group"
            >
              <div
                class="absolute w-full h-full rounded-full bg-black bg-opacity-50 hidden group-hover:flex items-center justify-center"
              >
                <button
                  title="remove"
                  type="button"
                  class="text-white focus:outline-none"
                  @click="removeAvatar"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <use :xlink:href="'/svg/feather-sprite.svg#' + 'trash-2'" />
                  </svg>
                </button>
              </div>
              <img
                alt="avatar"
                class="w-full h-full rounded-full"
                :src="account.avatar"
              >
            </figure>
            <div
              v-else
              class="w-32 h-32 border rounded-full flex justify-center items-center"
            >
              <div class="text-gray-600 text-center">
                <label
                  for="avatar-upload"
                  class="relative cursor-pointer bg-white rounded-md text-gray-400 hover:text-blue-600"
                >
                  <svg
                    class="mx-auto h-8 w-8"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <input
                    id="avatar-upload"
                    name="avatar"
                    type="file"
                    class="sr-only"
                    accept="image/png, image/jpeg, image/jpg"
                    aria-label="avatar"
                    @click="uploadImage($event)"
                  >
                  <p class="text-xs text-gray-500">png, jpeg, jpg</p>
                  <p class="text-xs text-gray-500">up to 500KB</p>
                </label>
              </div>
            </div>
          </div>
        </div>
      </fieldset>

      <fieldset class="my-4">
        <legend class="font-medium text-gray-900 pr-4">
          Public profile
        </legend>
        <form @submit.prevent>
          <div class="mt-4 space-y-2 max-w-lg">
            <div class="flex space-x-4 text-sm">
              <div>
                <label
                  for="firstname"
                  class="font-medium text-gray-700"
                >Firstname</label>
                <input
                  id="firstname"
                  v-model="user.firstname"
                  name="firstname"
                  type="text"
                  class="border-gray-300 py-1 mt-1 rounded-md w-full"
                  aria-label="firstname"
                >
              </div>
              <div>
                <label
                  for="lastname"
                  class="font-medium text-gray-700"
                >Lastname</label>
                <input
                  id="lastname"
                  v-model="user.lastname"
                  name="lastname"
                  type="text"
                  class="border-gray-300 py-1 mt-1 rounded-md w-full"
                  aria-label="lastname"
                >
              </div>
            </div>
            <div class="flex space-x-4 text-sm">
              <div>
                <label
                  for="gender"
                  class="font-medium text-gray-700"
                >Gender</label>
                <select
                  id="gender"
                  v-model="user.gender"
                  name="gender"
                  class="border-gray-300 py-1 mt-1 rounded-md w-full"
                  aria-label="gender"
                >
                  <option selected>
                    ---{{ $t('select') }}---
                  </option>
                  <option value="F">
                    Female
                  </option>
                  <option value="M">
                    Male
                  </option>
                </select>
              </div>
              <div>
                <label
                  for="birthday"
                  class="font-medium text-gray-700"
                >Birthday</label>
                <input
                  id="birthday"
                  v-model="user.birthday"
                  name="birthday"
                  type="date"
                  class="border-gray-300 py-1 mt-1 rounded-md w-full"
                  aria-label="birthday"
                >
              </div>
              <div>
                <label
                  for="degree"
                  class="font-medium text-gray-700"
                >Degree</label>
                <select
                  id="degree"
                  v-model="user.degree"
                  name="degree"
                  class="border-gray-300 py-1 mt-1 rounded-md w-full"
                  aria-label="degree"
                >
                  <option selected>
                    ---{{ $t('select') }}---
                  </option>
                  <option
                    v-for="degree in degrees"
                    :key="degree.code"
                    :value="degree.code"
                  >
                    {{ degree.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="flex space-x-4 text-sm">
              <div>
                <label
                  for="nationality"
                  class="font-medium text-gray-700"
                >Nationality</label>
                <select
                  id="nationality"
                  v-model="user.nationality"
                  name="nationality"
                  class="border-gray-300 py-1 mt-1 rounded-md w-full"
                  aria-label="nationality"
                >
                  <option selected>
                    ---{{ $t('select') }}---
                  </option>
                  <option
                    v-for="nationality in nationalities"
                    :key="nationality.code"
                    :value="nationality.code"
                  >
                    {{ nationality.name }}
                  </option>
                </select>
              </div>
              <div class="w-full">
                <label
                  for="hobbies"
                  class="font-medium text-gray-700"
                >Hobbies</label>
                <input
                  id="hobbies"
                  v-model="user.hobbies"
                  name="hobbies"
                  type="text"
                  class="border-gray-300 py-1 mt-1 rounded-md w-full"
                  aria-label="hobbies"
                >
              </div>
            </div>
            <div class="flex space-x-4 text-sm">
              <div>
                <label
                  for="company"
                  class="font-medium text-gray-700"
                >Company</label>
                <input
                  id="company"
                  v-model="user.company"
                  name="company"
                  type="text"
                  class="border-gray-300 py-1 mt-1 rounded-md w-full"
                  aria-label="company"
                >
              </div>
              <div>
                <label
                  for="position"
                  class="font-medium text-gray-700"
                >Position</label>
                <input
                  id="position"
                  v-model="user.position"
                  name="position"
                  type="text"
                  class="border-gray-300 py-1 mt-1 rounded-md w-full"
                  aria-label="position"
                >
              </div>
            </div>
            <div class="flex space-x-4 text-sm">
              <div class="w-full">
                <label for="description">{{ $t('description') }}</label>
                <textarea
                  id="description"
                  v-model.trim="user.description"
                  aria-label="description"
                  name="description"
                  class="mt-1 w-full rounded-md border-gray-300"
                  :placeholder="$t('description')"
                />
              </div>
            </div>
            <div>
              <span class="text-xs text-gray-400">All of the fields on this page are optional and can be deleted at any
                time</span>
              <button
                type="submit"
                class="mt-1 px-2 py-1 rounded-md bg-blue-600  text-white hover:bg-blue-700 focus:outline-none active:cursor-wait"
                @click.stop="onSubmit"
              >
                Update
                profile
              </button>
            </div>
          </div>
        </form>
      </fieldset>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";

import { instance, SERVER_URL } from "@/api";
import type { User, Account, Dictionary } from "@/api/request.type";

import { uploadFile } from "@/plugins/upload";

let isEdit = ref(false)

let user = ref<User>({
  username: '',
  firstname: '',
  lastname: '',
  gender: '',
  phone: 0,
  email: '',
  birthday: new Date(),
  nationality: '',
  degree: '',
  hobbies: '',
  company: '',
  position: '',
  description: ''
})
let nationalities = ref<Array<Dictionary>>([])
let degrees = ref<Array<Dictionary>>([])

let account: Account = reactive(JSON.parse(sessionStorage.getItem("account") || ''))

onMounted(() => {
  fetch()
  retrieveDict("Degree").then(res => degrees.value = res.data)
  retrieveDict("Nationality").then(res => nationalities.value = res.data)
})
/**
 * 查询
 */
const fetch = async (): Promise<void> => {
  if (account.username && account.username.length > 0) {
    await instance.get(SERVER_URL.user.concat("/", account.username)).then(res => user.value = res.data)
  }
}
/**
 * 编辑
 */
const editAllow = async () => {
  isEdit.value = !isEdit.value
  if (!isEdit.value) {
    await instance.put(SERVER_URL.account.concat('/', account.username), account).then(res => {
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
    await instance.put(SERVER_URL.user.concat("/", account.username), user.value)
      .then(res => user.value = res.data);
  }
}
/**
 * 删除头像
 */
const removeAvatar = () => {
  account.avatar = ''
}
/**
 * 上传文件
 * @param files 文件
 */
const uploadImage = (event: any): void => {
  if (event && event.target && event.target.files) {
    let files: Array<File> = event.target.files
    if (files[0]) {
      uploadFile(files[0]).subscribe({
        complete: (e: any) => {
          account.avatar = "https://cdn.leafage.top/" + e.key
        },
      });
    }
  }
}
/**
 * 查询字典数据
 * @param item 字典项
 */
const retrieveDict = async (item: string) => {
  return instance.get(SERVER_URL.dictionary.concat("/", item, "/lower"))
}
</script>