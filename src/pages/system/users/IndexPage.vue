<template>
  <q-page padding>
    <q-dialog v-model="visible" persistent>
      <q-card style="min-width: 25em">
        <q-form @submit="onSubmit" @reset="onReset">
          <q-card-section>
            <div class="text-h6">{{ $t('users') }}</div>
          </q-card-section>

          <q-card-section>
            <q-input v-model="form.username" label="Your username" lazy-rules
              :rules="[val => val && val.length > 0 || 'Please type something']" />

            <q-input v-model="form.email" label="Your email *" lazy-rules type="email"
              :rules="[val => val && val.length > 0 || 'Please type something']" />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn title="cancel" type="reset" unelevated :label="$t('cancel')" v-close-popup />
            <q-btn title="submit" type="submit" :label="$t('submit')" color="primary" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <q-table flat ref="tableRef" :title="$t('users')" selection="multiple" v-model:selected="selected" :rows="rows"
      :columns="columns" row-key="id" v-model:pagination="pagination" :loading="loading" :filter="filter"
      binary-state-sort @request="onRequest" class="full-width">
      <template v-slot:top-right>
        <q-input dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="mdi-search" />
          </template>
        </q-input>
        <q-btn title="add" rounded color="primary" class="q-mx-md" :disable="loading" icon="mdi-plus" :label="$t('add')"
          @click="addRow" />
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

      <template v-slot:body-cell-username="props">
        <q-td :props="props">
          <q-avatar size="md">
            <q-img alt="avatar" :src="props.row.avatar" width="2em" height="2em" />
          </q-avatar>
          <span class="q-ml-sm">{{ props.row.username }}</span>
        </q-td>
      </template>
      <template v-slot:body-cell-enabled="props">
        <q-td :props="props">
          <q-toggle v-model="props.row.enabled" size="sm" color="positive" />
        </q-td>
      </template>
      <template v-slot:body-cell-accountExpiresAt="props">
        <q-td :props="props">
          <q-badge :color="calculate(props.row.accountExpiresAt)" rounded class="q-mr-sm" />
          {{ date.formatDate(props.row.accountExpiresAt, 'YYYY/MM/DD HH:mm:ss') }}
        </q-td>
      </template>
      <template v-slot:body-cell-credentialsExpiresAt="props">
        <q-td :props="props">
          <q-badge :color="calculate(props.row.credentialsExpiresAt)" rounded class="q-mr-sm" />
          {{ date.formatDate(props.row.credentialsExpiresAt, 'YYYY/MM/DD HH: mm:ss') }}
        </q-td>
      </template>
      <template v-slot:body-cell-accountNonLocked="props">
        <q-td :props="props">
          <q-btn title="accountNonLocked" padding="xs" flat round :disable="loading"
            :color="props.row.accountNonLocked ? 'positive' : 'warning'"
            :icon="props.row.accountNonLocked ? 'mdi-lock-open-variant-outline' : 'mdi-lock-outline'"
            @click="lockRow(props.row)" />
        </q-td>
      </template>
      <template v-slot:body-cell-id="props">
        <q-td :props="props">
          <q-btn title="edit" padding="xs" flat round color="primary" icon="mdi-pencil-outline"
            @click="editRow(props.row.id)" class="q-mt-none" />
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
import { exportFile, useQuasar, date } from 'quasar'
import { retrieveUsers, fetchUser } from 'src/api/users'

import type { User } from 'src/models'

const $q = useQuasar()

const visible = ref<boolean>(false)

const tableRef = ref()
const rows = ref<QTableProps['rows']>([])
const filter = ref('')
const loading = ref<boolean>(false)

const form = ref<User>({
  username: '',
  email: '',
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
  { name: 'username', label: 'username', align: 'left', field: 'username', sortable: true },
  { name: 'email', label: 'email', align: 'center', field: 'email', sortable: true },
  { name: 'enabled', label: 'enabled', align: 'center', field: 'enabled' },
  { name: 'accountNonLocked', label: 'accountNonLocked', align: 'center', field: 'accountNonLocked' },
  { name: 'accountExpiresAt', label: 'accountExpiresAt', align: 'center', field: 'accountExpiresAt', sortable: true },
  { name: 'credentialsExpiresAt', label: 'credentialsExpiresAt', align: 'center', field: 'credentialsExpiresAt', sortable: true },
  { name: 'id', label: 'actions', field: 'id' }
]

onMounted(() => {
  if (tableRef.value) {
    tableRef.value.requestServerInteraction()
  }
})

async function onRequest(props: Parameters<NonNullable<QTableProps['onRequest']>>[0]) {
  loading.value = true

  const { page, rowsPerPage, sortBy, descending } = props.pagination
  const filter = props.filter

  const params = { page, size: rowsPerPage, sortBy, descending, filter: filter || '' }

  retrieveUsers(page, rowsPerPage, { params }).then(res => {
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

function addRow() {
  visible.value = true
}

async function editRow(id: number) {
  visible.value = true
  // You can populate the form with existing user data based on the id
  if (id) {
    fetchUser(id).then(res => { form.value = res.data })
  }
}

function removeRow(id: number) {
  console.log('Removing user with ID:', id)
  loading.value = true
  // You can send a request to delete the user with the specified id
  setTimeout(() => {
    loading.value = false
    // Refresh the table data after deleting the user
    tableRef.value?.requestServerInteraction()
  }, 500)
}

/**
 * 解锁/上锁
 * @param row 数据行
 */
function lockRow(row: User) {
  // You can populate the form with existing user data based on the id
  if (row) {
    row.accountNonLocked = !row.accountNonLocked
  }
}

async function onSubmit() {
  // Close the dialog after submitting
  visible.value = false
}

function onReset() {
  // Reset the form data
  form.value.username = ''
  form.value.email = ''
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

function calculate(target: string) {
  const now = new Date()
  const targetDate = new Date(target)
  // 失效时间是否小于7天
  const diff = date.getDateDiff(targetDate, now, 'days')
  if (diff > 7) {
    return 'positive'
  } else {
    // 是否失效
    const diffSec = date.getDateDiff(targetDate, now, 'seconds')
    if (diffSec > 0) {
      return 'warning'
    } else {
      return 'negative'
    }
  }
}
</script>
