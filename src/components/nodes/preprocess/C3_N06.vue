<template lang="">
  <v-container fluid>
    <CustomCard title="Normalizer Settings">
      <span>column setting</span>
      <v-select
        @update:modelValue="updateSelectedItem('normalizer', 'column', $event)"
        :items="['a', 'b', 'c']"
        v-model="formData.columnArray"
        hide-details
      ></v-select>
      <span>method</span>
      <v-radio-group
        @update:modelValue="updateSelectedItem('normalizer', 'method', $event)"
        v-model="formData.normalizerMethodEnum"
        hide-details
      >
        <template v-for="(item, index) in schema.properties.normalizerMethodEnum.enum" :key="index">
          <v-radio :label="item" :value="item"></v-radio>
          <CustomCard v-if="item === 'min-max'">
            <span>min</span>
            <v-text-field
              :type="schema.properties.minValue.type"
              :disabled="formData.normalizerMethodEnum !== 'min-max'"
              hide-details
              v-model="formData.minValue"
              step="0.1"
              @update:modelValue="updateSelectedItem('normalizer', 'option', $event)"
            ></v-text-field>
            <span>max</span>
            <v-text-field
              :type="schema.properties.maxValue.type"
              :disabled="formData.normalizerMethodEnum !== 'min-max'"
              hide-details
              step="0.1"
              v-model="formData.maxValue"
              @update:modelValue="updateSelectedItem('normalizer', 'option', $event)"
            ></v-text-field>
          </CustomCard>
        </template>
      </v-radio-group>
      <CustomTableWithAddItems
        :headers="['column', 'method', 'option(min-max)']"
        :selectedItem="selectedItems.normalizer"
        v-model="formData.normalizerArrayObject"
      ></CustomTableWithAddItems>
    </CustomCard>
  </v-container>
</template>
<script>
import CustomCard from '@/components/custom/CustomCard.vue'
import formMixin from '@/components/mixins/formMixin'
import CustomTableWithAddItems from '@/components/custom/CustomTableWithAddItems.vue'
export default {
  name: 'C3_N06',
  components: {
    CustomCard,
    CustomTableWithAddItems
  },
  mixins: [formMixin],
  computed: {
    selectedItems() {
      return {
        normalizer: {
          column: this.formData.columnArray,
          method: this.formData.normalizerMethodEnum,
          option: `${this.formData.minValue}-${this.formData.maxValue}`
        }
      }
    }
  }
}
</script>
