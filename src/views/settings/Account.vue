<template>
  <div class="shadow overflow-hidden bg-white sm:rounded-md">
    <div class="px-6 py-4 space-y-6 divide-y">
      <fieldset class="-mb-4"></fieldset>
      <fieldset>
        <legend class="font-medium text-gray-900 pr-4">Change nicknmae</legend>
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
          <div class="mr-20 ml-8 text-center relative group">
            <figure class="w-32 h-32 border rounded-full">
              <img alt="avatar" class="w-full h-full rounded-full" :src="account.avatar" />
            </figure>
            <button
              type="button"
              class="absolute top-2 right-2 text-sm group-hover:inline-flex group-hover:bg-red-600 group-hover:text-white rounded-full items-center hidden"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <use :xlink:href="'/svg/feather-sprite.svg#' + 'x'" />
              </svg>
              <span class="sr-only">Delete</span>
            </button>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend class="font-medium text-gray-900 pr-4">Change usernmae</legend>
        <p class="text-sm text-gray-500">Changing your username can have unintended side effects.</p>
        <div class="mt-4">
          <button
            id="del_account"
            name="del_account"
            type="button"
            class="border block border-gray-300 text-gray-600 hover:bg-blue-600 hover:text-white px-2 py-1 rounded-md"
          >Change usernmae</button>
          <span class="text-xs text-gray-400 inline-flex items-center">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="mr-1"
            >
              <use :xlink:href="'/svg/feather-sprite.svg#' + 'help-circle'" />
            </svg> Looking to manage account security settings? You can find them in the
            <RouterLink
              to="/settings/secret"
              class="text-blue-600 mx-1 hover:underline"
            >Account security</RouterLink>tab.
          </span>
        </div>
      </fieldset>
      <fieldset>
        <legend class="font-medium text-gray-900 pr-4">By Email</legend>
        <div class="mt-4 space-y-4">
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="comments"
                name="comments"
                type="checkbox"
                class="border-gray-300 rounded cursor-pointer"
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="comments" class="font-medium text-gray-700">Comments</label>
              <p class="text-gray-500">Get notified when someones posts a comment on a posting.</p>
            </div>
          </div>
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="candidates"
                name="candidates"
                type="checkbox"
                class="border-gray-300 rounded cursor-pointer"
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="candidates" class="font-medium text-gray-700">Candidates</label>
              <p class="text-gray-500">Get notified when a candidate applies for a job.</p>
            </div>
          </div>
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="offers"
                name="offers"
                type="checkbox"
                class="border-gray-300 rounded cursor-pointer"
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="offers" class="font-medium text-gray-700">Offers</label>
              <p class="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
            </div>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend class="font-medium text-gray-900 pr-4">Push Notifications</legend>
        <p class="text-sm text-gray-500">These are delivered via SMS to your mobile phone.</p>
        <div class="mt-4 space-y-4">
          <div class="flex items-center">
            <input
              id="push-everything"
              name="push-notifications"
              type="radio"
              class="border-gray-300 cursor-pointer"
            />
            <label
              for="push-everything"
              class="ml-3 block text-sm font-medium text-gray-700"
            >Everything</label>
          </div>
          <div class="flex items-center">
            <input
              id="push-email"
              name="push-notifications"
              type="radio"
              class="border-gray-300 cursor-pointer"
            />
            <label
              for="push-email"
              class="ml-3 block text-sm font-medium text-gray-700"
            >Same as email</label>
          </div>
          <div class="flex items-center">
            <input
              id="push-nothing"
              name="push-notifications"
              type="radio"
              class="border-gray-300 cursor-pointer"
            />
            <label
              for="push-nothing"
              class="ml-3 block text-sm font-medium text-gray-700"
            >No push notifications</label>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend class="font-medium text-gray-900 pr-4">Delete Account</legend>
        <p
          class="text-sm text-gray-500"
        >Once you delete your account, there is no going back. Please be certain.</p>
        <button
          @click="onSubmit"
          type="submit"
          class="text-red-600 border block mt-4 border-red-400 hover:bg-red-600 hover:text-white px-2 py-1 rounded-md"
        >Delete Account</button>
        <span
          class="text-xs text-gray-400"
        >Are you sure you don’t want to just downgrade your account to a FREE account? We won’t charge your payment information anymore.</span>
      </fieldset>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";

let isEdit = ref(false)

const account: Account = reactive(JSON.parse(sessionStorage.getItem("user") || ''))

const editAllow = () => {
  isEdit.value = !isEdit.value
  if (!isEdit.value) {
    alert('保存成功')
  }
}

/**
 * 提交
 */
const onSubmit = async (): Promise<void> => {
  if (account.username && account.username.length > 0) {
    // let data = { ...account.value, modifier: username.value }
    // await instance.delete(SERVER_URL.account, data).then((res) =>
    //   account.value = res.data
    // );
    alert("删除成功")
  }
};

onMounted(() => {
  // fetch()
})
</script>