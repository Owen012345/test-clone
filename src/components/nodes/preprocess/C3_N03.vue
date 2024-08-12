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
      <v-btn>add</v-btn>
      <v-btn>remove</v-btn>
      <v-btn>remove all</v-btn>
      <v-table>
        <thead>
          <tr>
            <th>agg column</th>
            <th>agg function</th>
          </tr>
        </thead>
        <tbody>
          <!-- <tr v-for="(item, key) in formData.aggregationColumnEnum" :key="key">
            <td>{{ item }}</td>
            <td>{{ formData.aggregationFunctionEnum }}</td>
          </tr> -->
        </tbody>
      </v-table>
    </CustomCard>
  </v-container>
</template>
<script>
import CustomCard from '@/components/custom/customCard.vue'
import formMixin from '@/components/mixins/formMixin'
import CustomSelectList from '@/components/custom/customSelectList.vue'
export default {
  name: 'C3_N03',
  components: {
    CustomCard,
    CustomSelectList
  },
  mixins: [formMixin]
}
</script>
<style lang=""></style>
