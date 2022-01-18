<template>
    <transition name="preview">
        <div v-show="isShow" class="fixed inset-0 overflow-y-auto" role="dialog" aria-modal="true">
            <div
                class="flex items-end justify-center bg-black bg-opacity-60 min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
            >
                <span class="inline-block align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div
                    class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden sm:align-middle md:max-w-lg lg:max-w-2xl"
                >
                    <button
                        type="button"
                        @click="closeOperation"
                        class="inline-flex items-center justify-center rounded-bl-full bg-gray-400 opacity-70 absolute top-0 right-0 w-12 h-12"
                    >
                        <span class="sr-only">Close</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-x -mt-2 -mr-2"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <slot></slot>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script lang="ts" setup>
defineProps({
    isShow: {
        type: Boolean,
        default: false,
    }
});

const emit = defineEmits(["closeAction"]);

const closeOperation = () => {
    emit("closeAction", false);
};
</script>

<style scoped>
.preview-enter-active,
.preview-leave-active {
    transition: opacity 0.3s ease;
}

.preview-enter-from,
.preview-leave-to {
    opacity: 0;
}
</style>