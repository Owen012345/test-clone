<template lang="">
  <v-container fluid>
    <CustomCard title="Clusters">
      <span>Number of clusters</span>
      <v-text-field
        v-model="formData.numberOfClusters"
        :type="schema.properties.numberOfClusters.type"
        outlined
        hide-details
      ></v-text-field>
      <span>Centroid initialization</span>
      <v-radio-group v-model="formData.centroidInitializationEnum" inline hide-details>
        <v-radio
          v-for="(item, index) in schema.properties.centroidInitializationEnum.enum"
          :key="index"
          :label="item"
          :value="item"
        >
        </v-radio>
      </v-radio-group>
    </CustomCard>
    <CustomCard title="Number of iterations">
      <v-text-field
        v-model="formData.numberOfIterations"
        :type="schema.properties.numberOfIterations.type"
        outlined
        hide-details
      ></v-text-field>
    </CustomCard>
    <CustomCard title="Column Selection">
      <CustomSelectList
        :leftHeader="'Excludes'"
        :rightHeader="'Includes'"
        v-model="formData.columnSelectionArray"
        :items="[]"
      >
      </CustomSelectList>
    </CustomCard>
  </v-container>
</template>
<script>
import CustomCard from '@/components/custom/CustomCard.vue'
import CustomSelectList from '@/components/custom/CustomSelectList.vue'
import formMixin from '@/components/mixins/formMixin'

export default {
  name: 'C5_N07',
  components: {
    CustomCard,
    CustomSelectList
  },
  mixins: [formMixin]
}
</script>
<style lang=""></style>
