<template>
    <div
        v-if="isOpen"
        class="flex bg-blue-100 rounded-lg p-4 mb-4 text-sm text-blue-700 dark:bg-blue-200 dark:text-blue-800"
        role="alert"
    >
        <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="mr-1"
      >
        <use :xlink:href="'/svg/feather-sprite.svg#' + 'info'" />
      </svg>
        <div>
            <span class="font-medium">Info alert!</span> Change a few things up and try submitting again.
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps({
    isOpen: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: "",
    }
});
</script>