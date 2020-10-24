<template>
  <!-- BEGIN: Mobile Menu -->
  <div class="mobile-menu md:hidden">
    <ul class="border-t border-theme-24 py-5 hidden">
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

<style lang="scss" scoped>
.mobile-menu {
    @apply border-b border-theme-24 -mt-5 -mx-8 mb-6;
    @media (max-width: theme('screens.sm')) {
        @apply -mx-3;
    }
    .mobile-menu-bar {
        height: 70px;
        @apply px-8 flex items-center;
        @media (max-width: theme('screens.sm')) {
            @apply px-3;
        }
    }
    ul {
        &.menu__sub-open {
            @apply block;
        }
        li {
            max-width: 1280px;
            @apply w-full mx-auto;
            ul {
                @apply hidden bg-theme-28 rounded-md mx-6 my-1;
                @media (max-width: theme('screens.sm')) {
                    @apply mx-3;
                }
                .menu {
                    @apply px-4;
                }
                ul {
                    @apply hidden bg-theme-29 rounded-md mx-0;
                }
            }
        }
    }
    .menu__devider {
        @apply w-full h-px bg-theme-24 relative;
    }
    .menu {
        height: 50px;
        @apply flex items-center text-white px-10;
        @media (max-width: theme('screens.sm')) {
            @apply px-5;
        }
        &.menu--active {
            .menu__title {

            }
        }
        .menu__title {
            @apply w-full ml-3 flex items-center;
            .menu__sub-icon {
                @apply transition ease-in duration-100 w-5 h-5 ml-auto;
            }
        }
    }
}
</style>