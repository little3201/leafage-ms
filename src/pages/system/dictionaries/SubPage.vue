<template>
  <q-dialog v-model="visible" persistent>
    <q-card style="min-width: 25em">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-card-section>
          <div class="text-h6">{{ $t('dictionaries') }}</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="form.name" :label="$t('name')" lazy-rules
            :rules="[val => val && val.length > 0 || $t('inputText')]" />

          <q-input v-model="form.description" :label="$t('description')" type="textarea" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn title="cancel" type="reset" unelevated :label="$t('cancel')" v-close-popup />
          <q-btn title="submit" type="submit" flat :label="$t('submit')" color="primary" />
        </q-card-actions>

      </q-form>
    </q-card>
  </q-dialog>

  <q-table flat ref="subtableRef" :title="title" :rows="rows" :columns="columns" row-key="id" binary-state-sort
    @request="onRequest" hide-pagination hide-selected-banner class="full-width bg-transparent">
    <template v-slot:top-right>
      <q-btn title="refresh" round padding="xs" flat color="primary" class="q-mx-sm" :disable="loading"
        icon="sym_r_refresh" @click="refresh" />
      <q-btn title="create" round padding="xs" color="primary" :disable="loading" icon="sym_r_add" @click="saveRow()" />
    </template>

    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th v-for="col in props.cols" :key="col.name" :props="props">
          {{ $t(col.label) }}
        </q-th>
      </q-tr>
    </template>

    <template v-slot:body-cell-enabled="props">
      <q-td :props="props">
        <q-toggle v-model="props.row.enabled" size="sm" color="positive" />
      </q-td>
    </template>
    <template v-slot:body-cell-id="props">
      <q-td :props="props">
        <q-btn title="modify" padding="xs" flat round color="primary" icon="sym_r_edit" @click="saveRow(props.row.id)"
          class="q-mt-none" />
        <q-btn title="delete" padding="xs" flat round color="negative" icon="sym_r_delete"
          @click="removeRow(props.row.id)" class="q-mt-none q-ml-sm" />
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import type { QTableProps } from 'quasar'
import { retrieveDictionarySubset, fetchDictionary } from 'src/api/dictionaries'

import type { Dictionary } from 'src/types'

const $q = useQuasar()

const props = withDefaults(defineProps<{
  title: string
  superiorId?: number
}>(), {
  title: ''
})

const visible = ref<boolean>(false)

const subtableRef = ref()
const rows = ref<QTableProps['rows']>([])
const loading = ref<boolean>(false)

const form = ref<Dictionary>({
  name: '',
  superiorId: props.superiorId as number,
  description: ''
})

const columns: QTableProps['columns'] = [
  { name: 'name', label: 'name', align: 'left', field: 'name', sortable: true },
  { name: 'enabled', label: 'enabled', align: 'center', field: 'enabled' },
  { name: 'description', label: 'description', align: 'left', field: 'description' },
  { name: 'id', label: 'actions', field: 'id' }
]

onMounted(() => {
  subtableRef.value.requestServerInteraction()
})

/**
 * 查询列表
 */
async function onRequest() {
  loading.value = true
  if (props.superiorId) {
    retrieveDictionarySubset(props.superiorId).then(res => {
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
}

function refresh() {
  subtableRef.value.requestServerInteraction()
}

async function saveRow(id?: number) {
  visible.value = true
  // You can populate the form with existing user data based on the id
  if (id) {
    fetchDictionary(id).then(res => { form.value = res.data })
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
