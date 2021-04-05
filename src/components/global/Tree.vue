<template>
  <div v-show="isTree" class="fixed inset-0 overflow-y-auto">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-black opacity-40"></div>
      </div>
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <ul>
              <li
                class="py-1 px-2 flex items-center hover:bg-gray-300 hover:bg-opacity-30 rounded-md"
              >
                <input type="checkbox" checked class="rounded" />
                <span class="ml-4">Dashboard</span>
              </li>
              <li
                class="py-1 px-2 flex items-center hover:bg-gray-300 hover:bg-opacity-30 rounded-md"
              >
                <input type="checkbox" class="rounded" />
                <span class="ml-4">Posts</span>
                <ol class="flex items-center ml-8 border-l">
                  <li class="flex items-center mx-4">
                    <input type="checkbox" class="rounded" />
                    <span class="ml-2 text-blue-600">Add</span>
                  </li>
                  <li class="flex items-center mx-4">
                    <input type="checkbox" class="rounded" />
                    <span class="ml-2">Edit</span>
                  </li>
                  <li class="flex items-center mx-4">
                    <input type="checkbox" class="rounded" />
                    <span class="ml-2 text-red-600">Delete</span>
                  </li>
                  <li class="flex items-center mx-4">
                    <input type="checkbox" class="rounded" />
                    <span class="ml-2">Export</span>
                  </li>
                </ol>
              </li>
              <li
                class="py-1 px-2 flex items-center hover:bg-gray-300 hover:bg-opacity-30 rounded-md"
              >
                <input type="checkbox" class="rounded" />
                <span class="ml-4">Portfolio</span>
                <ol class="flex items-center ml-8 border-l">
                  <li class="flex items-center mx-4">
                    <input type="checkbox" class="rounded" />
                    <span class="ml-2 text-blue-600">Add</span>
                  </li>
                  <li class="flex items-center mx-4">
                    <input type="checkbox" class="rounded" />
                    <span class="ml-2">Edit</span>
                  </li>
                  <li class="flex items-center mx-4">
                    <input type="checkbox" class="rounded" />
                    <span class="ml-2 text-red-600">Delete</span>
                  </li>
                  <li class="flex items-center mx-4">
                    <input type="checkbox" class="rounded" />
                    <span class="ml-2">Export</span>
                  </li>
                </ol>
              </li>
              <ul
                class="py-1 px-2 flex items-center hover:bg-gray-300 hover:bg-opacity-30 rounded-md"
              >
                <input type="checkbox" class="rounded" />
                <span
                  @click="isChildOpen = !isChildOpen"
                  class="ml-4 cursor-pointer flex items-center"
                  >System
                  <svg
                    v-if="isChildOpen"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-chevron-down ml-4"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-chevron-right ml-4"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline></svg
                ></span>
              </ul>
              <ul v-if="isChildOpen">
                <li
                  class="py-1 px-2 flex items-center hover:bg-gray-300 hover:bg-opacity-30 rounded-md ml-4"
                >
                  <input type="checkbox" class="rounded" />
                  <span class="ml-4">User</span>
                  <ol class="flex items-center ml-8 border-l">
                    <li class="flex items-center mx-4">
                      <input type="checkbox" class="rounded" />
                      <span class="ml-2 text-blue-600">Add</span>
                    </li>
                    <li class="flex items-center mx-4">
                      <input type="checkbox" class="rounded" />
                      <span class="ml-2">Edit</span>
                    </li>
                    <li class="flex items-center mx-4">
                      <input type="checkbox" class="rounded" />
                      <span class="ml-2 text-red-600">Delete</span>
                    </li>
                    <li class="flex items-center mx-4">
                      <input type="checkbox" class="rounded" />
                      <span class="ml-2">Export</span>
                    </li>
                  </ol>
                </li>
                <li
                  class="py-1 px-2 flex items-center hover:bg-gray-300 hover:bg-opacity-30 rounded-md ml-4"
                >
                  <input type="checkbox" class="rounded" />
                  <span class="ml-4">Group</span>
                  <ol class="flex items-center ml-8 border-l">
                    <li class="flex items-center mx-4">
                      <input type="checkbox" class="rounded" />
                      <span class="ml-2 text-blue-600">Add</span>
                    </li>
                    <li class="flex items-center mx-4">
                      <input type="checkbox" class="rounded" />
                      <span class="ml-2">Edit</span>
                    </li>
                    <li class="flex items-center mx-4">
                      <input type="checkbox" class="rounded" />
                      <span class="ml-2 text-red-600">Delete</span>
                    </li>
                    <li class="flex items-center mx-4">
                      <input type="checkbox" class="rounded" />
                      <span class="ml-2">Export</span>
                    </li>
                  </ol>
                </li>
                <li
                  class="py-1 px-2 flex items-center hover:bg-gray-300 hover:bg-opacity-30 rounded-md ml-4"
                >
                  <input type="checkbox" class="rounded" />
                  <span class="ml-4">Role</span>
                  <ol class="flex items-center ml-8 border-l">
                    <li class="flex items-center mx-4">
                      <input type="checkbox" class="rounded" />
                      <span class="ml-2 text-blue-600">Add</span>
                    </li>
                    <li class="flex items-center mx-4">
                      <input type="checkbox" class="rounded" />
                      <span class="ml-2 text-purple-600">Auz</span>
                    </li>
                    <li class="flex items-center mx-4">
                      <input type="checkbox" class="rounded" />
                      <span class="ml-2">Edit</span>
                    </li>
                    <li class="flex items-center mx-4">
                      <input type="checkbox" class="rounded" />
                      <span class="ml-2 text-red-600">Delete</span>
                    </li>
                    <li class="flex items-center mx-4">
                      <input type="checkbox" class="rounded" />
                      <span class="ml-2">Export</span>
                    </li>
                  </ol>
                </li>
                <li
                  class="py-1 px-2 flex items-center hover:bg-gray-300 hover:bg-opacity-30 rounded-md ml-4"
                >
                  <input type="checkbox" class="rounded" />
                  <span class="ml-4">Authority</span>
                  <ol class="flex items-center ml-8 border-l">
                    <li class="flex items-center mx-4">
                      <input type="checkbox" class="rounded" />
                      <span class="ml-2 text-blue-600">Add</span>
                    </li>
                    <li class="flex items-center mx-4">
                      <input type="checkbox" class="rounded" />
                      <span class="ml-2">Edit</span>
                    </li>
                    <li class="flex items-center mx-4">
                      <input type="checkbox" class="rounded" />
                      <span class="ml-2 text-red-600">Delete</span>
                    </li>
                    <li class="flex items-center mx-4">
                      <input type="checkbox" class="rounded" />
                      <span class="ml-2">Export</span>
                    </li>
                  </ol>
                </li>
                <!-- <Tree class="ml-4" /> -->
              </ul>
              <li
                class="py-1 px-2 flex items-center hover:bg-gray-300 hover:bg-opacity-30 rounded-md"
              >
                <input type="checkbox" class="rounded" />
                <span class="ml-4">Category</span>
                <ol class="flex items-center ml-8 border-l">
                  <li class="flex items-center mx-4">
                    <input type="checkbox" class="rounded" />
                    <span class="ml-2 text-blue-600">Add</span>
                  </li>
                  <li class="flex items-center mx-4">
                    <input type="checkbox" class="rounded" />
                    <span class="ml-2">Edit</span>
                  </li>
                  <li class="flex items-center mx-4">
                    <input type="checkbox" class="rounded" />
                    <span class="ml-2 text-red-600">Delete</span>
                  </li>
                  <li class="flex items-center mx-4">
                    <input type="checkbox" class="rounded" />
                    <span class="ml-2">Export</span>
                  </li>
                </ol>
              </li>
            </ul>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            @click="onSubmit"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            提交
          </button>
          <button
            type="button"
            @click="closeModel"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Tree",

  props: {
    isTree: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isChildOpen: true,
    };
  },

  methods: {
    closeModel() {
      this.$emit("treeAction", false);
    },
    onSubmit() {},
  },
});
</script>