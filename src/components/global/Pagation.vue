<template>
  <div class="flex items-center mt-3">
    <ul class="flex items-center mr-0 sm:mr-auto">
      <li class="px-3 py-2 mr-2">
        <a href="">
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
      <li class="px-3 py-2 mr-2">
        <a href="" disabled>
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
      <li class="px-3 py-2 mr-2"><a href="">...</a></li>
      <li class="px-3 py-2 mr-2 bg-white rounded-md">
        <a href="">1</a>
      </li>
      <li class="px-3 py-2 mr-2">
        <a href="">2</a>
      </li>
      <li class="px-3 py-2 mr-2"><a href="">3</a></li>
      <li class="px-3 py-2 mr-2"><a href="">...</a></li>
      <li class="px-3 py-2 mr-2">
        <a href="">
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
      <li class="px-3 py-2">
        <a href=""
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-chevrons-right"
          >
            <polyline points="13 17 18 12 13 7"></polyline>
            <polyline points="6 17 11 12 6 7"></polyline></svg
        ></a>
      </li>
    </ul>
    <select
      class="mt-1 block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
      <option>10</option>
      <option>25</option>
      <option>35</option>
      <option>50</option>
    </select>
  </div>
</template>