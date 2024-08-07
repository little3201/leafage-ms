<template>
  <q-page padding>
    <q-dialog v-model="visible" persistent>
      <q-card style="min-width: 25em">
        <q-form @submit="onSubmit" @reset="onReset">
          <q-card-section>
            <div class="text-h6">User</div>
          </q-card-section>

          <q-card-section>
            <q-input v-model="form.username" label="Your username" lazy-rules
              :rules="[val => val && val.length > 0 || 'Please type something']" />

            <q-input v-model="form.firstname" label="Your firstname *" lazy-rules
              :rules="[val => val && val.length > 0 || 'Please type something']" />

            <q-input v-model="form.lastname" label="Your lastname *" lazy-rules
              :rules="[val => val && val.length > 0 || 'Please type something']" />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn title="cancel" type="reset" unelevated label="Cancel" v-close-popup />
            <q-btn title="submit" type="submit" label="Submit" color="primary" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>


    <q-table flat ref="tableRef" :title="$t('users')" selection="multiple" v-model:selected="selected" :rows="rows"
      :columns="columns" row-key="id" v-model:pagination="pagination" :loading="loading" :filter="filter"
      binary-state-sort @request="onRequest" class="full-width q-pl-md">
      <template v-slot:top-right>
        <q-input dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="sym_r_search" />
          </template>
        </q-input>
        <q-btn title="add" rounded color="primary" class="q-mx-md" :disable="loading" icon="sym_r_add"
          :label="$t('add')" @click="addRow" />
        <q-btn title="export" rounded outline color="primary" icon="sym_r_sim_card_download" :label="$t('export')"
          @click="exportTable" />
      </template>
      <template v-slot:body-cell-username="props">
        <q-td :props="props">
          <q-avatar size="md">
            <img alt="avatar" src="https://cdn.quasar.dev/img/avatar.png" />
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
            :icon="props.row.accountNonLocked ? 'sym_r_lock_open_right' : 'sym_r_lock'" @click="lockRow(props.row)" />
        </q-td>
      </template>
      <template v-slot:body-cell-id="props">
        <q-td :props="props">
          <q-btn title="edit" padding="xs" flat round color="primary" icon="sym_r_edit" @click="editRow(props.row.id)"
            class="q-mt-none" />
          <q-btn title="delete" padding="xs" flat round color="negative" icon="sym_r_delete"
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
import { api } from 'boot/axios'

import { SERVER_URL } from 'src/api/paths'
import type { User } from 'src/models'

const $q = useQuasar()

const visible = ref<boolean>(false)

const tableRef = ref()
const rows = ref<QTableProps['rows']>([])
const filter = ref('')
const loading = ref<boolean>(false)

const form = ref<User>({
  username: '',
  firstname: '',
  lastname: '',
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
  { name: 'username', label: 'Username', align: 'left', field: 'username', sortable: true },
  { name: 'firstname', label: 'Firstname', align: 'left', field: 'firstname', sortable: true },
  { name: 'lastname', label: 'Lastname', align: 'left', field: 'lastname', sortable: true },
  { name: 'enabled', label: 'Enabled', align: 'center', field: 'enabled' },
  { name: 'accountNonLocked', label: 'Is Locked', align: 'center', field: 'accountNonLocked' },
  { name: 'accountExpiresAt', label: 'Expires At', align: 'center', field: 'accountExpiresAt', sortable: true },
  { name: 'credentialsExpiresAt', label: 'Credentials Expires At', align: 'center', field: 'credentialsExpiresAt', sortable: true },
  { name: 'id', label: 'Actions', field: 'id' }
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

  const params = { page: page - 1, size: rowsPerPage, sortBy, descending, filter: filter || '' }

  await api.get(SERVER_URL.USER, { params }).then(res => {
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
  visible.value = true
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
  form.value.firstname = ''
  form.value.lastname = ''
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
