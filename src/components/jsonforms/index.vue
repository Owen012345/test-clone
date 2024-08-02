<template>
  <v-container fluid>
    <json-forms
      :schema="props.schema"
      :uischema="props.uischema"
      :renderers="renderers"
      :data="props.data"
    />
  </v-container>
</template>

<script setup lang="js">
import { JsonForms } from '@jsonforms/vue'
import { vuetifyRenderers } from '@jsonforms/vue-vuetify'
import { markRaw } from 'vue'

const props = defineProps(['schema', 'uischema', 'data'])

const renderers = markRaw([...vuetifyRenderers])
</script>
<style scoped></style>
