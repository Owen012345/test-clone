<template lang="">
  <v-container fluid>
    <CustomCard title="General">
      <span>Maximum number of stored patterns for HiLite-ing</span>
      <v-text-field
        v-model="formData.HiLitePatternsNumber"
        :type="schema.properties.HiLitePatternsNumber.type"
        outlined
      ></v-text-field>
      <span>Column name</span>
      <v-checkbox
        v-model="formData.changeColumnName"
        label="Change prediction column name"
        hide-details
      ></v-checkbox>
      <v-text-field
        :disabled="!formData.changeColumnName"
        :type="schema.properties.columnName.type"
        v-model="formData.columnName"
        outlined
        hide-details
      ></v-text-field>
      <span>Suffix</span>
      <v-checkbox
        v-model="formData.normalizedClassDistribution"
        label="Append columns with normalized class distribution"
        hide-details
      ></v-checkbox>
      <v-text-field
        :disabled="!formData.normalizedClassDistribution"
        :type="schema.properties.prefixColumnName.type"
        v-model="formData.prefixColumnName"
        outlined
        hide-details
      ></v-text-field>
    </CustomCard>
  </v-container>
</template>
<script>
import CustomCard from '@/components/custom/CustomCard.vue'
import formMixin from '@/components/mixins/formMixin'

export default {
  name: 'C5_N03',
  components: {
    CustomCard
  },
  mixins: [formMixin]
}
</script>
<style lang=""></style>
