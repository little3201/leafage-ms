<template>
  <q-page padding>

    <q-dialog v-model="visible" persistent>
      <q-card style="min-width: 25em">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-card-section>
            <div class="text-h6">Group</div>
          </q-card-section>

          <q-card-section>
            <q-input v-model="form.name" label="Region name" lazy-rules
              :rules="[val => val && val.length > 0 || 'Please type something']" />

            <q-input v-model="form.description" label="Region deacription" type="textarea" />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn title="cancel" type="reset" unelevated label="Cancel" v-close-popup />
            <q-btn title="submit" type="submit" label="Submit" color="primary" />
          </q-card-actions>

        </q-form>
      </q-card>
    </q-dialog>

    <q-table flat ref="tableRef" :title="$t('privileges')" selection="multiple" v-model:selected="selected" :rows="rows"
      :columns="columns" row-key="id" v-model:pagination="pagination" :loading="loading" :filter="filter"
      binary-state-sort @request="onRequest" class="full-width">
      <template v-slot:top-right>
        <q-input dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="mdi-search" />
          </template>
        </q-input>
        <q-btn title="refresh" round flat color="primary" class="q-mx-md" :disable="loading" icon="mdi-refresh"
          @click="refresh" />
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

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn title="expand" round flat dense @click="props.expand = !props.expand"
              :icon="props.expand ? 'mdi-chevron-down' : 'mdi-chevron-right'" />
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name">
            <div v-if="col.name === 'id'" class="text-right">
              <q-btn title="edit" padding="xs" flat round color="primary" icon="mdi-pencil-outline"
                @click="editRow(col.value)" class="q-mt-none" />
            </div>
            <div v-else-if="col.name === 'enabled'" class="text-center">
              <q-toggle v-model="props.row.enabled" size="sm" color="positive" />
            </div>
            <div v-else-if="col.name === 'name'">
              <q-icon :name="props.row.icon" size="sm" class="q-pr-sm" />{{ col.value }}
            </div>
            <span v-else>{{ col.value }}</span>
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%" class="q-pr-none">
            <sub-page v-if="props.expand" :title="props.row.name" :superior-id="props.row.id" />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { QTableProps } from 'quasar'
import { exportFile, useQuasar } from 'quasar'
import { api } from 'boot/axios'
import SubPage from './SubPage.vue'

import { SERVER_URL } from 'src/api/paths'
import type { Privilege } from 'src/models'

const $q = useQuasar()

const visible = ref<boolean>(false)

const tableRef = ref()
const rows = ref<QTableProps['rows']>([])
const filter = ref('')
const loading = ref<boolean>(false)

const form = ref<Privilege>({
  name: '',
  path: '',
  icon: '',
  order: 1,
  description: ''
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
  { name: 'name', label: 'name', align: 'left', field: 'name', sortable: true },
  { name: 'path', label: 'path', align: 'left', field: 'path', sortable: true },
  { name: 'enabled', label: 'enabled', align: 'center', field: 'enabled' },
  { name: 'description', label: 'description', align: 'left', field: 'description' },
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
  const filter = props.filter

  const params = { page: page - 1, size: rowsPerPage, sortBy, descending, filter: filter || '' }

  await api.get(SERVER_URL.PRIVILEGE, { params }).then(res => {
    rows.value = res.data.content
    pagination.value.page = page
    pagination.value.sortBy = sortBy
    pagination.value.rowsNumber = res.data.totalElements
    pagination.value.rowsPerPage = rowsPerPage
    pagination.value.sortBy = res.data.sortBy
    pagination.value.descending = descending
  }).catch(error => {
    $q.notify({
      message: error.message,
      type: 'negative'
    })
  }).finally(() => {
    loading.value = false
  })
}

function refresh() {
  tableRef.value.requestServerInteraction()
}

function editRow(id: number) {
  visible.value = true
  // You can populate the form with existing user data based on the id
  if (rows.value) {
    const row = rows.value.find(u => u.id === id)
    if (row) {
      form.value = { ...row }
    }
  }
}

function onSubmit() {
  // Close the dialog after submitting
  visible.value = false
}

function onReset() { }

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
