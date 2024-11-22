<template>
  <q-dialog v-model="visible" persistent>
    <q-card style="min-width: 25em">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-card-section>
          <div class="text-h6">{{ $t('regions') }}</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="form.name" label="Region name" lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type something']" />

          <q-input v-model="form.description" label="Region description" type="textarea" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn title="cancel" type="reset" unelevated :label="$t('cancel')" v-close-popup />
          <q-btn title="submit" type="submit" :label="$t('submit')" color="primary" />
        </q-card-actions>

      </q-form>
    </q-card>
  </q-dialog>

  <q-table flat ref="tableRef" :title="title" selection="multiple" v-model:selected="selected" :rows="rows"
    :columns="columns" row-key="id" v-model:pagination="pagination" :loading="loading" :filter="filter"
    binary-state-sort @request="onRequest" class="full-width">
    <template v-slot:top-right>
      <q-input dense debounce="300" v-model="filter" placeholder="Search">
        <template v-slot:append>
          <q-icon name="sym_r_search" />
        </template>
      </q-input>
      <q-btn title="create" rounded color="primary" class="q-mx-md" :disable="loading" icon="sym_r_add"
        :label="$t('create')" @click="createRow" />
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
            <q-btn title="modify" padding="xs" flat round color="primary" icon="sym_r_edit"
              @click="modifyRow(props.row.id)" class="q-mt-none" />
            <q-btn title="delete" padding="xs" flat round color="negative" icon="sym_r_delete"
              @click="removeRow(props.row.id)" class="q-mt-none q-ml-sm" />
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
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { QTableProps } from 'quasar'
import { exportFile, useQuasar } from 'quasar'
import { retrieveRegions, fetchRegion } from 'src/api/regions'

import type { Region } from 'src/models'

const $q = useQuasar()

const props_ = withDefaults(defineProps<{
  title: string
  superiorId?: number | undefined
}>(), {
  title: '',
  superiorId: undefined
})

const visible = ref<boolean>(false)

const tableRef = ref()
const rows = ref<QTableProps['rows']>([])
const filter = ref('')
const loading = ref<boolean>(false)

const form = ref<Region>({
  name: '',
  areaCode: 0,
  postalCode: 0,
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
  { name: 'postalCode', label: 'postalCode', align: 'left', field: 'postalCode', sortable: true },
  { name: 'areaCode', label: 'areaCode', align: 'left', field: 'areaCode', sortable: true },
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

  const params = { page, size: rowsPerPage, sortBy, descending, filter: filter || '' }

  if (props_.superiorId) {
    filter.superiorId = props_.superiorId
    retrieveRegions({ ...params }, filter).then(res => {
      pagination.value.page = page
      pagination.value.rowsPerPage = rowsPerPage
      pagination.value.sortBy = sortBy
      pagination.value.descending = descending

      rows.value = res.data.content
      pagination.value.rowsNumber = res.data.page.totalElements
    }).catch(error => {
      $q.notify({
        message: error.message,
        type: 'negative'
      })
    }).finally(() => {
      loading.value = false
    })
  }
}

function createRow() {
  visible.value = true
}

async function modifyRow(id: number) {
  visible.value = true
  // You can populate the form with existing user data based on the id
  if (id) {
    fetchRegion(id).then(res => { form.value = res.data })
  }
}

function removeRow(id: number) {
  console.log('id: ', id)
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 500)
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
