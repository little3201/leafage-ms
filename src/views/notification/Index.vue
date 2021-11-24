<template>
    <div>
        <div class="flex items-center">
            <h2 class="text-lg font-medium mr-auto my-2">Notification</h2>
            <RouterLink
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
            </RouterLink>
            <RouterLink
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
            </RouterLink>
        </div>
        <div class="bg-white px-4 rounded-md text-gray-600">
            <!-- 子组件 -->
            <RouterView />
        </div>
    </div>
</template>


<script lang="ts" setup>

</script>

<style scoped>
.RouterLink-exact-active {
    @apply text-blue-700 font-medium bg-white -mb-1;
}
</style>