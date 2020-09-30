<template>
  <!-- BEGIN: Mobile Menu -->
  <div class="mobile-menu md:hidden">
      <div class="mobile-menu-bar">
          <a href="" class="flex mr-auto">
              <img alt="abeille" class="w-6" src="../../assets/logo.svg">
          </a>
          <a href="javascript:;" id="mobile-menu-toggler"> <i data-feather="bar-chart-2" class="w-8 h-8 text-white transform -rotate-90"></i> </a>
      </div>
  </div>
  <!-- BEGIN: Top Bar -->
  <div class="border-b border-theme-24 -mt-10 md:-mt-5 -mx-3 sm:-mx-8 px-3 sm:px-8 pt-3 md:pt-0 mb-10">
      <div class="top-bar-boxed flex items-center">
          <!-- BEGIN: Logo -->
          <a href="" class="-intro-x hidden md:flex">
              <img alt="abeille" class="w-6" src="../../assets/logo.svg">
              <span class="text-white text-lg ml-3"> Mid<span class="font-medium">one</span> </span>
          </a>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Menu'
})
</script>