<template>
  <q-page class="row items-center justify-evenly" padding>

    <q-dialog v-model="visiable" persistent>
      <q-card style="min-width: 350px">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-card-section>
            <div class="text-h6">User</div>
          </q-card-section>

          <q-card-section>
            <q-input v-model="name" label="Your name *" hint="Name and surname" lazy-rules
              :rules="[val => val && val.length > 0 || 'Please type something']" />

            <q-input type="number" v-model="age" label="Your age *" lazy-rules :rules="[
              val => val !== null && val !== '' || 'Please type your age',
              val => val > 0 && val < 100 || 'Please type a real age'
            ]" />

            <q-toggle v-model="accept" label="I accept the license and terms" />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" type="reset" v-close-popup />
            <q-btn type="submit" label="Submit" color="primary" />
          </q-card-actions>

        </q-form>
      </q-card>
    </q-dialog>

    <q-table flat bordered ref="tableRef" title="User" selection="multiple" v-model:selected="selected" :rows="rows"
      :columns="columns" row-key="id" v-model:pagination="pagination" :loading="loading" :filter="filter"
      binary-state-sort @request="onRequest" class="full-width">
      <template v-slot:top>
        <div class="col-2 q-table__title">Users</div>
        <q-space />
        <q-btn color="primary" :disable="loading" label="Add row" @click="addRow" />
      </template>
      <template v-slot:body-cell-username="props">
        <q-td :props="props">
          <q-avatar size="md" class="q-mt-none">
            <!-- <img alt="avatar" src="https://cdn.quasar.dev/img/avatar.png"> -->
            <q-img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
          <span class="q-ml-sm">{{ props.row.username }}</span>
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

import { api } from 'boot/axios'
import { SERVER_URL } from 'src/api/paths'

const visiable = ref<boolean>(false)

const tableRef = ref()
const rows = ref<QTableProps['rows']>([])
const filter = ref('')
const loading = ref(false)

const name = ref(null)
const age = ref(null)
const accept = ref(false)

const pagination = ref({
  sortBy: 'lastModifiedDate',
  descending: false,
  page: 1,
  rowsPerPage: 7,
  rowsNumber: 10
})

const selected = ref([])

const columns: QTableProps['columns'] = [
  { name: 'index', label: '#', field: 'index' },
  { name: 'username', label: 'username', field: 'username', sortable: true },
  { name: 'firstname', label: 'firstname', field: 'firstname', sortable: true },
  { name: 'lastname', label: 'lastname', field: 'lastname', sortable: true },
  { name: 'accountNonLocked', label: 'is locked', field: 'accountNonLocked' },
  { name: 'accountExpiresAt', label: 'expires at', field: 'accountExpiresAt' },
  { name: 'credentialsExpiresAt', label: 'credentials expires at', field: 'credentialsExpiresAt' },
  { name: 'lastModifiedDate', label: 'last modified date', field: 'lastModifiedDate', sortable: true },
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

  const params = { page: page - 1, size: rowsPerPage }
  await api.get(SERVER_URL.USER, { params }).then(res => {
    rows.value = res.data.content
    pagination.value.page = page
    pagination.value.sortBy = sortBy
    pagination.value.rowsNumber = res.data.totalElements
    pagination.value.rowsPerPage = rowsPerPage
    pagination.value.sortBy = res.data.sortBy
    pagination.value.descending = descending
  }).catch(error => console.log(error))
    .finally(function () {
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
</script>
src/api/paths
