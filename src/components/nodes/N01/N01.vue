<template lang="">
  <JsonForms :data="jsonData" :schema="jsonschema" :uischema="jsonUiSchema" @update:data="handleDataUpdate">
  </JsonForms>  
  <v-container>
    <v-card flat>
      <v-card-title>
        Form Data
      </v-card-title>
      <v-card-text>
        <pre>{{ formData }}</pre>
      </v-card-text>
    </v-card>
    <v-card flat>
      <v-card-title>Filter</v-card-title>
      <v-card-text>
        <v-radio-group v-model="formData.filterRadioEnum" inline >
          <v-radio
            v-for="(item, index) in jsonschema2.properties.filterRadioEnum.enum"
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
            <v-select variant="outlined" v-model="formData.columnValueMatching" :items="jsonschema2.properties.columnValueMatching.enum"></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-radio-group v-model="formData.includeRowValueEnum">
            <template
              v-for="(item, index) in jsonschema2.properties.includeRowValueEnum.enum"
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
                        v-for="(item, index) in jsonschema2.properties.patternMatchingType.enum"
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
    </v-card>
  </v-container>
</template>
<script>
import JsonForms from '@/components/jsonforms/index.vue'
import schema from '@/components/nodes/N01/schema.json'
import schema2 from '@/components/nodes/N01/schema2.json'
import uiSchema from '@/components/nodes/N01/uiSchema.json'
import data from '@/components/nodes/N01/data.json'

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
      formData: {
        filterRadioEnum : "Include rows by attribute value",
        columnValueMatching: null,
        patternMatching: '',
        patternMatchingType: null,
        includeRowValueEnum: "use pattern matching",
        rangeCheckingMin: '',
        rangeCheckingMax: '',
      }
    }
  },
  components: {
    JsonForms
  },
  methods: {
    handleDataUpdate(updatedData) {
      this.jsonData = updatedData
      console.log(this.jsonData)
    }
  },
  computed: {
    jsonschema() {
      return schema
    },
    jsonschema2() {
      return schema2
    },
    jsonUiSchema() {
      return uiSchema
    },
  },
  created() {
    this.jsonData = data
  }
}
</script>
<style scoped>
/* ::v-deep(.v-card-title) { 
  font-size: 8px !important;
} */
</style>
