<template lang="">
  <v-container fluid>
    <CustomCard title="Standard settings">
      <span>prediction column name settings</span>
      <v-checkbox
        v-model="formData.predictionColumnName"
        label="Change prediction column name"
        hide-details
      >
      </v-checkbox>
      <v-text-field
        :disabled="!formData.predictionColumnName"
        :type="schema.properties.predictionName.type"
        v-model="formData.predictionName"
        outlined
        hide-details
      ></v-text-field>
      <span>suffix setting</span>
      <v-checkbox
        v-model="formData.suffixColumnName"
        label="Append columns with normalized class distribution"
        hide-details
      ></v-checkbox>
      <v-text-field
        :disabled="!formData.suffixColumnName"
        :type="schema.properties.suffixName.type"
        v-model="formData.suffixName"
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
  name: 'C5_N10',
  components: {
    CustomCard
  },
  mixins: [formMixin]
}
</script>
<style lang=""></style>
