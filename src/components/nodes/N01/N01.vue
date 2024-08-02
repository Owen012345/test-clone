<template lang="">
  <JsonForms :data="data" :schema="jsonschema" :uischema="uischema" />
</template>
<script>
import JsonForms from '@/components/jsonforms/index.vue'
import schema from '@/components/nodes/N01/schema.json'
import uiSchema from '@/components/nodes/N01/uiSchema.json'
import data from '@/components/nodes/N01/data.json'

export default {
  name: 'N01-Default',
  props: {
    selectedTab: {
      type: String
    }
  },
  components: {
    JsonForms
  },
  computed: {
    jsonschema() {
      return schema
    },
    uischema() {
      return uiSchema
    },
    data() {
      return data
    }
  }
}
</script>
<style scoped>
.v-card-title {
  font-size: 8px;
}
</style>
