<template lang="">
  <v-container>
    <!-- <v-card flat>
      <v-card-title>
        Form Data
      </v-card-title>
      <v-card-text>
        <pre>{{ formData }}</pre>
      </v-card-text>
    </v-card> -->
    <v-card flat>
      <v-card-title>Filter</v-card-title>
      <v-card-text>
        <v-radio-group v-model="formData.filterRadioEnum" inline >
          <v-radio
            v-for="(item, index) in schema.properties.filterRadioEnum.enum"
            :key="index"
            :label="item"
            :value="item"
          >
          </v-radio>
        </v-radio-group>
      </v-card-text>
    </v-card>
    <v-card flat v-if="formData.filterRadioEnum === 'Include rows by attribute value'">
      <v-card-title>Column Value Matching</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="3" >
            <v-select variant="outlined" v-model="formData.columnValueMatching" :items="schema.properties.columnValueMatching.enum"></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-radio-group v-model="formData.includeRowValueEnum">
            <template
              v-for="(item, index) in schema.properties.includeRowValueEnum.enum"
              :key="index"
            >
              <v-radio
                :label="item"
                :value="item"
              >
              </v-radio>
              <!-- Conditionally Render Elements Below Each Radio Item -->
              <div v-if="item === 'use pattern matching'">
                <v-row class="pl-3">
                  <v-col cols="3">
                    <v-text-field 
                        label="Value" 
                        v-model="formData.patternMatching"
                        variant="outlined"
                        :disabled="formData.includeRowValueEnum !== 'use pattern matching'"
                      ></v-text-field>
                  </v-col>
                  <v-col cols="auto">
                    <div>Matching Type</div>
                  </v-col>
                  <v-col>
                    <v-radio-group v-model="formData.patternMatchingType" inline :disabled="formData.includeRowValueEnum !== 'use pattern matching'" >
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
                <v-row class="pl-3">
                  <v-col cols="3">
                    <v-text-field 
                        label="Value" 
                        v-model="formData.rangeCheckingMin"
                        :type="formData.rangeCheckingType"
                        variant="outlined"
                        :disabled="formData.includeRowValueEnum !== 'use range checking'"
                      ></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field 
                      label="Value" 
                      v-model="formData.rangeCheckingMax"
                      variant="outlined"
                      :disabled="formData.includeRowValueEnum !== 'use range checking'"
                    ></v-text-field>
                  </v-col>
                </v-row>   
              </div>
            </template>
          </v-radio-group>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card flat v-if="formData.filterRadioEnum === 'Include rows by row number'">
      <v-card-title>Row Number Range</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="4">
            <v-text-field 
              label="Min" 
              v-model="formData.rowNumberRangeMin"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field 
              label="Max" 
              v-model="formData.rowNumberRangeMax"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-checkbox v-model="formData.rowNumberRangeEnd" label="to the end of the table"></v-checkbox>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import schema from '@/components/nodes/N12/schema.json'

export default {
  name: 'N01-Default',
  props: {
    selectedTab: {
      type: String
    }
  },
  data() {
    return {
      jsonData: null,
      schema: null,
      formData: {
        filterRadioEnum: "",
        columnValueMatching: null,
        includeRowValueEnum: "",
        patternMatching: "",
        patternMatchingType: "",
        rangeCheckingMin: "",
        rangeCheckingMax: "",
        rowNumberRangeMin: "",
        rowNumberRangeMax: "",
        endOfTheTable: false
      }
    }
  },
  components: {
  },
  methods: {
  },
  computed: {
  },
  created() {
    try {
      this.schema = schema;
      const property = schema.properties;

      this.formData.filterRadioEnum = property.filterRadioEnum.default;
      this.formData.columnValueMatching = property.columnValueMatching.default;
      this.formData.includeRowValueEnum = property.includeRowValueEnum.default;
      this.formData.patternMatching = property.patternMatching.default;
      this.formData.patternMatchingType = property.patternMatchingType.default;
      this.formData.rangeCheckingMin = property.rangeCheckingMin.default;
      this.formData.rangeCheckingMax = property.rangeCheckingMax.default;
      this.formData.rowNumberRangeMin = property.rowNumberRangeMin.default;
      this.formData.rowNumberRangeMax = property.rowNumberRangeMax.default;
      this.formData.endOfTheTable = property.endOfTheTable.default;

    } catch (error) {
      console.error('Failed to initialize formData:', error);
    }
  }
}
</script>
<style scoped>
/* ::v-deep(.v-card-title) { 
  font-size: 8px !important;
} */
</style>
