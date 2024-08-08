<template lang="">
  <v-container>
    <CustomCard title="Input Location" flat>
      <span>Write To</span>
      <v-select
        :items="schema.properties.writeToEnum.enum"
        v-model="formData.writeToEnum"
      ></v-select>
      <span>File</span>
      <v-text-field
        :type="schema.properties.file.type"
        hide-details
        v-model="formData.file"
      ></v-text-field>
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
import CustomCard from '@/components/custom/customCard.vue'
import formMixin from '@/components/mixins/formMixin'
export default {
  name: 'C1_N02',
  components: {
    CustomCard
  },
  mixins: [formMixin]
}
</script>
<style lang=""></style>
