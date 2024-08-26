<template lang="">
  <v-container fluid>
    <CustomCard title="Method">
      <v-radio-group v-model="formData.methodEnum" inline hide-details>
        <v-radio
          v-for="(item, index) in schema.properties.methodEnum.enum"
          :key="index"
          :label="item"
          :value="item"
        >
        </v-radio>
      </v-radio-group>
    </CustomCard>
    <CustomCard v-if="formData.methodEnum === 'data type(Number/String)'" title="Method(Types)">
      <span>Number</span>
      <v-select
        :items="schema.properties.methodTypeNumberEnum.enum"
        v-model="formData.methodTypeNumberEnum"
        hide-details
      ></v-select>
      <span>Fix value</span>
      <v-text-field
        :disabled="formData.methodTypeNumberEnum !== 'Fix value'"
        hide-details
        v-model="formData.fixValue"
        :type="schema.properties.fixValue.type"
      ></v-text-field>
      <span>String</span>
      <v-select
        :items="schema.properties.methodTypeStringEnum.enum"
        v-model="formData.methodTypeStringEnum"
        hide-details
      ></v-select>
    </CustomCard>
    <CustomCard v-if="formData.methodEnum === 'columns'" title="Method(Columns)">
      <v-select
        :items="[]"
        v-model="formData.methodColumnArray"
        hide-details
        @update:modelValue="updateSelectedItem('method', 'column', $event)"
      ></v-select>
      <!-- TODO 조건 -->
      <!-- string/ number 타입에 따라 드롭다운 항목 구분 필요 (string 경우 min/max/mean, median 없음) -->
      <v-select
        :items="schema.properties.methodColumnEnum.enum"
        v-model="formData.methodColumnEnum"
        hide-details
        @update:modelValue="updateSelectedItem('method', 'method', $event)"
      ></v-select>
      <CustomTableWithAddItems
        :headers="['column', 'method']"
        :selectedItem="selectedItems.method"
        v-model="formData.methodColumnArrayObject"
      ></CustomTableWithAddItems>
    </CustomCard>
  </v-container>
</template>
<script>
import CustomCard from '@/components/custom/CustomCard.vue'
import formMixin from '@/components/mixins/formMixin'
import CustomTableWithAddItems from '@/components/custom/CustomTableWithAddItems.vue'
export default {
  name: 'C3_N04',
  components: {
    CustomCard,
    CustomTableWithAddItems
  },
  mixins: [formMixin],
  computed: {
    selectedItems() {
      return {
        method: {
          column: this.formData.methodColumnArray,
          method: this.formData.methodColumnEnum
        }
      }
    }
  }
}
</script>
