<template>
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
        <a class="pagination__link" href="" disabled>
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
      <li class="hidden"><a class="pagination__link" href="">...</a></li>
      <li>
        <a class="pagination__link pagination__link--active" href="">1</a>
      </li>
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
</template>