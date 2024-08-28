<template lang="">
  <v-container fluid>
    <CustomCard title="Base Column">
      <v-select :items="[]" v-model="formData.baseColumnArray" hide-details></v-select>
    </CustomCard>
    <CustomCard title="Calculate difference to">
      <v-radio-group v-model="formData.calculateDifferenceToEnum" hide-details>
        <template
          v-for="(item, index) in schema.properties.calculateDifferenceToEnum.enum"
          :key="index"
        >
          <v-radio :label="item" :value="item"></v-radio>
          <CustomCard v-if="item === 'second column'">
            <v-text-field
              :type="schema.properties.secondColumn.type"
              :disabled="formData.calculateDifferenceToEnum !== 'second column'"
              hide-details
              v-model="formData.secondColumn"
            ></v-text-field>
          </CustomCard>
          <CustomCard v-if="item === 'fixed date&time'">
            <span>Date</span>
            <v-text-field
              :type="schema.properties.fixedDate.type"
              :disabled="formData.calculateDifferenceToEnum !== 'fixed date&time'"
              hide-details
              v-model="formData.fixedDate"
            ></v-text-field>
            <span>Time</span>
            <v-text-field
              :type="schema.properties.fixedTime.type"
              :disabled="formData.calculateDifferenceToEnum !== 'fixed date&time'"
              hide-details
              v-model="formData.fixedTime"
            ></v-text-field>
          </CustomCard>
        </template>
      </v-radio-group>
    </CustomCard>
    <CustomCard title="Output options">
      <v-radio-group v-model="formData.outputOptionsEnum" hide-details>
        <template v-for="(item, index) in schema.properties.outputOptionsEnum.enum" :key="index">
          <v-radio :label="item" :value="item"></v-radio>
          <CustomCard v-if="item === 'Granularity'">
            <v-select
              hide-details
              :disabled="formData.outputOptionsEnum !== 'Granularity'"
              :items="schema.properties.granularityEnum.enum"
              v-model="formData.granularityEnum"
            ></v-select>
          </CustomCard>
        </template>
      </v-radio-group>
    </CustomCard>
  </v-container>
</template>
<script>
import CustomCard from '@/components/custom/CustomCard.vue'
import formMixin from '@/components/mixins/formMixin'
export default {
  name: 'C4_N06',
  components: {
    CustomCard
  },
  mixins: [formMixin]
}
</script>
