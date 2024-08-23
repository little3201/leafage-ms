<template>
  <q-page padding>

    <q-dialog v-model="visible" persistent>
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ $t('accessLog') }}</div>
          <q-space />
          <q-btn icon="mdi-close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          xxxxxx
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-table flat ref="tableRef" :title="$t('operationLog')" selection="multiple" v-model:selected="selected"
      :rows="rows" :columns="columns" row-key="id" v-model:pagination="pagination" :loading="loading" :filter="filter"
      binary-state-sort @request="onRequest" class="full-width">
      <template v-slot:top-right>
        <q-input dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="mdi-search" />
          </template>
        </q-input>
        <q-btn title="export" rounded outline color="primary" icon="mdi-file-download-outline" :label="$t('export')"
          @click="exportTable" />
      </template>

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ $t(col.label) }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-chip v-if="props.row.status" size="sm" color="positive" text-color="white">{{ $t('success') }}</q-chip>
          <q-chip v-else size="sm" color="negative" text-color="white">{{ $t('failure') }}</q-chip>
        </q-td>
      </template>
      <template v-slot:body-cell-id="props">
        <q-td :props="props">
          <q-btn title="detail" padding="xs" flat round color="primary" icon="mdi-file-document-outline"
            @click="showRow(props.row.id)" class="q-mt-none" />
          <q-btn title="delete" padding="xs" flat round color="negative" icon="mdi-trash-can-outline"
            @click="removeRow(props.row.id)" class="q-mt-none q-ml-sm" />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { QTableProps } from 'quasar'
import { exportFile, useQuasar } from 'quasar'
import { retrieveOperationLogs, fetchOperationLog } from 'src/api/operation-logs'

import type { OperationLog } from 'src/models'

const $q = useQuasar()

const visible = ref<boolean>(false)

const tableRef = ref()
const rows = ref<QTableProps['rows']>([])
const filter = ref('')
const loading = ref<boolean>(false)

const row = ref<OperationLog>({
  id: undefined,
  module: '',
  operator: '',
  method: 'PST',
  operation: '',
  params: null,
  ip: '',
  location: '',
  status: null,
  operatedTime: null
})

const pagination = ref({
  sortBy: 'id',
  descending: true,
  page: 1,
  rowsPerPage: 7,
  rowsNumber: 0
})

const selected = ref([])

const columns: QTableProps['columns'] = [
  { name: 'module', label: 'module', align: 'left', field: 'module' },
  { name: 'operation', label: 'operation', align: 'left', field: 'operation' },
  { name: 'method', label: 'method', align: 'left', field: 'method' },
  { name: 'params', label: 'params', align: 'center', field: 'params' },
  { name: 'operator', label: 'operator', align: 'center', field: 'operator' },
  { name: 'ip', label: 'ip', align: 'center', field: 'ip' },
  { name: 'location', label: 'location', align: 'center', field: 'location' },
  { name: 'status', label: 'status', align: 'center', field: 'status' },
  { name: 'operatedTime', label: 'operatedTime', align: 'center', field: 'operatedTime' },
  { name: 'id', label: 'actions', field: 'id' }
]

onMounted(() => {
  tableRef.value.requestServerInteraction()
})

/**
 * 查询列表
 */
async function onRequest(props: Parameters<NonNullable<QTableProps['onRequest']>>[0]) {
  loading.value = true

  const { page, rowsPerPage, sortBy, descending } = props.pagination

  retrieveOperationLogs(page, rowsPerPage).then(res => {
    pagination.value.page = page
    pagination.value.rowsPerPage = rowsPerPage
    pagination.value.sortBy = sortBy
    pagination.value.descending = descending

    rows.value = res.data.content
    pagination.value.rowsNumber = res.data.totalElements
  }).catch(error => {
    $q.notify({
      message: error.message,
      type: 'negative'
    })
  }).finally(() => {
    loading.value = false
  })
}

function showRow(id: number) {
  visible.value = true
  if (id) {
    fetchOperationLog(id).then(res => { row.value = res.data })
  }
}

function removeRow(id: number) {
  console.log('id: ', id)
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 500)
}

function wrapCsvValue(val: string, formatFn?: (val: string, row?: string) => string, row?: string) {
  let formatted = formatFn !== void 0 ? formatFn(val, row) : val

  formatted = formatted === void 0 || formatted === null ? '' : String(formatted)

  formatted = formatted.split('"').join('""')

  return `"${formatted}"`
}

function exportTable() {
  if (!columns || !rows.value || columns.length === 0 || rows.value.length === 0) {
    // Handle the case where columns or rows are undefined or empty
    console.error('Columns or rows are undefined or empty.')
    return
  }
  // naive encoding to csv format
  const content = [columns.map(col => wrapCsvValue(col.label))]
    .concat(rows.value.map(row => columns.map(col =>
      wrapCsvValue(typeof col.field === 'function' ? col.field(row) : row[col.field === void 0 ? col.name : col.field],
        col.format,
        row
      )).join(','))
    ).join('\r\n')

  const status = exportFile(
    'table-export.csv',
    content,
    'text/csv'
  )

  if (status !== true) {
    $q.notify({
      message: 'Browser denied file download...',
      color: 'negative',
      icon: 'warning'
    })
  }
}
</script>
