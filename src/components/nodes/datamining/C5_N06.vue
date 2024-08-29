<template lang="">
  <v-container fluid>
    <CustomCard title="General">
      <span>Target Column</span>
      <v-select v-model="formData.targetColumnArray" :items="[]" outlined hide-details></v-select>
      <span>Training Columns</span>
      <CustomSelectList
        :leftHeader="'Excludes'"
        :rightHeader="'Includes'"
        v-model="formData.trainingColumnArray"
        :items="[]"
      >
      </CustomSelectList>
    </CustomCard>
    <CustomCard title="Regression Properties">
      <span>Offset Value</span>
      <v-checkbox
        v-model="formData.predefinedOffsetValue"
        label="Predefined Offset Value"
        hide-details
      ></v-checkbox>
      <v-text-field
        :disabled="!formData.predefinedOffsetValue"
        :type="schema.properties.offsetValue.type"
        v-model="formData.offsetValue"
        outlined
        hide-details
      ></v-text-field>
    </CustomCard>
    <CustomCard title="Missing Values in input Data">
      <v-radio-group v-model="formData.missingValueEnum" inline hide-details>
        <v-radio
          v-for="(item, index) in schema.properties.missingValueEnum.enum"
          :key="index"
          :label="item"
          :value="item"
        >
        </v-radio>
      </v-radio-group>
    </CustomCard>
  </v-container>
</template>
<script>
import CustomCard from '@/components/custom/CustomCard.vue'
import CustomSelectList from '@/components/custom/CustomSelectList.vue'
import formMixin from '@/components/mixins/formMixin'

export default {
  name: 'C5_N06',
  components: {
    CustomCard,
    CustomSelectList
  },
  mixins: [formMixin]
}
</script>
<style lang=""></style>
