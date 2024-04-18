<template>
  <q-page class="row items-center justify-evenly" padding>

    <q-dialog v-model="visiable" persistent>
      <q-card style="min-width: 350px">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-card-section>
            <div class="text-h6">Dictionary</div>
          </q-card-section>

          <q-card-section>
            <q-input v-model="form.name" label="Dictionary name" lazy-rules
              :rules="[val => val && val.length > 0 || 'Please type something']" />

            <q-input v-model="form.description" label="Dictionary deacription" type="textarea" />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" type="reset" v-close-popup />
            <q-btn type="submit" label="Submit" color="primary" />
          </q-card-actions>

        </q-form>
      </q-card>
    </q-dialog>

    <q-table flat bordered ref="tableRef" title="Dictionaries" :rows="rows" :columns="columns" row-key="id"
      :loading="loading" v-model:pagination="pagination" binary-state-sort @request="onRequest" class="full-width">
      <template v-slot:top-right>
        <q-btn color="primary" title="refresh" :disable="loading" icon="sym_r_refresh" label="Refresh"
          @click="refresh" />
        <q-btn color="primary" title="export" class="q-ml-sm" icon="sym_r_sim_card_download" label="Export"
          @click="exportTable" />
      </template>

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn round flat dense @click="props.expand = !props.expand"
              :icon="props.expand ? 'sym_r_expand_less' : 'sym_r_expand_more'" />
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name">
            <span v-if="col.name == 'lastModifiedDate'">
              {{ date.formatDate(col.value, 'YYYY/MM/DD HH:mm') }}
            </span>
            <div v-else-if="col.name == 'id'" class="text-right">
              <q-btn size="sm" title="edit" round color="primary" icon="sym_r_edit" @click="editRow(col.value)"
                class="q-mt-none" />
            </div>
            <div v-else-if="col.name == 'enabled'" class="text-center">
              <q-toggle v-model="props.row.enabled" color="green" />
            </div>
            <span v-else>{{ col.value }}</span>
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <sub-page v-if="props.expand" :title="props.row.name" :superior-id="props.row.id" />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { exportFile, useQuasar, date } from 'quasar'
import type { QTableProps } from 'quasar'
import { api } from 'boot/axios'
import SubPage from './SubPage.vue'

import { SERVER_URL } from 'src/api/paths'
import type { Dictionary } from 'src/api/models.type'

const $q = useQuasar()

const visiable = ref<boolean>(false)

const tableRef = ref()
const rows = ref<QTableProps['rows']>([])
const loading = ref(false)

const form = ref<Dictionary>({
  name: '',
  description: ''
})

const pagination = ref({
  sortBy: 'lastModifiedDate',
  descending: false,
  page: 1,
  rowsPerPage: 7,
  rowsNumber: 10
})

const columns: QTableProps['columns'] = [
  { name: 'name', label: 'Name', align: 'left', field: 'name', sortable: true },
  { name: 'enabled', label: 'Enabled', align: 'center', field: 'enabled' },
  { name: 'description', label: 'Description', align: 'left', field: 'description' },
  { name: 'lastModifiedDate', label: 'Last Modified Date', align: 'left', field: 'lastModifiedDate', sortable: true },
  { name: 'id', label: 'Actions', field: 'id' }
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

  const params = { page: page - 1, size: rowsPerPage }

  await api.get(SERVER_URL.DICTIONARY, { params }).then(res => {
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
  }).finally(() => { loading.value = false })
}

function refresh() {
  tableRef.value.requestServerInteraction()
}

function editRow(id: number) {
  visiable.value = true
  console.log('id: ', id)
}

function onSubmit() { }

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
