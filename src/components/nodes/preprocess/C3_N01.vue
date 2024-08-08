<template lang="">
  <v-container>
    <CustomCard title="Filter" flat>
      <v-radio-group v-model="formData.filterRadioEnum" inline>
        <v-radio
          v-for="(item, index) in schema.properties.filterRadioEnum.enum"
          :key="index"
          :label="item"
          :value="item"
        >
        </v-radio>
      </v-radio-group>
    </CustomCard>
    <CustomCard title="Column Value Matching" flat>
      <v-select
        :items="schema.properties.columnValueMatchingEnum.enum"
        v-model="formData.columnValueMatchingEnum"
      ></v-select>
      <v-radio-group v-model="formData.includeRowValueEnum">
        <template v-for="(item, index) in schema.properties.includeRowValueEnum.enum" :key="index">
          <v-radio :label="item" :value="item"></v-radio>
          <slot v-if="item === 'use pattern matching'">
            <v-row>
              <v-col>
                <v-text-field
                  hide-details
                  :disabled="formData.includeRowValueEnum !== 'use pattern matching'"
                  v-model="formData.patternMatching"
                  :type="schema.properties.patternMatching.type"
                ></v-text-field>
              </v-col>
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
          </slot>
          <slot v-if="item === 'use range checking'">
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
          </slot>
        </template>
      </v-radio-group>
    </CustomCard>
  </v-container>
</template>
<script>
import CustomCard from '@/components/custom/customCard.vue'
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
