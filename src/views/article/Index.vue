<template>
  <v-container fluid class="full-height">
    <v-row justify="center" align="start" class="my-0">
      <v-md-editor v-model="details.statusText" height="700px"></v-md-editor>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Articles',
  props: {
    businessId: String
  },

  data: () => ({
    details: {
      title: '',
      srouceTest: '',
      catalog: '',
      content: '',
      author: ''
    }
  }),
  created: function () {
  },
  methods: {
  }
}
</script>
