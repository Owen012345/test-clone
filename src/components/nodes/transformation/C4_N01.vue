<template lang="">
  <v-container fluid>
    <CustomCard title="Ouput Settings" flat>
      <span>Output type</span>
      <v-select
        :items="schema.properties.ouputTypeEnum.enum"
        v-model="formData.ouputTypeEnum"
        hide-details
      ></v-select>
      <span>New column name</span>
      <v-text-field
        hide-details
        v-model="formData.newColumnName"
        :type="schema.properties.newColumnName.type"
      ></v-text-field>
    </CustomCard>
    <CustomCard title="Column Value Matching" flat>
      <v-radio-group v-model="formData.numberOfRowsEnum" hide-details>
        <template v-for="(item, index) in schema.properties.numberOfRowsEnum.enum" :key="index">
          <v-radio :label="item" :value="item"></v-radio>
          <CustomCard v-if="item === 'Fixed'">
            <span>Fixed Row Lengths</span>
            <v-text-field
              hide-details
              v-model="formData.fixedRowLength"
              :type="schema.properties.fixedRowLength.type"
              :disabled="formData.numberOfRowsEnum !== 'Fixed'"
            >
            </v-text-field>
          </CustomCard>
        </template>
      </v-radio-group>
    </CustomCard>
    <CustomCard title="Starting Point">
      <span>Type</span>
      <v-radio-group v-model="formData.startingPointTypeEnum" hide-details>
        <template
          v-for="(item, index) in schema.properties.startingPointTypeEnum.enum"
          :key="index"
        >
          <v-radio :label="item" :value="item"></v-radio>
          <CustomCard v-if="item === 'Start'">
            <span>Starting Point Date</span>
            <v-text-field
              hide-details
              v-model="formData.startingPointDate"
              :type="schema.properties.startingPointDate.type"
              :disabled="formData.startingPointTypeEnum !== 'Start'"
            >
            </v-text-field>
            <span>Starting Point Time</span>
            <v-text-field
              hide-details
              v-model="formData.startingPointTime"
              :type="schema.properties.startingPointTime.type"
              :disabled="formData.startingPointTypeEnum !== 'Start'"
            >
            </v-text-field>
            <span>StartingPointTimeZonesEnum</span>
            <v-select
              :items="schema.properties.startingPointTimeZonesEnum.enum"
              v-model="formData.startingPointTimeZonesEnum"
              hide-details
              :disabled="formData.startingPointTypeEnum !== 'Start'"
            >
            </v-select>
          </CustomCard>
        </template>
      </v-radio-group>
    </CustomCard>
    <CustomCard title="Ending Point">
      <span>Type</span>
      <v-radio-group v-model="formData.endingPointTypeEnum" hide-details>
        <template v-for="(item, index) in schema.properties.endingPointTypeEnum.enum" :key="index">
          <v-radio :label="item" :value="item"></v-radio>
          <CustomCard v-if="item === 'Interval'">
            <span>Starting Point Date</span>
            <v-text-field
              hide-details
              v-model="formData.endingPointInterval"
              :type="schema.properties.endingPointInterval.type"
              :disabled="formData.endingPointTypeEnum !== 'Interval'"
            >
            </v-text-field>
          </CustomCard>
          <CustomCard v-if="item === 'End'">
            <span>Ending Point Date</span>
            <v-text-field
              hide-details
              v-model="formData.endingPointDate"
              :type="schema.properties.endingPointDate.type"
              :disabled="formData.endingPointTypeEnum !== 'End'"
            >
            </v-text-field>
            <span>Ending Point Time</span>
            <v-text-field
              hide-details
              v-model="formData.endingPointTime"
              :type="schema.properties.endingPointTime.type"
              :disabled="formData.endingPointTypeEnum !== 'End'"
            ></v-text-field>
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
  name: 'C1_N01',
  components: {
    CustomCard
  },
  mixins: [formMixin],
  created() {
    console.log(this.$guessTimezone())
  }
}
</script>
<style lang=""></style>
