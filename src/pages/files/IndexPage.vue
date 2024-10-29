<template>
  <q-page padding>

    <q-dialog v-model="visible" persistent>
      <q-card style="min-width: 25em">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-card-section>
            <div class="text-h6">{{ $t('regions') }}</div>
          </q-card-section>

          <q-card-section>
            <q-input v-model="form.name" :label="$t('name')" lazy-rules
              :rules="[val => val && val.length > 0 || 'Please type something']" />
            <q-input v-model="form.type" :label="$t('type')" lazy-rules />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn title="cancel" type="reset" unelevated :label="$t('cancel')" v-close-popup />
            <q-btn title="submit" type="submit" :label="$t('submit')" color="primary" />
          </q-card-actions>

        </q-form>
      </q-card>
    </q-dialog>

    <q-table flat ref="tableRef" :title="$t('files')" :rows="rows" :columns="columns" row-key="id"
      v-model:pagination="pagination" :loading="loading" :filter="filter" binary-state-sort @request="onRequest"
      class="full-width">
      <template v-slot:top-right>
        <q-input dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="sym_r_search" />
          </template>
        </q-input>
        <q-btn title="upload" rounded color="primary" class="q-mx-md" :disable="loading" icon="sym_r_upload"
          :label="$t('upload')" @click="uploadRow" />
      </template>

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ $t(col.label) }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body-cell-size="props">
        <q-td :props="props">
          {{ formatFileSize(props.row.size) }}
        </q-td>
      </template>
      <template v-slot:body-cell-id="props">
        <q-td :props="props">
          <q-btn title="download" padding="xs" flat round color="primary" icon="sym_r_download"
            @click="downloadRow(props.row.id)" class="q-mt-none" />
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
import { useQuasar } from 'quasar'
import { retrieveFiles, fetchFile } from 'src/api/files'
import { formatFileSize } from 'src/utils'
import type { FileRecord } from 'src/models'

const $q = useQuasar()

const visible = ref<boolean>(false)

const tableRef = ref()
const rows = ref<QTableProps['rows']>([])
const filter = ref('')
const loading = ref<boolean>(false)

const form = ref<FileRecord>({
  name: '',
  type: '',
  size: 0
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
  { name: 'type', label: 'type', align: 'left', field: 'type', sortable: true },
  { name: 'size', label: 'size', align: 'left', field: 'size', sortable: true },
  { name: 'lastModifiedDate', label: 'lastModifiedDate', align: 'center', field: 'lastModifiedDate' },
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

  const params = { page, size: rowsPerPage, sortBy, descending }

  retrieveFiles({ ...params }, filter).then(res => {
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

function uploadRow() {
  visible.value = true
}

async function downloadRow(id: number) {
  visible.value = true
  // You can populate the form with existing user data based on the id
  if (id) {
    fetchFile(id).then(res => { form.value = res.data })
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
</script>
