<template>
  <q-page class="row items-center justify-evenly" padding>

    <q-dialog v-model="visiable" persistent>
      <q-card style="min-width: 350px">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-card-section>
            <div class="text-h6">Group</div>
          </q-card-section>

          <q-card-section>
            <q-input v-model="form.groupName" label="Group name" lazy-rules
              :rules="[val => val && val.length > 0 || 'Please type something']" />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" type="reset" v-close-popup />
            <q-btn type="submit" label="Submit" color="primary" />
          </q-card-actions>

        </q-form>
      </q-card>
    </q-dialog>

    <q-table flat bordered ref="tableRef" title="Groups" selection="multiple" v-model:selected="selected" :rows="rows"
      :columns="columns" row-key="id" v-model:pagination="pagination" :loading="loading" :filter="filter"
      binary-state-sort @request="onRequest" class="full-width">
      <template v-slot:top-right>
        <q-btn color="primary" title="add" :disable="loading" icon="sym_r_add" label="Add" @click="addRow" />
        <q-btn color="primary" title="export" class="q-ml-sm" icon="sym_r_sim_card_download" label="Export"
          @click="exportTable" />
      </template>
      <template v-slot:body-cell-members="props">
        <q-td :props="props" class="q-gutter-sm">
          <div class="no-margin">
            <q-avatar v-for="n in 5" :key="n" size="32px" :style="{ left: `${n * -2}px`, border: '2px solid white' }">
              <img :src="`https://cdn.quasar.dev/img/avatar${n + 1}.jpg`" />
            </q-avatar>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-enabled="props">
        <q-td :props="props">
          <q-toggle v-model="props.row.enabled" color="green" />
        </q-td>
      </template>
      <template v-slot:body-cell-lastModifiedDate="props">
        <q-td :props="props">
          {{ date.formatDate(props.row.lastModifiedDate, 'YYYY/MM/DD HH:mm') }}
        </q-td>
      </template>

      <template v-slot:body-cell-id="props">
        <q-td :props="props">
          <q-btn size="sm" title="edit" round color="primary" icon="sym_r_edit" @click="editRow(props.row.id)"
            class="q-mt-none" />
          <q-btn size="sm" title="delete" round color="primary" icon="sym_r_delete" @click="removeRow(props.row.id)"
            class="q-mt-none q-ml-sm" />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { QTableProps } from 'quasar'
import { exportFile, useQuasar, date } from 'quasar'
import { api } from 'boot/axios'

import { SERVER_URL } from 'src/api/paths'
import type { Group } from 'src/api/models.type'

const $q = useQuasar()

const visiable = ref<boolean>(false)

const tableRef = ref()
const rows = ref<QTableProps['rows']>([])
const filter = ref('')
const loading = ref(false)

const form = ref<Group>({
  groupName: ''
})

const pagination = ref({
  sortBy: 'lastModifiedDate',
  descending: false,
  page: 1,
  rowsPerPage: 7,
  rowsNumber: 10
})

const selected = ref([])

const columns: QTableProps['columns'] = [
  { name: 'name', label: 'Name', align: 'left', field: 'groupName', sortable: true },
  { name: 'members', label: 'Members', align: 'center', field: 'members' },
  { name: 'enabled', label: 'Enabled', align: 'center', field: 'enabled' },
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

  await api.get(SERVER_URL.GROUP, { params }).then(res => {
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

function addRow() {
  visiable.value = true
}

function editRow(id: number) {
  visiable.value = true
  console.log('id: ', id)
}

function removeRow(id: number) {
  console.log('id: ', id)
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 500)
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
