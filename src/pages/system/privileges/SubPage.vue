<template>

  <q-dialog v-model="visible" persistent>
    <q-card style="min-width: 25em">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-card-section>
          <div class="text-h6">{{ $t('privileges') }}</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="form.name" label="Region name" lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type something']" />

          <q-input v-model="form.description" label="Region deacription" type="textarea" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn title="cancel" type="reset" unelevated :label="$t('cancel')" v-close-popup />
          <q-btn title="submit" type="submit" :label="$t('submit')" color="primary" />
        </q-card-actions>

      </q-form>
    </q-card>
  </q-dialog>

  <q-table flat ref="tableRef" :title="title" :rows="rows" :columns="columns" row-key="id"
    v-model:pagination="pagination" :loading="loading" :filter="filter" binary-state-sort @request="onRequest"
    class="full-width">
    <template v-slot:top-right>
      <q-input dense debounce="300" v-model="filter" placeholder="Search">
        <template v-slot:append>
          <q-icon name="mdi-search" />
        </template>
      </q-input>
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
            :icon="props.expand ? 'mdi-chevron-down' : 'mdi-chevron-right'" />
        </q-td>
        <q-td v-for="col in props.cols" :key="col.name">
          <div v-if="col.name === 'id'" class="text-right">
            <q-btn title="edit" padding="xs" flat round color="primary" icon="mdi-pencil-outline"
              @click="editRow(col.value)" class="q-mt-none" />
          </div>
          <div v-else-if="col.name === 'enabled'" class="text-center">
            <q-toggle v-model="props.row.enabled" size="sm" color="positive" />
          </div>
          <div v-else-if="col.name === 'name'">
            <q-icon :name="props.row.icon" size="sm" class="q-pr-sm" />{{ $t(col.value) }}
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
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

import { SERVER_URL } from 'src/api/paths'
import type { Privilege } from 'src/models'

const $q = useQuasar()

const props = withDefaults(defineProps<{
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

const form = ref<Privilege>({
  name: '',
  path: '',
  component: '',
  icon: '',
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
  { name: 'path', label: 'path', align: 'left', field: 'path', sortable: true },
  { name: 'order', label: 'order', align: 'left', field: 'order' },
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
async function onRequest() {
  loading.value = true

  await api.get(`${SERVER_URL.PRIVILEGE}/${props.superiorId}/subset`).then(res => {
    rows.value = res.data
  }).catch(error => {
    $q.notify({
      message: error.message,
      type: 'negative'
    })
  }).finally(() => {
    loading.value = false
  })
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

function onSubmit() {
  // Close the dialog after submitting
  visible.value = false
}

function onReset() { }
</script>
