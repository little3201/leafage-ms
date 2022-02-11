<template>
  <form @submit.prevent>
    <div class="shadow overflow-hidden bg-white sm:rounded-md">
      <div class="px-6 py-4 space-y-6 divide-y">
        <fieldset class="-mb-4"></fieldset>
        <fieldset>
          <legend class="font-medium text-gray-900 pr-4">Public email</legend>
          <div class="mt-4 text-sm max-w-sm">
            <label for="email" class="font-medium text-gray-700">Public email</label>
            <div class="flex items-center space-x-4 mt-1">
              <input
                id="email"
                name="email"
                type="email"
                class="w-full border-gray-300 py-1 rounded-md"
                v-model="user.email"
                :disabled="!editEmail"
              />
              <button
                type="button"
                @click="editAllow(true)"
                class="text-blue-600 hover:underline"
              >{{ editEmail ? 'Save' : 'Edit' }}</button>
            </div>
            <span
              class="text-xs text-gray-400"
            >You can manage verified email addresses in your email settings.</span>
          </div>
        </fieldset>
        <!-- <fieldset>
          <legend class="font-medium text-gray-900 pr-4">Phone number</legend>
          <div class="mt-4 text-sm max-w-sm">
            <label for="phone" class="font-medium text-gray-700">Phone number</label>
            <div class="flex items-center space-x-4 mt-1">
              <input
                id="phone"
                name="phone"
                type="number"
                class="w-full border-gray-300 py-1 rounded-md"
                v-model="user.phone"
                :disabled="!editPhone"
              />
              <button
                type="button"
                @click="editAllow(false)"
                class="text-blue-600 hover:underline"
              >{{ editPhone ? 'Save' : 'Edit' }}</button>
            </div>
            <span
              class="text-xs text-gray-400"
            >You can manage verified phone number in your phone number settings.</span>
          </div>
        </fieldset>-->
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
                  <label for="education" class="font-medium text-gray-700">Education</label>
                  <select
                    id="education"
                    name="education"
                    class="border-gray-300 py-1 mt-1 rounded-md w-full"
                    v-model="user.education"
                  >
                    <option>本科</option>
                  </select>
                </div>
              </div>
              <!-- <div class="flex space-x-4 text-sm">
                <div>
                  <label for="ethnicity" class="font-medium text-gray-700">Ethnicity</label>
                  <select
                    id="ethnicity"
                    name="ethnicity"
                    class="border-gray-300 py-1 mt-1 rounded-md w-full"
                    v-model="user.ethnicity"
                  >
                    <option>汉族</option>
                    <option>柯尔克孜族</option>
                  </select>
                </div>
                <div>
                  <label for="country" class="font-medium text-gray-700">Country</label>
                  <select
                    id="country"
                    name="country"
                    class="border-gray-300 py-1 mt-1 rounded-md w-full"
                    v-model="user.country"
                  >
                    <option value="86">中华人民共和国</option>
                  </select>
                </div>

                <div>
                  <label for="province" class="font-medium text-gray-700">Province</label>
                  <select
                    id="province"
                    name="province"
                    class="border-gray-300 py-1 mt-1 rounded-md w-full"
                    v-model="user.province"
                    @change="onChange(user.province)"
                  >
                    <option
                      v-for="province in provinces"
                      :key="province.code"
                      :value="province.code"
                    >{{ province.name }}</option>
                  </select>
                </div>
              </div>
              <div class="flex space-x-4 text-sm">
                <div>
                  <label for="city" class="font-medium text-gray-700">City</label>
                  <select
                    id="city"
                    name="city"
                    class="border-gray-300 py-1 mt-1 rounded-md w-full"
                    v-model="user.city"
                    @change="onChange(user.city)"
                  >
                    <option
                      v-for="city in cities"
                      :key="city.code"
                      :value="city.code"
                    >{{ city.name }}</option>
                  </select>
                </div>
                <div>
                  <label for="district" class="font-medium text-gray-700">District</label>
                  <select
                    id="district"
                    name="district"
                    class="border-gray-300 py-1 mt-1 rounded-md w-full"
                    v-model="user.district"
                    @change="onChange(user.district)"
                  >
                    <option
                      v-for="district in districts"
                      :key="district.code"
                      :value="district.code"
                    >{{ district.name }}</option>
                  </select>
                </div>
                <div>
                  <label for="town" class="font-medium text-gray-700">Town</label>
                  <select
                    id="town"
                    name="town"
                    class="border-gray-300 py-1 mt-1 rounded-md w-full"
                    v-model="user.town"
                    @change="onChange(user.town)"
                  >
                    <option
                      v-for="town in towns"
                      :key="town.code"
                      :value="town.code"
                    >{{ town.name }}</option>
                  </select>
                </div>
              </div>
              <div class="flex space-x-4 text-sm">
                <div>
                  <label for="village" class="font-medium text-gray-700">Village</label>
                  <select
                    id="village"
                    name="village"
                    class="border-gray-300 py-1 mt-1 rounded-md w-full"
                    v-model="user.village"
                  >
                    <option>农村村</option>
                  </select>
                </div>
                <div class="w-full">
                  <label for="street" class="font-medium text-gray-700">Street</label>
                  <input
                    id="street"
                    name="street"
                    type="text"
                    class="border-gray-300 py-1 mt-1 rounded-md w-full"
                    v-model="user.street"
                  />
                </div>
              </div> -->
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
import { ref, onMounted } from "vue";

import instance from "@/api";
import { SERVER_URL, User, Region } from "@/api/request";

let user = ref<User>({});
let editEmail = ref(false)
let editPhone = ref(false)

const username = ref(JSON.parse(sessionStorage.getItem("account") || '').username)
const provinces = ref<Array<Region>>([])
const cities = ref<Array<Region>>([])
const districts = ref<Array<Region>>([])
const towns = ref<Array<Region>>([])

onMounted(() => {
  initData()
})

const initData = async () => {
  await Promise.all([fetch(), lower(0)])
}
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
 * 获取下级数据
 * @param superior 上级code
 */
const onChange = (superior: number) => {
  lower(superior)
}
/**
 * 获取下级数据
 * @param superior 上级code
 */
const lower = async (superior: number) => {
  await instance.get(SERVER_URL.region.concat("/", superior + "", "/lower")).then(res => {
    if (superior == 0) {
      provinces.value = res.data
    } else if (superior < 100) {
      cities.value = res.data
    } else if (superior < 10000) {
      districts.value = res.data
    } else if (superior < 1000000) {
      towns.value = res.data
    }
  })
}
const editAllow = (isEmail: boolean) => {
  if (isEmail) {
    editEmail.value = !editEmail.value
  } else {
    editPhone.value = !editPhone.value
  }
}
/**
 * 表单提交
 */
const onSubmit = async (): Promise<void> => {
  if (username.value && username.value.length > 0) {
    // await instance
    //   .put(SERVER_URL.user.concat("/", username.value), user.value)
    //   .then(res => {
    //     user.value = res.data
    //   });
    alert("修改成功")
  }
}

</script>