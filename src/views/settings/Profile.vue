<template>
  <div class="md:overflow-auto" style="height: calc(100vh - 160px)">
    <div class="bg-white rounded-md">
      <div class="flex items-center p-5 border-b border-gray-200">
        <h2 class="font-medium text-base mr-auto">Display Information</h2>
      </div>
      <div class="p-5">
        <div class="grid grid-cols-12 gap-5">
          <div class="col-span-12 xl:col-span-4">
            <div class="border border-gray-200 rounded-md p-5">
              <div class="w-40 h-40 relative image-fit cursor-pointer mx-auto">
                <img
                  class="rounded-md"
                  alt="Midone Tailwind HTML Admin Template"
                  src="/images/avatar.jpg"
                />
                <div
                  title="Remove this profile photo?"
                  class="tooltip w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-red-600 right-0 top-0 -mr-2 -mt-2"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <use xlink:href="/svg/feather-sprite.svg#x" />
                  </svg>
                </div>
              </div>
              <div class="w-40 mx-auto cursor-pointer relative mt-5">
                <button
                  type="button"
                  class="w-full bg-blue-700 text-white p-2 rounded-md focus:outline-none"
                >
                  Change Photo
                </button>
                <input
                  type="file"
                  class="w-full h-full top-0 left-0 absolute opacity-0"
                />
              </div>
            </div>
          </div>
          <div class="col-span-12 xl:col-span-8">
            <div>
              <label>Username</label>
              <input
                type="text"
                class="rounded-md w-full bg-gray-100 cursor-not-allowed mt-1 border border-gray-300"
                placeholder="Input text"
                value="leafage"
                disabled
              />
            </div>
            <div class="mt-3">
              <label>Nearest MRT Station</label>
              <div class="mt-1">
                <select class="rounded-md w-full border border-gray-300">
                  <option value="1">Admiralty</option>
                  <option value="2">Aljunied</option>
                  <option value="3">Ang Mo Kio</option>
                  <option value="4">Bartley</option>
                  <option value="5">Beauty World</option>
                </select>
              </div>
            </div>
            <div class="mt-3">
              <label>Postal Code</label>
              <div class="mt-1">
                <select class="rounded-md w-full border border-gray-300">
                  <option value="1">
                    018906 - 1 STRAITS BOULEVARD SINGA...
                  </option>
                  <option value="2">018910 - 5A MARINA GARDENS DRIVE...</option>
                  <option value="3">018915 - 100A CENTRAL BOULEVARD...</option>
                  <option value="4">018925 - 21 PARK STREET MARINA...</option>
                  <option value="5">018926 - 23 PARK STREET MARINA...</option>
                </select>
              </div>
            </div>
            <div class="mt-3">
              <label>Address</label>
              <textarea
                class="rounded-md w-full border border-gray-300 mt-1"
                placeholder="Adress"
              >
10 Anson Road, International Plaza, #10-11, 079903 Singapore, Singapore</textarea
              >
            </div>
            <button
              type="button"
              class="p-2 rounded-md w-20 bg-blue-700 text-white mt-3 focus:outline-none"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- END: Display Information -->
    <!-- BEGIN: Personal Information -->
    <div class="bg-white rounded-md lg:mt-5">
      <div class="flex items-center p-5 border-b border-gray-200">
        <h2 class="font-medium text-base mr-auto">Personal Information</h2>
      </div>
      <div class="p-5">
        <div class="grid grid-cols-12 gap-5">
          <div class="col-span-12 xl:col-span-6">
            <div>
              <label>Email</label>
              <input
                type="text"
                class="rounded-md w-full border border-gray-300 bg-gray-100 cursor-not-allowed mt-1"
                placeholder="Input text"
                value="leafage@leafage.com"
                disabled
              />
            </div>
            <div class="mt-3">
              <label>Name</label>
              <input
                type="text"
                class="rounded-md w-full border border-gray-300 mt-1"
                placeholder="Input text"
                value="Russell Crowe"
                disabled
              />
            </div>
            <div class="mt-3">
              <label>ID Type</label>
              <select class="rounded-md w-full border border-gray-300 mt-1">
                <option>IC</option>
                <option>FIN</option>
                <option>Passport</option>
              </select>
            </div>
            <div class="mt-3">
              <label>ID Number</label>
              <input
                type="text"
                class="rounded-md w-full border border-gray-300 mt-1"
                placeholder="Input text"
                value="357821204950001"
              />
            </div>
          </div>
          <div class="col-span-12 xl:col-span-6">
            <div>
              <label>Phone Number</label>
              <input
                type="text"
                class="rounded-md w-full border border-gray-300 mt-1"
                placeholder="Input text"
                value="65570828"
              />
            </div>
            <div class="mt-3">
              <label>Address</label>
              <input
                type="text"
                class="rounded-md w-full border border-gray-300 mt-1"
                placeholder="Input text"
                value="10 Anson Road, International Plaza, #10-11, 079903 Singapore, Singapore"
              />
            </div>
            <div class="mt-3">
              <label>Bank Name</label>
              <div class="mt-1">
                <select class="rounded-md w-full border border-gray-300">
                  <option value="1">SBI - STATE BANK OF INDIA</option>
                  <option value="1">CITI BANK - CITI BANK</option>
                </select>
              </div>
            </div>
            <div class="mt-3">
              <label>Bank Account</label>
              <input
                type="text"
                class="rounded-md w-full border border-gray-300 mt-1"
                placeholder="Input text"
                value="DBS Current 011-903573-0"
              />
            </div>
          </div>
        </div>
        <div class="flex justify-end mt-4">
          <a
            href=""
            class="text-red-600 flex border border-red-600 p-2 rounded-md items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-trash-2 mr-1"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path
                d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
              ></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
            Delete Account
          </a>
          <button
            type="button"
            class="p-2 rounded-md w-20 bg-blue-700 text-white ml-auto focus:outline-none"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Profile",

  data() {
    return {};
  },

  methods: {
    onSubmit() {
      alert("提交了");
    },
  },
});
</script>