<template lang="">
  <v-container fluid>
    <CustomCard title="General">
      <span>First Column</span>
      <v-select v-model="formData.firstColumnArray" :items="[]" outlined hide-details></v-select>
      <span>Second Column</span>
      <v-select v-model="formData.secondColumnArray" :items="[]" outlined hide-details></v-select>
    </CustomCard>
    <CustomCard title="Sorting of values in tables">
      <span>Sorting strategy</span>
      <v-radio-group v-model="formData.sortingStrategyEnum" inline hide-details>
        <v-radio
          v-for="(item, index) in schema.properties.sortingStrategyEnum.enum"
          :key="index"
          :label="item"
          :value="item"
        >
        </v-radio>
      </v-radio-group>
    </CustomCard>
    <CustomCard title="Provide scores as flow variables">
      <span>Prefix</span>
      <v-checkbox
        v-model="formData.useNamePrefix"
        label="Use name prefix"
        hide-details
      ></v-checkbox>
      <v-text-field
        :disabled="!formData.useNamePrefix"
        :type="schema.properties.namePrefix.type"
        v-model="formData.namePrefix"
        outlined
        hide-details
      ></v-text-field>
    </CustomCard>
    <CustomCard title="Handle Missing values">
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
import formMixin from '@/components/mixins/formMixin'

export default {
  name: 'C5_N04',
  components: {
    CustomCard
  },
  mixins: [formMixin]
}
</script>
<style lang=""></style>
