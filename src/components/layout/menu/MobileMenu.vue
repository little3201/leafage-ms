<template>
  <!-- BEGIN: Mobile Menu -->
  <div class="border-b border-theme-24 -mt-5 -mx-8 mb-6 md:hidden">
    <ul class="border-t border-theme-24 py-5">
      <li v-for="(side, index) in menus" :key="index">
        <a href="#" class="menu menu--active">
          <div class="menu__icon">
            <i data-feather="side.icon"></i>
          </div>
          <div class="w-full ml-3 flex items-center">
            {{ side.name }}
            <i
              v-if="side.subs"
              data-feather="chevron-down"
              class="transition ease-in duration-100 w-5 h-5 ml-auto"
            ></i>
          </div>
        </a>
        <ul v-if="side.subs" class="menu__sub-open">
          <li v-for="(sub, index) in side.subs" :key="index">
            <a href="#" class="menu menu--active">
              <div class="menu__icon">
                <i data-feather="activity"></i>
              </div>
              <div class="w-full ml-3 flex items-center">
                {{ sub.name }}
                <i
                  v-if="sub"
                  data-feather="chevron-down"
                  class="transition ease-in duration-100 w-5 h-5 ml-auto"
                ></i>
              </div>
            </a>
            <ul v-if="sub.subs" class="transition ease-in duration-100 w-5 h-5 ml-auto">
              <li v-for="(subMenu, index) in sub.subs" :key="index">
                <a href="#" class="menu menu--active">
                  <div class="menu__icon">
                    <i data-feather="zap"></i>
                  </div>
                  <div class="w-full ml-3 flex items-center">
                    {{ subMenu.title }}
                  </div>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <!-- END: Mobile Menu -->
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MobileMenu",

  props: {
    menus: Array,
  },

  setup() {
    return {};
  },
});
</script>