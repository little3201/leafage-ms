<template>
    <div>
        <div class="flex items-center">
            <h2 class="text-lg font-medium mr-auto my-2">Notification</h2>
            <router-link
                class="inline-flex items-center justify-center w-36 hover:text-blue-600 hover:bg-gray-100 rounded-t-md p-2"
                to="unread"
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="mr-2"
                >
                    <use :xlink:href="'/svg/feather-sprite.svg#' + 'book'" />
                </svg>
                Unread
            </router-link>
            <router-link
                class="inline-flex items-center justify-center w-36 hover:text-blue-600 hover:bg-gray-100 rounded-t-md p-2"
                to="readed"
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="mr-2"
                >
                    <use :xlink:href="'/svg/feather-sprite.svg#' + 'book-open'" />
                </svg>
                Readed
            </router-link>
        </div>
        <div class="bg-white px-4 rounded-md text-gray-600">
            <!-- 子组件 -->
            <router-view />
        </div>
    </div>
</template>


<script lang="ts" setup>

</script>

<style scoped>
.router-link-exact-active {
    @apply text-blue-700 font-medium bg-white -mb-1;
}
</style>