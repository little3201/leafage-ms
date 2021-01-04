<template>
  <div class="col-span-12 mt-6">
    <div class="intro-y block sm:flex items-center h-10">
      <h2 class="text-lg font-medium truncate mr-5">Weekly Top Seller</h2>
      <div class="flex items-center sm:ml-auto mt-3 sm:mt-0">
        <button class="button box flex items-center text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-file-text hidden sm:block w-4 h-4 mr-2"
          >
            <path
              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
            ></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          Export to Excel
        </button>
        <button class="ml-3 button box flex items-center text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-file-text hidden sm:block w-4 h-4 mr-2"
          >
            <path
              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
            ></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          Export to PDF
        </button>
      </div>
    </div>
    <div class="intro-y overflow-auto lg:overflow-visible mt-8 sm:mt-0">
      <table class="table table-report sm:mt-2">
        <thead>
          <tr>
            <th class="whitespace-no-wrap">No.</th>
            <th class="whitespace-no-wrap">PRODUCT NAME</th>
            <th class="text-center whitespace-no-wrap">STOCK</th>
            <th class="text-center whitespace-no-wrap">STATUS</th>
            <th class="text-center whitespace-no-wrap">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr class="intro-x" v-for="(data, index) in datas" :key="index">
            <td>
              {{ index + 1 }}
            </td>
            <td>
              <a
                href=""
                class="font-medium whitespace-no-wrap"
                v-text="data.name"
              ></a>
              <div class="text-gray-600 text-xs whitespace-no-wrap">
                {{ data.description }}
              </div>
            </td>
            <td class="text-center">{{ data.code }}</td>
            <td class="w-40">
              <div class="flex items-center justify-center text-theme-9">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-check-square w-4 h-4 mr-2"
                >
                  <polyline points="9 11 12 14 22 4"></polyline>
                  <path
                    d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
                  ></path>
                </svg>
                Active
              </div>
            </td>
            <td class="table-report__action w-56">
              <div class="flex justify-center items-center">
                <a class="flex items-center mr-3" href="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-check-square w-4 h-4 mr-2"
                  >
                    <polyline points="9 11 12 14 22 4"></polyline>
                    <path
                      d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
                    ></path>
                  </svg>
                  Edit
                </a>
                <a class="flex items-center text-theme-6" href="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-trash-2 w-4 h-4 mr-1"
                  >
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path
                      d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                    ></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                  Delete
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      class="intro-y flex flex-wrap sm:flex-row sm:flex-no-wrap items-center mt-3"
    >
      <ul class="pagination">
        <li>
          <a class="pagination__link" href="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-chevrons-left"
            >
              <polyline points="11 17 6 12 11 7"></polyline>
              <polyline points="18 17 13 12 18 7"></polyline>
            </svg>
          </a>
        </li>
        <li>
          <a class="pagination__link" href="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-chevron-left"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </a>
        </li>
        <li><a class="pagination__link" href="">...</a></li>
        <li><a class="pagination__link pagination__link--active" href="">1</a></li>
        <li>
          <a class="pagination__link" href="">2</a>
        </li>
        <li><a class="pagination__link" href="">3</a></li>
        <li><a class="pagination__link" href="">...</a></li>
        <li>
          <a class="pagination__link" href="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-chevron-right"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </a>
        </li>
        <li>
          <a class="pagination__link" href=""> </a>
        </li>
      </ul>
      <select class="w-20 input box mt-3 sm:mt-0">
        <option>10</option>
        <option>25</option>
        <option>35</option>
        <option>50</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
export default defineComponent({
  name: "table",

  props: {
    datas: {
      type: Array,
      default: [],
    },
  },
});
</script>