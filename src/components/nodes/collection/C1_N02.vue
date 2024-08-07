<template lang="">
  <v-container>
    <CustomCard title="Input Location" flat>
      <span>Write To</span>
      <v-select
        :items="schema.properties.writeToEnum.enum"
        v-model="formData.readFromEnum"
      ></v-select>
      <span>File</span>
      <v-text-field hide-details v-model="formData.file"></v-text-field>
    </CustomCard>
    <CustomCard title="Reader Options" flat>
      <span>Column Delimiter</span>
      <v-text-field hide-details v-model="formData.columnDelimiter"></v-text-field>
      <v-checkbox
        hide-details
        v-model="formData.hasColumnHeader"
        label="Has column header"
      ></v-checkbox>
      <v-checkbox hide-details v-model="formData.hasRowId" label="Has RowID"></v-checkbox>
    </CustomCard>
  </v-container>
</template>
<script>
import schema from '@/components/nodes/schema/C1_N02_schema.json'
import CustomCard from '@/components/custom/customCard.vue'
export default {
  name: 'N02',
  props: {
    selectedTab: {
      type: String
    }
  },
  components: {
    CustomCard
  },
  data() {
    return {
      schema: null,
      formData: {
        readFromEnum: null,
        file: '',
        columnDelimiter: '',
        hasColumnHeader: false,
        hasRowId: false
      }
    }
  },
  created() {
    try {
      this.schema = schema
      const property = schema.properties

      this.formData.readFromEnum = property.writeToEnum?.default
      this.formData.file = property.file?.default
      this.formData.columnDelimiter = property.columnDelimiter?.default
      this.formData.hasColumnHeader = property.hasColumnHeader?.default
      this.formData.hasRowId = property.hasRowId?.default
    } catch (error) {
      console.error('Failed to initialize formData:', error)
    }
  }
}
</script>
<style lang=""></style>
