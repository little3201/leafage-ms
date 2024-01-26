<template>
  <q-page class="row items-center justify-evenly" padding>

    <q-dialog v-model="visible" persistent>
      <q-card style="min-width: 350px">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-card-section>
            <div class="text-h6">{{ editingUser ? 'Edit User' : 'Add User' }}</div>
          </q-card-section>

          <q-card-section>
            <q-input v-model="form.username" label="Your username" hint="For login" lazy-rules
              :rules="[val => val && val.length > 0 || 'Please type something']" />

            <q-input v-model="form.firstname" label="Your firstname *" lazy-rules
              :rules="[val => val && val.length > 0 || 'Please type something']" />

            <q-input v-model="form.lastname" label="Your lastname *" lazy-rules
              :rules="[val => val && val.length > 0 || 'Please type something']" />

            <q-input v-model="form.description" label="Deacription" type="textarea" />

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
        <q-btn color="primary" :disable="loading" label="Add User" @click="addUser" />
      </template>
      <template v-slot:body-cell-username="props">
        <q-td :props="props">
          <q-avatar size="md" class="q-mt-none">
            <q-img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
          <span class="q-ml-sm">{{ props.row.username }}</span>
        </q-td>
      </template>
      <template v-slot:body-cell-lastModifiedDate="props">
        <q-td :props="props">
          {{ date.formatDate(props.row.lastModifiedDate, 'YYYY/MM/DD HH:mm') }}
        </q-td>
      </template>
      <template v-slot:body-cell-id="props">
        <q-td :props="props">
          <q-btn size="sm" title="edit" round color="primary" icon="sym_r_edit" @click="editUser(props.row.id)"
            class="q-mt-none" />
          <q-btn size="sm" title="delete" round color="primary" icon="sym_r_delete" @click="removeUser(props.row.id)"
            class="q-mt-none q-ml-sm" />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { QTableProps } from 'quasar'
import { date } from 'quasar'

import type { User } from 'src/api/models.type'

import { api } from 'boot/axios'
import { SERVER_URL } from 'src/api/paths'

const visible = ref<boolean>(false)
const editingUser = ref<boolean>(false)

const tableRef = ref()
const rows = ref<QTableProps['rows']>([])
const filter = ref('')
const loading = ref(false)

const form = ref<User>({
  username: '',
  firstname: '',
  lastname: '',
  description: ''
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
  { name: 'username', label: 'Username', field: 'username', sortable: true },
  { name: 'firstname', label: 'First Name', field: 'firstname', sortable: true },
  { name: 'lastname', label: 'Last Name', field: 'lastname', sortable: true },
  { name: 'accountNonLocked', label: 'Is Locked', field: 'accountNonLocked' },
  { name: 'accountExpiresAt', label: 'Expires At', field: 'accountExpiresAt' },
  { name: 'credentialsExpiresAt', label: 'Credentials Expires At', field: 'credentialsExpiresAt' },
  { name: 'lastModifiedDate', label: 'Last Modified Date', field: 'lastModifiedDate', sortable: true },
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
    .finally(() => {
      loading.value = false
    })
}

function addUser() {
  visible.value = true
  editingUser.value = false
}

function editUser(id: number) {
  visible.value = true
  editingUser.value = true
  // You can populate the form with existing user data based on the id
  if (rows.value) {
    const user = rows.value.find(u => u.id === id)
    if (user) {
      form.value = { ...user }
    }
  }
}

function removeUser(id: number) {
  console.log('Removing user with ID:', id)
  loading.value = true
  // You can send a request to delete the user with the specified id
  setTimeout(() => {
    loading.value = false
    // Refresh the table data after deleting the user
    tableRef.value?.requestServerInteraction()
  }, 500)
}

async function onSubmit() {
  if (editingUser.value) {
    // Logic for editing an existing user
    // You may need to send a request to update the user with the form data
  } else {
    // Logic for adding a new user
    // You may need to send a request to add a new user with the form data
  }

  // Close the dialog after submitting
  visible.value = false
}

function onReset() {
  // Reset the form data
  form.value.username = ''
  form.value.firstname = ''
  form.value.lastname = ''
}
</script>
