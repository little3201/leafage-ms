<template>
  <q-page class="row items-center justify-evenly" padding>
    <q-table flat bordered ref="tableRef" title="Users" :rows="rows" :columns="columns" row-key="id"
      v-model:pagination="pagination" :loading="loading" :filter="filter" binary-state-sort @request="onRequest" />
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { QTableProps } from 'quasar'
import { api } from 'boot/axios'
import { SERVER_URL } from 'src/api/constant'

const tableRef = ref()
const rows = ref<QTableProps['rows']>([])
const filter = ref('')
const loading = ref(false)
const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 3,
  rowsNumber: 10
})

const columns: QTableProps['columns'] = [
  {
    name: 'name',
    required: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: (row: { name: string }) => row.name,
    format: (val: string) => `${val}`,
    sortable: true
  },
  { name: 'username', align: 'center', label: 'username', field: 'username', sortable: true },
  { name: 'nickname', label: 'nickname', field: 'nickname', sortable: true },
  { name: 'avatar', label: 'avatar', field: 'avatar' },
  { name: 'accountNonLocked', label: 'non locked', field: 'accountNonLocked' },
  { name: 'accountExpiresAt', label: 'expires at', field: 'accountExpiresAt' },
  { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10) }
]

onMounted(() => {
  tableRef.value.requestServerInteraction()
})

/**
 * 查询列表
 */
const onRequest: QTableProps['onRequest'] = async (props) => {
  loading.value = true
  const { page, rowsPerPage, descending } = props.pagination

  const params = { page: page - 1, size: rowsPerPage }
  await api.get(SERVER_URL.user, { params }).then(res => {
    rows.value = res.data.content
    pagination.value.page = page
    pagination.value.rowsPerPage = rowsPerPage
    pagination.value.sortBy = res.data.sortBy
    pagination.value.descending = descending
  }).catch(error => console.log(error))
    .finally(function () {
      loading.value = false
    })
}
</script>
