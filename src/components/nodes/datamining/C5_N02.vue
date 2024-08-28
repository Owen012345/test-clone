<template lang="">
  <v-container fluid>
    <CustomCard title="General">
      <span>Class column</span>
      <v-select :items="[]" v-model="formData.classColumnArray" hide-details></v-select>
      <span>Quality measure</span>
      <v-radio-group v-model="formData.qualityMeasureEnum" inline hide-details>
        <v-radio
          v-for="(item, index) in schema.properties.qualityMeasureEnum.enum"
          :key="index"
          :label="item"
          :value="item"
        >
        </v-radio>
      </v-radio-group>
      <span>Pruning method</span>
      <v-radio-group v-model="formData.pruningMethodEnum" inline hide-details>
        <v-radio
          v-for="(item, index) in schema.properties.pruningMethodEnum.enum"
          :key="index"
          :label="item"
          :value="item"
        >
        </v-radio>
      </v-radio-group>
      <v-checkbox
        hide-details
        v-model="formData.reducedErrorPruning"
        label="Reduced Error Pruning"
      ></v-checkbox>
      <span>Min number records per node</span>
      <v-text-field
        hide-details
        v-model="formData.minNumRecordsPerNode"
        :type="schema.properties.minNumRecordsPerNode.type"
      ></v-text-field>
      <span>Number records to store for view</span>
      <v-text-field
        hide-details
        v-model="formData.numRecordsToStoreForView"
        :type="schema.properties.numRecordsToStoreForView.type"
      ></v-text-field>
      <v-checkbox
        hide-details
        v-model="formData.averageSplitPoint"
        label="Average split point"
      ></v-checkbox>
      <span>Number threads</span>
      <v-text-field
        hide-details
        v-model="formData.numThreads"
        :type="schema.properties.numThreads.type"
      ></v-text-field>
      <v-checkbox
        hide-details
        v-model="formData.skipNomialColumns"
        label="Skip nominal columns without domain information"
      ></v-checkbox>
    </CustomCard>
    <CustomCard title="Root split">
      <v-checkbox
        hide-details
        v-model="formData.forceRootSplitColumn"
        label="Force root split column"
      ></v-checkbox>
      <v-select
        :disabled="!formData.forceRootSplitColumn"
        :items="[]"
        v-model="formData.rootSplitColumn"
        hide-details
      ></v-select>
    </CustomCard>
    <CustomCard title="Binary Nomial Split">
      <v-checkbox
        hide-details
        v-model="formData.binarayNominalSplit"
        label="Binary Nomial Split"
      ></v-checkbox>
      <v-text-field
        :disabled="!formData.binarayNominalSplit"
        hide-details
        v-model="formData.maximumBinaryCount"
        :type="schema.properties.maximumBinaryCount.type"
      ></v-text-field>
    </CustomCard>
  </v-container>
</template>
<script>
import CustomCard from '@/components/custom/CustomCard.vue'
import formMixin from '@/components/mixins/formMixin'

export default {
  name: 'C5_N02',
  components: {
    CustomCard
  },
  mixins: [formMixin]
}
</script>
<style lang=""></style>
