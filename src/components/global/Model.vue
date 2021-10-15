<template>
  <div
    v-show="isShow"
    class="fixed top-0 left-0 table w-full h-full bg-black bg-opacity-50"
    role="dialog"
  >
    <div class="table-cell align-middle">
      <div class="max-w-2xl my-0 mx-auto py-5 px-7">
        <!--container-->
        <div class="bg-white px-4 pt-5 pb-4 rounded-t-lg">
          <slot></slot>
        </div>
        <!--footer-->
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse text-sm rounded-b-lg">
          <button
            type="button"
            @click="commitOperation"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 font-medium text-white focus:outline-none sm:ml-3 sm:w-auto active:cursor-wait"
            :class="[
              isConfirm
                ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
            ]"
          >{{ isConfirm ? "确认" : "提交" }}</button>
          <button
            type="button"
            @click="cancelOperation"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto active:cursor-wait"
          >取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

defineProps({
  isShow: {
    type: Boolean,
    default: false,
  },
  isConfirm: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["cancelAction", "commitAction"]);

const cancelOperation = () => {
  emit("cancelAction", false);
};

const commitOperation = () => {
  emit("commitAction");
};
</script>