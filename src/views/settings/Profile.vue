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
                name="nickname"
                aria-label="nickname"
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
                  name="remove-avatar"
                  aria-label="remove-avatar"
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
                width="126"
                height="126"
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
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";

import { instance, SERVER_URL } from "@/api";
import type { User, Dictionary } from "@/api/request.type";

import { uploadFile } from "@/composables/upload";

let isEdit = ref(false)

let user = ref<User>({
  username: '',
  nickname: '',
  avatar: '',
  enabled: true,
  accountExpiresAt: new Date().toDateString(),
  accountLocked: true,
  credentialsExpiresAt: new Date().toDateString()
})
let nationalities = ref<Array<Dictionary>>([])
let degrees = ref<Array<Dictionary>>([])

let account: User = reactive(JSON.parse(sessionStorage.getItem("user") || ''))

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
    await instance.put(SERVER_URL.user.concat('/', account.username), account).then(res => {
      account = res.data
      sessionStorage.setItem("user", JSON.stringify(res.data))
    })
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