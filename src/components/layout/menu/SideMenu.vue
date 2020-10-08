<template>
  <div class="flex">
    <!-- BEGIN: Side Menu -->
    <nav class="pr-5 pb-16 overflow-x-hidden side-nav">
      <div class="w-full h-px bg-theme-3 z-10 relative my-6"></div>
      <ul>
        <li v-for="(side, index) in menus" :key="index">
          <a
            href="#"
            class="flex items-center pl-5 mb-1 relative rounded-full side-menu--active"
          >
            <div
              class="absolute top-0 left-0 h-full rounded-l-full transition ease-in duration-100"
            >
              <i data-feather="side.icon"></i>
            </div>
            <div class="w-full ml-3 flex items-center">
              {{ side.name }}
              <i
                v-if="side.subs"
                data-feather="chevron-down"
                class="transition ease-in duration-100 w-4 h-4 ml-auto mr-5"
              ></i>
            </div>
          </a>
          <ul v-if="side.subs">
            <li v-for="(sub, index) in side.subs" :key="index">
              <a
                href="#"
                class="flex items-center pl-5 mb-1 relative rounded-full side-menu--active"
              >
                <div
                  class="absolute top-0 left-0 h-full rounded-l-full transition ease-in duration-100"
                >
                  <i data-feather="activity"></i>
                </div>
                <div class="w-full ml-3 flex items-center">
                  {{ sub.name }}
                  <i
                    v-if="sub"
                    data-feather="chevron-down"
                    class="transition ease-in duration-100 w-4 h-4 ml-auto mr-5"
                  ></i>
                </div>
              </a>
              <ul v-if="sub.subs">
                <li v-for="(subMenu, index) in sub.subs" :key="index">
                  <a
                    href="#"
                    class="flex items-center pl-5 mb-1 relative rounded-full side-menu--active"
                  >
                    <div
                      class="absolute top-0 left-0 h-full rounded-l-full transition ease-in duration-100"
                    >
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
    </nav>
    <!-- END: Side Menu -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SideMenu",

  props: {
    menus: Array,
  },

  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.side-nav {
  @media (max-width: 1280px) {
    width: 85px;
  }
  @media (max-width: 768px) {
    @apply hidden;
  }
}
</style>