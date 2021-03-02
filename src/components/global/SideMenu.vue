<template>
  <nav class="hidden md:block sm:w-20 xl:w-60 pr-5 text-sm">
    <router-link
      to="/"
      class="flex items-center pl-5 pt-3"
      exact-active-class=""
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 311.983 311.929"
      >
        <g
          id="Icon_ionic-ios-apps"
          data-name="Icon ionic-ios-apps"
          transform="translate(-4.494 -4.496)"
        >
          <path
            id="Path_9"
            data-name="Path 9"
            d="M305.678,64.318,184.327,9a65.721,65.721,0,0,0-47.842,0L15.22,64.318c-14.293,6.5-14.293,17.117,0,23.639l120.221,54.826a69.059,69.059,0,0,0,50.033,0L305.687,87.956C319.971,81.46,319.971,70.822,305.678,64.318Z"
            transform="translate(0.07 0)"
            fill="#b5c8ff"
          />
          <g
            id="Group_1"
            data-name="Group 1"
            transform="translate(4.493 135.941)"
          >
            <path
              id="Path_10"
              data-name="Path 10"
              d="M135.441,61.195,54.375,24.239a13.18,13.18,0,0,0-10.8,0L15.22,37.154C.927,43.65.927,54.271,15.22,60.792l120.221,54.826a69.058,69.058,0,0,0,50.033,0L305.687,60.792c14.293-6.5,14.293-17.117,0-23.639L277.341,24.239a13.18,13.18,0,0,0-10.8,0L185.474,61.195A69.058,69.058,0,0,1,135.441,61.195Z"
              transform="translate(-4.423 60.176)"
              fill="#fff"
            />
            <path
              id="Path_11"
              data-name="Path 11"
              d="M305.757,28.732,280,17.033a12.992,12.992,0,0,0-10.724,0l-87.724,39.72a71.712,71.712,0,0,1-42.159,0L51.681,17.033a12.992,12.992,0,0,0-10.724,0l-25.744,11.7C.92,35.228.92,45.849,15.213,52.371L135.426,107.2a69.058,69.058,0,0,0,50.033,0L305.671,52.371C320.049,45.866,320.049,35.228,305.757,28.732Z"
              transform="translate(-4.493 -15.875)"
              fill="#fff"
            />
          </g>
        </g>
      </svg>
      <span class="hidden xl:block text-white text-lg ml-3">
        Leaf<span class="font-medium">age</span>
      </span>
    </router-link>
    <div class="my-6 h-px w-full bg-gray-200 bg-opacity-30"></div>
    <ul class="text-white w-full">
      <li class="hover:bg-blue-100 hover:bg-opacity-10 rounded-l-full relative">
        <router-link
          to="/"
          class="flex items-center h-12 rounded-l-full pl-5 -mr-5"
          exact
        >
          <div class="mr-3">
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
              class="feather feather-home"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <div class="hidden xl:flex items-center w-full">Dashboard</div>
        </router-link>
      </li>
      <li>
        <a
          href="#"
          @click.prevent="isSystemOpen = !isSystemOpen"
          class="flex items-center h-12 rounded-full pl-5"
        >
          <div class="mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-layers"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
          </div>
          <div class="hidden xl:flex items-center w-full">
            System
            <svg
              v-if="isSystemOpen"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-chevron-down ml-auto mr-2"
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
              class="feather feather-chevron-right ml-auto mr-2"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </a>
        <ul v-show="isSystemOpen" class="xl:ml-4 bg-blue-900 bg-opacity-30">
          <li
            class="hover:bg-blue-100 hover:bg-opacity-10 rounded-l-full relative"
          >
            <router-link
              to="/system/group"
              class="flex items-center h-12 pl-5 rounded-l-full -mr-5"
              exact
            >
              <div class="mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-users"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div class="w-full hidden xl:flex items-center">Group</div>
            </router-link>
          </li>
          <li
            class="hover:bg-blue-100 hover:bg-opacity-10 rounded-l-full relative"
          >
            <router-link
              to="/system/user"
              class="flex items-center h-12 pl-5 rounded-l-full -mr-5"
              exact
            >
              <div class="mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-user"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div class="w-full hidden xl:flex items-center">User</div>
            </router-link>
          </li>
          <li
            class="hover:bg-blue-100 hover:bg-opacity-10 rounded-l-full relative"
          >
            <router-link
              to="/system/role"
              class="flex items-center h-12 pl-5 rounded-l-full -mr-5"
              exact
            >
              <div class="mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-pocket"
                >
                  <path
                    d="M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z"
                  ></path>
                  <polyline points="8 10 12 14 16 10"></polyline>
                </svg>
              </div>
              <div class="w-full hidden xl:flex items-center">Role</div>
            </router-link>
          </li>
          <li
            class="hover:bg-blue-100 hover:bg-opacity-10 rounded-l-full relative"
          >
            <router-link
              to="/system/authority"
              class="flex items-center h-12 pl-5 rounded-l-full -mr-5"
              exact
            >
              <div class="mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-power"
                >
                  <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                  <line x1="12" y1="2" x2="12" y2="12"></line>
                </svg>
              </div>
              <div class="w-full hidden xl:flex items-center">Authority</div>
            </router-link>
          </li>
        </ul>
      </li>
      <li class="hover:bg-blue-100 hover:bg-opacity-10 rounded-l-full relative">
        <router-link
          to="/posts"
          class="flex items-center h-12 rounded-l-full pl-5 -mr-5"
          exact
        >
          <div class="mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-book"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path
                d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
              ></path>
            </svg>
          </div>
          <div class="w-full hidden xl:flex items-center">Posts</div>
        </router-link>
      </li>
      <li class="hover:bg-blue-100 hover:bg-opacity-10 rounded-l-full relative">
        <router-link
          to="/portfolio"
          class="flex items-center h-12 rounded-l-full pl-5 -mr-5"
          exact
        >
          <div class="mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-camera"
            >
              <path
                d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
              ></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
          </div>
          <div class="w-full hidden xl:flex items-center">Portfolio</div>
        </router-link>
      </li>
      <li class="hover:bg-blue-100 hover:bg-opacity-10 rounded-l-full relative">
        <router-link
          to="/category"
          class="flex items-center h-12 rounded-l-full pl-5 -mr-5"
          exact
        >
          <div class="mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-tag"
            >
              <path
                d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
              ></path>
              <line x1="7" y1="7" x2="7.01" y2="7"></line>
            </svg>
          </div>
          <div class="w-full hidden xl:flex items-center">Category</div>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import instance from "../../api";
import SERVER_URL from "../../api/request";

export default defineComponent({
  name: "SideMenu",

  data() {
    return {
      isSystemOpen: false,
      isPostsOpen: false,
    };
  },

  setup() {
    const datas = ref([]);

    async function initAuthorities() {
      // await instance.get(SERVER_URL.authority).then((response) => {
      //   datas.value = response.data;
      // });
    }

    onMounted(() => {
      initAuthorities();
    });

    return {
      datas,
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