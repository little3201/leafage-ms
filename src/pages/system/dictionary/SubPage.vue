<template>
  <div>
    <q-dialog v-model="visiable" persistent>
      <q-card style="min-width: 350px">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-card-section>
            <div class="text-h6">Dictionary</div>
          </q-card-section>

          <q-card-section>
            <q-input v-model="form.name" label="Dictionary name" lazy-rules
              :rules="[val => val && val.length > 0 || 'Please type something']" />

            <q-input v-model="form.description" label="Dictionary deacription" type="textarea" />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" type="reset" v-close-popup />
            <q-btn type="submit" label="Submit" color="primary" />
          </q-card-actions>

        </q-form>
      </q-card>
    </q-dialog>

    <q-table flat ref="subtableRef" :title="title" selection="multiple" v-model:selected="selected" :rows="rows"
      :columns="columns" row-key="id" binary-state-sort @request="onRequest" hide-bottom
      class="full-width bg-transparent">
      <template v-slot:top-right>
        <q-btn color="primary" title="add" :disable="loading" icon="sym_r_add" label="Add" @click="addRow" />
      </template>
      <template v-slot:body-cell-lastModifiedDate="props">
        <q-td :props="props">
          {{ date.formatDate(props.row.lastModifiedDate, 'YYYY/MM/DD HH:mm') }}
        </q-td>
      </template>
      <template v-slot:body-cell-enabled="props">
        <q-td :props="props">
          <q-toggle v-model="props.row.enabled" color="green" />
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
      <template v-slot:body-cell-expand="props">
        {{ props.expand }}
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useQuasar, date } from 'quasar'
import type { QTableProps } from 'quasar'
import { api } from 'boot/axios'

import { SERVER_URL } from 'src/api/paths'
import type { Dictionary } from 'src/api/models.type'

const $q = useQuasar()

const props = withDefaults(defineProps<{ title: string, superiorId: number | undefined }>(), {
  title: '',
  superiorId: undefined
})

const visiable = ref<boolean>(false)

const subtableRef = ref()
const rows = ref<QTableProps['rows']>([])
const loading = ref(false)

const form = ref<Dictionary>({
  name: '',
  superiorId: props.superiorId,
  description: ''
})

const selected = ref([])

const columns: QTableProps['columns'] = [
  { name: 'name', label: 'Name', align: 'left', field: 'name', sortable: true },
  { name: 'enabled', label: 'Enabled', align: 'center', field: 'enabled' },
  { name: 'description', label: 'Description', align: 'left', field: 'description' },
  { name: 'lastModifiedDate', label: 'Last Modified Date', align: 'left', field: 'lastModifiedDate', sortable: true },
  { name: 'id', label: 'Actions', field: 'id' }
]

onMounted(() => {
  subtableRef.value.requestServerInteraction()
})

/**
 * 查询列表
 */
async function onRequest() {
  loading.value = true

  await api.get(SERVER_URL.DICTIONARY.concat(`/${props.superiorId}/subset`)).then(res => {
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
