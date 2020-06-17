<template>
  <v-container fluid class="full-height">
    <v-row>
      <v-text-field label="Title" single-line></v-text-field>
    </v-row>
    <v-row>
      <v-textarea auto-grow label="Content" solo flat></v-textarea>
      <v-divider vertical></v-divider>
      <v-textarea auto-grow label="Content" disabled></v-textarea>
    </v-row>
    <v-row justify="center" align="start" class="my-0">
      <v-md-editor v-model="details.statusText" height="600px"></v-md-editor>
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
