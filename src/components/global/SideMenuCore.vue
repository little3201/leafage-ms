<template>
  <ul class="text-white">
    <li
      v-for="data in datas"
      :key="data.code"
      class="relative"
      :class="{
        'hover:bg-blue-100 hover:bg-opacity-10 rounded-l-full':
          !data.children || data.children.length == 0,
      }"
    >
      <a
        v-if="data.children && data.children.length > 0"
        href="javascript:;"
        @click.prevent="isOpen = !isOpen"
        class="flex items-center h-12 hover:bg-blue-100 hover:bg-opacity-10 rounded-l-full pl-5"
      >
        <div class="mr-3">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <use :xlink:href="'/@/assets/feather-sprite.svg#' + data.icon" />
          </svg>
        </div>
        <span
          v-if="data.children && data.children.length > 0"
          class="hidden xl:flex items-center w-full"
        >
          {{ data.name }}
          <svg
            v-if="isOpen"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="ml-auto mr-2"
          >
            <use xlink:href="/@/assets/feather-sprite.svg#chevron-down" />
          </svg>
          <svg
            v-else
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="ml-auto mr-2"
          >
            <use xlink:href="/@/assetsfeather-sprite.svg#chevron-right" />
          </svg>
        </span>
        <span
          v-else
          class="hidden xl:flex items-center w-full"
          v-text="data.name"
        ></span>
      </a>
      <router-link
        v-else
        :to="superior.concat(data.path)"
        class="flex items-center h-12 rounded-l-full pl-5 -mr-5"
        exact
      >
        <div class="mr-3">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <use :xlink:href="'/@/assets/feather-sprite.svg#' + data.icon" />
          </svg>
        </div>
        <div class="hidden xl:block w-full" v-text="data.name"></div>
      </router-link>
      <SideMenuCore
        v-show="isOpen"
        class="xl:ml-4 bg-blue-900 bg-opacity-30"
        v-if="data.children && data.children.length > 0"
        :datas="data.children"
        :superior="data.path"
      />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SideMenuCore",

  props: {
    datas: {
      type: Array,
      default: [],
    },
    superior: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      isOpen: true,
    };
  },
});
</script>

<style scoped>
.router-link-exact-active {
  background-color: #f3f4f6;
  color: black;
}
.router-link-exact-active:before {
  content: "";
  width: 30px;
  height: 30px;
  margin-top: -1.875rem;
  margin-right: -1.25rem;
  transform: rotate(90deg) scale(1.04);
  background-size: 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='259.51' height='259.52' viewBox='0 0 259.51 259.52'%3E%3Cpath id='Path_143' data-name='Path 143' d='M8659.507,423.965c-.167-2.608.05-5.319-.19-8.211-.084-1.012-.031-2.15-.118-3.12-.113-1.25-.1-2.682-.236-4.061-.172-1.722-.179-3.757-.365-5.394-.328-2.889-.478-5.857-.854-8.61-.509-3.714-.825-7.252-1.38-10.543-.934-5.535-2.009-11.312-3.189-16.692-.855-3.9-1.772-7.416-2.752-11.2-1.1-4.256-2.394-8.149-3.687-12.381-1.1-3.615-2.366-6.893-3.623-10.493-1.3-3.739-2.917-7.26-4.284-10.7-1.708-4.295-3.674-8.078-5.485-12.023-1.145-2.493-2.5-4.932-3.727-7.387-1.318-2.646-2.9-5.214-4.152-7.518-1.716-3.16-3.517-5.946-5.274-8.873-1.692-2.818-3.589-5.645-5.355-8.334-2.326-3.542-4.637-6.581-7.039-9.848-2.064-2.809-4.017-5.255-6.088-7.828-2.394-2.974-4.937-5.936-7.292-8.589-3.027-3.411-6.049-6.744-9.055-9.763-2.4-2.412-4.776-4.822-7.108-6.975-3-2.767-5.836-5.471-8.692-7.854-3.332-2.779-6.657-5.663-9.815-8.028-2.958-2.216-5.784-4.613-8.7-6.6-3.161-2.159-6.251-4.414-9.219-6.254-3.814-2.365-7.533-4.882-11.168-6.89-4.213-2.327-8.513-4.909-12.478-6.834-4.61-2.239-9.234-4.619-13.51-6.416-4.1-1.725-8.11-3.505-11.874-4.888-4.5-1.652-8.506-3.191-12.584-4.47-6.045-1.9-12.071-3.678-17.431-5-9.228-2.284-17.608-3.757-24.951-4.9-7.123-1.112-13.437-1.64-18.271-2.035l-2.405-.2c-1.638-.136-3.508-.237-4.633-.3a115.051,115.051,0,0,0-12.526-.227h259.51Z' transform='translate(-8399.997 -164.445)' fill='%23f1f5f8'/%3E%3C/svg%3E%0A");
  position: absolute;
  top: 0px;
  right: 0px;
}
.router-link-exact-active:after {
  content: "";
  width: 30px;
  height: 30px;
  margin-top: 3rem;
  margin-right: -1.25rem;
  transform: scale(1.04);
  background-size: 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='259.51' height='259.52' viewBox='0 0 259.51 259.52'%3E%3Cpath id='Path_143' data-name='Path 143' d='M8659.507,423.965c-.167-2.608.05-5.319-.19-8.211-.084-1.012-.031-2.15-.118-3.12-.113-1.25-.1-2.682-.236-4.061-.172-1.722-.179-3.757-.365-5.394-.328-2.889-.478-5.857-.854-8.61-.509-3.714-.825-7.252-1.38-10.543-.934-5.535-2.009-11.312-3.189-16.692-.855-3.9-1.772-7.416-2.752-11.2-1.1-4.256-2.394-8.149-3.687-12.381-1.1-3.615-2.366-6.893-3.623-10.493-1.3-3.739-2.917-7.26-4.284-10.7-1.708-4.295-3.674-8.078-5.485-12.023-1.145-2.493-2.5-4.932-3.727-7.387-1.318-2.646-2.9-5.214-4.152-7.518-1.716-3.16-3.517-5.946-5.274-8.873-1.692-2.818-3.589-5.645-5.355-8.334-2.326-3.542-4.637-6.581-7.039-9.848-2.064-2.809-4.017-5.255-6.088-7.828-2.394-2.974-4.937-5.936-7.292-8.589-3.027-3.411-6.049-6.744-9.055-9.763-2.4-2.412-4.776-4.822-7.108-6.975-3-2.767-5.836-5.471-8.692-7.854-3.332-2.779-6.657-5.663-9.815-8.028-2.958-2.216-5.784-4.613-8.7-6.6-3.161-2.159-6.251-4.414-9.219-6.254-3.814-2.365-7.533-4.882-11.168-6.89-4.213-2.327-8.513-4.909-12.478-6.834-4.61-2.239-9.234-4.619-13.51-6.416-4.1-1.725-8.11-3.505-11.874-4.888-4.5-1.652-8.506-3.191-12.584-4.47-6.045-1.9-12.071-3.678-17.431-5-9.228-2.284-17.608-3.757-24.951-4.9-7.123-1.112-13.437-1.64-18.271-2.035l-2.405-.2c-1.638-.136-3.508-.237-4.633-.3a115.051,115.051,0,0,0-12.526-.227h259.51Z' transform='translate(-8399.997 -164.445)' fill='%23f1f5f8'/%3E%3C/svg%3E%0A");
  position: absolute;
  top: 0px;
  right: 0px;
}
</style>