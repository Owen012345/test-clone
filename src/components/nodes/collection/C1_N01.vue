<template lang="">
  <v-container>
    <CustomCard title="Input Location" flat>
      <span>Read From</span>
      <v-select
        :items="schema.properties.readFromEnum.enum"
        v-model="formData.readFromEnum"
      ></v-select>
      <span>File(csv)</span>
      <v-text-field
        hide-details
        v-model="formData.file"
        :type="schema.properties.file.type"
      ></v-text-field>
    </CustomCard>
    <CustomCard title="Reader Options" flat>
      <span>Column Delimiter</span>
      <v-text-field
        hide-details
        :type="schema.properties.columnDelimiter.type"
        v-model="formData.columnDelimiter"
      ></v-text-field>
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
  name: 'C1_N01',
  components: {
    CustomCard
  },
  mixins: [formMixin]
}
</script>
<style lang=""></style>
