<template>
  <q-page padding>

    <q-dialog v-model="visible" persistent>
      <q-card style="min-width: 25em">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-card-section>
            <div class="text-h6">{{ $t('dictionaries') }}</div>
          </q-card-section>

          <q-card-section>
            <q-input v-model="form.name" label="Dictionary name" lazy-rules
              :rules="[val => val && val.length > 0 || 'Please type something']" />

            <q-input v-model="form.description" label="Dictionary deacription" type="textarea" />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn title="cancel" type="reset" unelevated :label="$t('cancel')" v-close-popup />
            <q-btn title="submit" type="submit" :label="$t('submit')" color="primary" />
          </q-card-actions>

        </q-form>
      </q-card>
    </q-dialog>

    <q-table flat ref="tableRef" :title="$t('dictionaries')" :rows="rows" :columns="columns" row-key="id"
      :loading="loading" v-model:pagination="pagination" binary-state-sort @request="onRequest" class="full-width">
      <template v-slot:top-right>
        <q-input dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="sym_r_search" />
          </template>
        </q-input>
        <q-btn title="refresh" round flat color="primary" class="q-mx-md" :disable="loading" icon="sym_r_refresh"
          @click="refresh" />
        <q-btn title="export" rounded outline color="primary" icon="sym_r_file_save" :label="$t('export')"
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
              :icon="props.expand ? 'sym_r_keyboard_arrow_down' : 'sym_r_keyboard_arrow_right'" />
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name">
            <div v-if="col.name === 'id'" class="text-right">
              <q-btn title="edit" padding="xs" flat round color="primary" icon="sym_r_edit" @click="editRow(col.value)"
                class="q-mt-none" />
            </div>
            <div v-else-if="col.name === 'enabled'" class="text-center">
              <q-toggle v-model="props.row.enabled" size="sm" color="positive" />
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
import { exportFile, useQuasar } from 'quasar'
import type { QTableProps } from 'quasar'
import { retrieveDictionaries, fetchDictionary } from 'src/api/dictionaries'

import SubPage from './SubPage.vue'

import type { Dictionary } from 'src/models'

const $q = useQuasar()

const visible = ref<boolean>(false)

const tableRef = ref()
const rows = ref<QTableProps['rows']>([])
const filter = ref('')
const loading = ref(false)

const form = ref<Dictionary>({
  name: '',
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

const columns: QTableProps['columns'] = [
  { name: 'name', label: 'name', align: 'left', field: 'name', sortable: true },
  { name: 'order', label: 'order', align: 'left', field: 'order' },
  { name: 'enabled', label: 'enabled', align: 'center', field: 'enabled' },
  { name: 'description', label: 'description', align: 'left', field: 'description' },
  { name: 'id', label: 'actions', field: 'id' }
]

onMounted(async () => {
  tableRef.value.requestServerInteraction()
})

/**
 * 查询列表
 */
async function onRequest(props: Parameters<NonNullable<QTableProps['onRequest']>>[0]) {
  loading.value = true

  const { page, rowsPerPage, sortBy, descending } = props.pagination
  const filter = props.filter

  const params = { sortBy, descending, filter: filter || '' }

  retrieveDictionaries(page, rowsPerPage, params).then(res => {
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
  }).finally(() => { loading.value = false })
}

function refresh() {
  tableRef.value.requestServerInteraction()
}

async function editRow(id: number) {
  visible.value = true
  // You can populate the form with existing user data based on the id
  if (id) {
    fetchDictionary(id).then(res => { form.value = res.data })
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
