<template>
  <q-page class="row items-center justify-evenly" padding>

    <q-dialog v-model="visiable" persistent>
      <q-card style="min-width: 350px">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-card-section>
            <div class="text-h6">Group</div>
          </q-card-section>

          <q-card-section>
            <q-input v-model="form.name" label="Group name" lazy-rules
              :rules="[val => val && val.length > 0 || 'Please type something']" />

            <q-input v-model="form.description" label="Group deacription" type="textarea" />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" type="reset" v-close-popup />
            <q-btn type="submit" label="Submit" color="primary" />
          </q-card-actions>

        </q-form>
      </q-card>
    </q-dialog>

    <q-table flat bordered ref="tableRef" title="Group" selection="multiple" v-model:selected="selected" :rows="rows"
      :columns="columns" row-key="id" v-model:pagination="pagination" :loading="loading" :filter="filter"
      binary-state-sort @request="onRequest" class="full-width">
      <template v-slot:top>
        <div class="col-2 q-table__title">Users</div>
        <q-space />
        <q-btn color="primary" :disable="loading" label="Add row" @click="addRow" />
      </template>
      <template v-slot:body-cell-members="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-avatar v-for="n in 5" :key="n" size="32px" :style="{ marginLeft: '-12px', border: '2px solid white' }">
            <q-img :src="`https://cdn.quasar.dev/img/avatar${n + 1}.jpg`" />
          </q-avatar>
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
import { date } from 'quasar'

import type { Group } from 'src/api/models.type'

import { api } from 'boot/axios'
import { SERVER_URL } from 'src/api/paths'

const visiable = ref<boolean>(false)

const tableRef = ref()
const rows = ref<QTableProps['rows']>([])
const filter = ref('')
const loading = ref(false)

const form = ref<Group>({
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

const selected = ref([])

const columns: QTableProps['columns'] = [
  { name: 'name', label: 'name', field: 'name', sortable: true },
  { name: 'members', label: 'members', field: 'members' },
  { name: 'description', label: 'description', field: 'description' },
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
  await api.get(SERVER_URL.GROUP, { params }).then(res => {
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
