<template>
    <div class="bg-white py-4 divide-y">
        <div v-for="(notification, index) in notifications" :key="index" class="p-2">
            <div class="flex items-center">
                <p class="font-semibold text-lg" v-text="notification.title"></p>
                <span
                    class="text-xs text-gray-500 ml-auto whitespace-no-wrap"
                    v-text="new Date(notification.modifyTime).toLocaleString()"
                ></span>
            </div>
            <div class="w-full text-gray-600 py-2">{{ notification.content }}</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const notifications = ref([
    {
        title: 'leafage 系统通知',
        content: 'Contrary to popular belief, Lorem Ipsum is not simply randomtext. It has roots in a piece of classical Latin literature from 45 BC, making it over 20',
        modifyTime: new Date()
    },
    {
        title: 'leafage 系统通知',
        content: 'Contrary to popular belief, Lorem Ipsum is not simply randomtext. It has roots in a piece of classical Latin literature from 45 BC, making it over 20',
        modifyTime: new Date()
    }
])
</script>