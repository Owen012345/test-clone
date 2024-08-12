<template lang="">
  <v-container fluid>
    <CustomCard title="Grouping Setting">
      <span>grouping column</span>
      <CustomSelectList
        :leftHeader="'available columns'"
        :rightHeader="'group columns'"
        v-model="formData.groupingColumnEnum"
        :items="schema.properties.groupingColumnEnum.enum"
      >
      </CustomSelectList>

      <span>select aggregation columns</span>
      <v-select
        :items="schema.properties.aggregationColumnEnum.enum"
        v-model="formData.aggregationColumnEnum"
        placeholder="Column Selection"
        hide-details
      ></v-select>
      <span>select aggregation functions</span>
      <v-select
        :items="schema.properties.aggregationFunctionEnum.enum"
        v-model="formData.aggregationFunctionEnum"
        placeholder="Function Selection"
        hide-details
      ></v-select>
      <CustomTableWithAddItems
        :headers="['agg column', 'agg function']"
        :items="[formData.aggregationColumnEnum, formData.aggregationFunctionEnum]"
      >
      </CustomTableWithAddItems>
    </CustomCard>
  </v-container>
</template>
<script>
import CustomCard from '@/components/custom/customCard.vue'
import formMixin from '@/components/mixins/formMixin'
import CustomSelectList from '@/components/custom/customSelectList.vue'
import CustomTableWithAddItems from '@/components/custom/CustomTableWithAddItems.vue'

export default {
  name: 'C3_N03',
  components: {
    CustomCard,
    CustomSelectList,
    CustomTableWithAddItems
  },
  mixins: [formMixin]
}
</script>
<style lang=""></style>
