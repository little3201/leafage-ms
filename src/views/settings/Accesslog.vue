<template>
    <div>
        <div class="sm-a-h overflow-auto">
            <table class="w-full overflow-ellipsis whitespace-nowrap" aria-label="accesslog">
                <thead>
                    <tr class="sticky top-0 bg-gray-100 uppercase text-center text-xs sm:text-sm">
                        <th scope="col" class="px-4 py-2 sm:py-3 text-left">No.</th>
                        <th scope="col" class="px-4">IP</th>
                        <th scope="col" class="px-4">Location</th>
                        <th scope="col" class="px-4">Description</th>
                        <th scope="col" class="px-4">Datetime</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        class="text-center bg-white border-y-4 lg:border-y-8 first:border-t-0 last:border-b-0 border-gray-100 hover:bg-gray-50 hover:text-blue-600"
                        v-for="(data, index) in accesslogs"
                        :key="index"
                    >
                        <td class="px-4 py-2 sm:py-3 text-left">{{ index + 1 }}</td>
                        <td class="px-4">{{ data.ip }}</td>
                        <td class="px-4">{{ data.location }}</td>
                        <td class="px-4">{{ data.description }}</td>
                        <td class="px-4">{{ new Date(data.modifyTime).toLocaleString() }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <Pagation @retrieve="retrieve" :total="total" :page="page" :size="size" @setPage="setPage" />
    </div>
</template>


<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Pagation from "@/components/Pagation.vue"

import { instance, SERVER_URL } from "@/api";
import type { AccessLog } from "@/api/request.type";

let accesslogs = ref<Array<AccessLog>>([])

// 分页参数
let page = ref(0);
let size = ref(15);
let total = ref(0);

onMounted(() => {
    retrieve()
})
/**
 * 设置页码
 * @param p 页码
 * @param s 大小
 */
const setPage = (p: number, s: number): void => {
    page.value = p;
    size.value = s;
}
/**
 * 查询列表
 */
const retrieve = async () => {
    await Promise.all([
        instance.get(SERVER_URL.accesslog, { params: { page: page.value, size: size.value } })
            .then(res => accesslogs.value = res.data),
        count()
    ]);
}
/**
 * 统计
 */
const count = async (): Promise<void> => {
    await instance.get(SERVER_URL.accesslog.concat("/count")).then(res => total.value = res.data);
}
</script>