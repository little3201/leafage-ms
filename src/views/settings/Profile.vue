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
            <div class="mr-20 ml-8 text-center">
              <figure v-if="account.avatar" class="w-32 h-32 border rounded-full relative group">
                <div
                  class="absolute w-full h-full rounded-full bg-black bg-opacity-50 hidden group-hover:flex items-center justify-center"
                >
                  <button
                    title="remove"
                    type="button"
                    @click="removeAvatar"
                    class="text-white focus:outline-none"
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
                <img alt="avatar" class="w-full h-full rounded-full" :src="account.avatar" />
              </figure>
              <div v-else class="w-32 h-32 border rounded-full flex justify-center items-center">
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
                      @click="uploadImage($event.target.files)"
                    />
                    <p class="text-xs text-gray-500">png, jpeg, jpg</p>
                    <p class="text-xs text-gray-500">up to 500KB</p>
                  </label>
                </div>
              </div>
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
                    <option value="undefined">---请选择---</option>
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
                    <option value="undefined">---请选择---</option>
                    <option value="01">小学</option>
                    <option value="02">初中</option>
                    <option value="03">高中</option>
                    <option value="04">中专</option>
                    <option value="05">大专</option>
                    <option value="06">本科</option>
                    <option value="07">硕士</option>
                    <option value="08">博士</option>
                  </select>
                </div>
              </div>
              <div class="flex space-x-4 text-sm">
                <div>
                  <label for="ethnicity" class="font-medium text-gray-700">Ethnicity</label>
                  <select
                    id="ethnicity"
                    name="ethnicity"
                    class="border-gray-300 py-1 mt-1 rounded-md w-full"
                    v-model="user.ethnicity"
                  >
                    <option value="undefined">---请选择---</option>
                    <option value="01">汉族</option>
                    <option value="02">蒙古族</option>
                    <option value="03">回族</option>
                    <option value="04">藏族</option>
                    <option value="05">维吾尔族</option>
                    <option value="06">苗族</option>
                    <option value="07">彝族</option>
                    <option value="08">壮族</option>
                    <option value="09">布依族</option>
                    <option value="10">朝鲜族</option>
                    <option value="11">满族</option>
                    <option value="12">侗族</option>
                    <option value="13">瑶族</option>
                    <option value="14">白族</option>
                    <option value="15">土家族</option>
                    <option value="16">哈尼族</option>
                    <option value="17">哈萨克族</option>
                    <option value="18">傣族</option>
                    <option value="19">黎族</option>
                    <option value="20">傈僳族</option>
                    <option value="21">佤族</option>
                    <option value="22">畲族</option>
                    <option value="23">高山族</option>
                    <option value="24">拉祜族</option>
                    <option value="25">水族</option>
                    <option value="26">东乡族</option>
                    <option value="27">纳西族</option>
                    <option value="28">景颇族</option>
                    <option value="29">柯尔克孜族</option>
                    <option value="30">土族</option>
                    <option value="31">达斡尔族</option>
                    <option value="32">仫佬族</option>
                    <option value="33">羌族</option>
                    <option value="34">布朗族</option>
                    <option value="35">撒拉族</option>
                    <option value="36">毛难族</option>
                    <option value="37">仡佬族</option>
                    <option value="38">锡伯族</option>
                    <option value="39">阿昌族</option>
                    <option value="40">普米族</option>
                    <option value="41">塔吉克族</option>
                    <option value="42">怒族</option>
                    <option value="43">乌孜别克族</option>
                    <option value="44">俄罗斯族</option>
                    <option value="45">鄂温克族</option>
                    <option value="46">崩龙族</option>
                    <option value="47">保安族</option>
                    <option value="48">裕固族</option>
                    <option value="49">京族</option>
                    <option value="50">塔塔尔族</option>
                    <option value="51">独龙族</option>
                    <option value="52">鄂伦春族</option>
                    <option value="53">赫哲族</option>
                    <option value="54">门巴族</option>
                    <option value="55">珞巴族</option>
                    <option value="56">基诺族</option>
                  </select>
                </div>
                <div class="w-full">
                  <label for="hobbies" class="font-medium text-gray-700">Hobbies</label>
                  <input
                    id="hobbies"
                    name="hobbies"
                    type="text"
                    class="border-gray-300 py-1 mt-1 rounded-md w-full"
                    v-model="user.hobbies"
                  />
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

import { instance, SERVER_URL } from "@/api";
import type { User, Account } from "@/api/request.type";

import { uploadFile } from "@/plugins/upload";

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
    await instance
      .put(SERVER_URL.user.concat("/", account.username), user.value)
      .then(res => {
        user.value = res.data
      });
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
const uploadImage = (files: Array<File>): void => {
  if (files[0]) {
    uploadFile(files[0]).subscribe({
      complete: (e: any) => {
        account.avatar = "https://cdn.leafage.top/" + e.key
      },
    });
  }
};
</script>