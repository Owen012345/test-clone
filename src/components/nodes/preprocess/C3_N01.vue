<template lang="">
  <v-container fluid>
    <CustomCard title="Filter" flat>
      <v-radio-group v-model="formData.filterEnum" inline>
        <v-radio
          v-for="(item, index) in schema.properties.filterEnum.enum"
          :key="index"
          :label="item"
          :value="item"
        >
        </v-radio>
      </v-radio-group>
    </CustomCard>
    <CustomCard
      title="Column Value Matching"
      flat
      v-if="
        formData.filterEnum === 'Include rows by attribute value' ||
        formData.filterEnum === 'Exclude rows by attribute value'
      "
    >
      <v-select :items="[]" v-model="formData.columnValueMatchingArray"></v-select>
      <v-radio-group v-model="formData.includeRowValueEnum">
        <template v-for="(item, index) in schema.properties.includeRowValueEnum.enum" :key="index">
          <v-radio :label="item" :value="item"></v-radio>
          <div v-if="item === 'use pattern matching'">
            <v-row>
              <v-col>
                <v-text-field
                  hide-details
                  :disabled="formData.includeRowValueEnum !== 'use pattern matching'"
                  v-model="formData.patternMatching"
                  :type="schema.properties.patternMatching.type"
                ></v-text-field>
              </v-col>
              <v-col cols="auto">matching type</v-col>
              <v-col>
                <v-radio-group
                  v-model="formData.patternMatchingType"
                  inline
                  :disabled="formData.includeRowValueEnum !== 'use pattern matching'"
                >
                  <v-radio
                    v-for="(item, index) in schema.properties.patternMatchingType.enum"
                    :key="index"
                    :label="item"
                    :value="item"
                  >
                  </v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </div>
          <div v-if="item === 'use range checking'">
            <v-row>
              <v-col>
                <v-text-field
                  hide-details
                  :disabled="formData.includeRowValueEnum !== 'use range checking'"
                  v-model="formData.rangeCheckingMin"
                >
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  hide-details
                  :disabled="formData.includeRowValueEnum !== 'use range checking'"
                  v-model="formData.rangeCheckingMax"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </div>
        </template>
      </v-radio-group>
    </CustomCard>
    <CustomCard
      title="Row number range"
      flat
      v-if="
        formData.filterEnum === 'Include rows by row number' ||
        formData.filterEnum === 'Exclude rows by row number'
      "
    >
      <v-row>
        <v-col>
          <v-text-field hide-details v-model="formData.rowNumberRangeMin"> </v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            :type="schema.properties.rowNumberRangeMax.type"
            :disabled="formData.endOfTheTable"
            hide-details
            v-model="formData.rowNumberRangeMax"
          >
          </v-text-field>
        </v-col>
        <v-col cols="auto">
          <v-checkbox
            hide-details
            v-model="formData.endOfTheTable"
            label="to the end of the table"
          />
        </v-col>
      </v-row>
    </CustomCard>
  </v-container>
</template>
<script>
import CustomCard from '@/components/custom/CustomCard.vue'
import formMixin from '@/components/mixins/formMixin'
export default {
  name: 'C3_N01',
  components: {
    CustomCard
  },
  mixins: [formMixin]
}
</script>
<style lang=""></style>
