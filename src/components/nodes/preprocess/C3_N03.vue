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
        @update:modelValue="addTableItems('column', $event)"
      ></v-select>
      <span>select aggregation functions</span>
      <v-select
        :items="schema.properties.aggregationFunctionEnum.enum"
        v-model="formData.aggregationFunctionArray"
        placeholder="Function Selection"
        hide-details
        @update:modelValue="addTableItems('function', $event)"
      ></v-select>
      <v-btn @click="addItems">add</v-btn>
      <v-btn @click="removeSelected">remove</v-btn>
      <v-btn @click="removeAll">remove all</v-btn>
      <v-table>
        <thead>
          <tr>
            <th :id="item" class="text-left" v-for="(item, idx) in headers" :key="idx">
              {{ item }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in formData.aggregationArrayObject"
            :key="index"
            :class="{ 'selected-row': selectedRow === index }"
            @click="selectRow(index)"
          >
            <td>{{ item.column }}</td>
            <td>{{ item.function }}</td>
          </tr>
        </tbody>
      </v-table>
    </CustomCard>
  </v-container>
</template>
<script>
import CustomCard from '@/components/custom/CustomCard.vue'
import formMixin from '@/components/mixins/formMixin'
import CustomSelectList from '@/components/custom/CustomSelectList.vue'

export default {
  name: 'C3_N03',
  components: {
    CustomCard,
    CustomSelectList
  },
  mixins: [formMixin],
  data() {
    return {
      headers: ['column', 'function'],
      items: [],
      defaultItem: {
        column: '',
        function: ''
      },
      selectedRow: null
    }
  },
  methods: {
    addTableItems(type, value) {
      this.defaultItem[type] = value
      // TODO : 컴포넌트 분리
    },
    addItems() {
      this.defaultItem.column = this.formData.aggregationColumnArray || ''
      this.defaultItem.function = this.formData.aggregationFunctionArray || ''

      this.formData.aggregationArrayObject.push({ ...this.defaultItem })
    },
    selectRow(index) {
      if (this.selectedRow === index) {
        this.selectedRow = null
      } else {
        this.selectedRow = index
      }
    },
    removeSelected() {
      if (this.selectedRow !== null) {
        this.formData.aggregationArrayObject.splice(this.selectedRow, 1)
        this.selectedRow = null
      }
    },
    removeAll() {
      this.formData.aggregationArrayObject = []
    }
  }
}
</script>
<style>
.selected-row {
  background-color: lightgray;
}
</style>
