<template>
  <div class="flex flex-col lg:flex-row items-center justify-center h-screen text-center lg:text-left">
    <div class="lg:mr-20">
      <img
        alt="notfound"
        class="h-48 lg:h-auto"
        src="/svg/error.svg"
      >
    </div>
    <div class="text-white mt-10 lg:mt-0">
      <div class="text-6xl font-medium">
        404
      </div>
      <div class="text-xl lg:text-3xl font-medium">
        Oops. This page has gone missing.
      </div>
      <div class="text-lg mt-3 mb-8">
        You may have mistyped the address or the page may have moved.
      </div>
      <RouterLink
        to="/"
        class="text-white hover:underline inline-flex items-end"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <use :xlink:href="'/svg/feather-sprite.svg#' + 'chevron-left'" />
        </svg>
        <span class=" text-xl">Back to Home</span>
      </RouterLink>
    </div>
  </div>
</template>