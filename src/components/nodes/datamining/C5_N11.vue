<template lang="">
  <v-container fluid>
    <CustomCard title="Standard settings">
      <span>Column with class labels</span>
      <v-select
        v-model="formData.classColumnSelectionArray"
        :items="['a', 'b', 'c']"
        outlined
        hide-details
      ></v-select>
      <span>Number of neightbors to consider (k)</span>
      <v-text-field
        :type="schema.properties.numberOfNeighbors.type"
        v-model="formData.numberOfNeighbors"
        outlined
        hide-details
      ></v-text-field>
      <v-checkbox
        v-model="formData.weightNeighbours"
        label="Weight neighbours by distance"
        hide-details
      ></v-checkbox>
      <v-checkbox
        v-model="formData.outputClassProbabilities"
        label="Normalize data"
        hide-details
      ></v-checkbox>
    </CustomCard>
  </v-container>
</template>
<script>
import CustomCard from '@/components/custom/CustomCard.vue'
import formMixin from '@/components/mixins/formMixin'

export default {
  name: 'C5_N11',
  components: {
    CustomCard
  },
  mixins: [formMixin]
}
</script>
<style lang=""></style>
