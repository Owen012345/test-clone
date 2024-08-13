<template lang="">
  <v-container fluid>
    <CustomCard title="Grouping Setting">
      <span>grouping column</span>
      <CustomSelectList
        :leftHeader="'available columns'"
        :rightHeader="'group columns'"
        v-model="formData.groupingColumnArray"
        :items="['a', 'b', 'c']"
      >
      </CustomSelectList>

      <span>select aggregation columns</span>
      <v-select
        :items="['column1', 'column2', 'column3']"
        v-model="formData.aggregationColumnArray"
        placeholder="Column Selection"
        hide-details
      ></v-select>
      <span>select aggregation functions</span>
      <v-select
        :items="['func1', 'func2', 'func3']"
        v-model="formData.aggregationFunctionArray"
        placeholder="Function Selection"
        hide-details
      ></v-select>
      <v-btn @click="addItems">add</v-btn>
      <v-table>
        <thead>
          <tr>
            <th :id="item" class="text-left" v-for="(item, idx) in headers" :key="idx">
              {{ item }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
          </tr>
        </tbody>
      </v-table>
      <!-- <CustomTableWithAddItems
        :headers="['agg column', 'agg function']"
        :items="[formData.aggregationColumnArray, formData.aggregationFunctionArray]"
        v-model="formData.aggregationArrayObject"
      ></CustomTableWithAddItems> -->
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
  methods: {
    addItems() {
      let obj = this.formData.aggregationArrayObject[0]
      obj.column = this.formData.aggregationColumnArray
      obj.function = this.formData.aggregationFunctionArray
      console.log(obj)
      console.log(this.formData.aggregationColumnArray)
      console.log(this.formData.aggregationFunctionArray)
    }
  }
}
</script>
<style lang=""></style>
