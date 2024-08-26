<template lang="">
  <v-container fluid>
    <CustomCard title="Grouping Setting">
      <span>grouping column</span>
      <CustomSelectList
        :leftHeader="'available columns'"
        :rightHeader="'group columns'"
        v-model="formData.groupingColumnArray"
        :items="[]"
      >
      </CustomSelectList>

      <span>select aggregation columns</span>
      <v-select
        :items="['column1', 'column2', 'column3']"
        v-model="formData.aggregationColumnArray"
        placeholder="Column Selection"
        hide-details
        @update:modelValue="updateSelectedItem('aggregation', 'column', $event)"
      ></v-select>
      <span>select aggregation functions</span>
      <v-select
        :items="schema.properties.aggregationFunctionEnum.enum"
        v-model="formData.aggregationFunctionArray"
        placeholder="Function Selection"
        hide-details
        @update:modelValue="updateSelectedItem('aggregation', 'function', $event)"
      ></v-select>
      <CustomTableWithAddItems
        :headers="['agg column', 'agg function']"
        :selectedItem="selectedItems.aggregation"
        v-model="formData.aggregationArrayObject"
      ></CustomTableWithAddItems>
    </CustomCard>
  </v-container>
</template>
<script>
import CustomCard from '@/components/custom/CustomCard.vue'
import formMixin from '@/components/mixins/formMixin'
import CustomSelectList from '@/components/custom/CustomSelectList.vue'
import CustomTableWithAddItems from '@/components/custom/CustomTableWithAddItems.vue'
export default {
  name: 'C3_N03',
  components: {
    CustomCard,
    CustomSelectList,
    CustomTableWithAddItems
  },
  mixins: [formMixin],
  data() {
    return {
      selectedItems: {
        aggregation: {
          column: '',
          function: ''
        }
      }
    }
  }
}
</script>
<style scoped>
.selected-row {
  background-color: lightgray;
}
</style>
