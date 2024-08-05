<template>
  <v-container fluid>
    <json-forms
      :schema="props.schema"
      :uischema="props.uischema"
      :renderers="renderers"
      :data="props.data"
      @change="onDataChange"
      >
  </json-forms>
  </v-container>
</template>

<script setup lang="js">
import { JsonForms } from '@jsonforms/vue'
import { vuetifyRenderers } from '@jsonforms/vue-vuetify'
import { defineProps, defineEmits, markRaw } from 'vue'
const emit = defineEmits(['update:data'])
const props = defineProps(['schema', 'uischema', 'data'])

const onDataChange = (event) => {
  // Check if data has changed before emitting
    emit('update:data', event.data);
  
}
const renderers = markRaw([...vuetifyRenderers])
</script>
<style scoped></style>
