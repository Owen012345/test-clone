<template lang="">
  <v-container>
    <CustomCard title="Input Location" flat>
      <v-select
        :items="schema.properties.inputLocationEnum.enum"
        v-model="formData.inputLocationEnum"
      ></v-select>
      <v-checkbox
        hide-details
        v-model="formData.failOnMissingFiles"
        label="Fail if file does not exist ( only applies to local files )"
      ></v-checkbox>
    </CustomCard>
    <CustomCard title="New Column" flat>
      <v-radio-group v-model="formData.readerOptionRadioEnum">
        <template
          v-for="(item, index) in schema.properties.readerOptionRadioEnum.enum"
          :key="index"
        >
          <v-radio :label="item" :value="item"></v-radio>
          <v-text-field
            :disabled="formData.readerOptionRadioEnum !== 'Append column'"
            hide-details
            v-if="item === 'Append column'"
            v-model="formData.appendColumnName"
          ></v-text-field>
        </template>
      </v-radio-group>
    </CustomCard>
  </v-container>
</template>
<script>
import schema from '@/components/nodes/schema/C1_N06_schema.json'
import CustomCard from '@/components/custom/customCard.vue'
export default {
  name: 'N06',
  props: {
    selectedTab: {
      type: String
    }
  },
  components: {
    CustomCard
  },
  data() {
    return {
      schema: null,
      formData: {
        inputLocationEnum: null,
        failOnMissingFiles: false,
        failOnMissingValues: false,
        readerOptionRadioEnum: null,
        appendColumnName: ''
      }
    }
  },
  created() {
    try {
      this.schema = schema
      const property = schema.properties

      this.formData.inputLocationEnum = property.inputLocationEnum?.default
      this.formData.failOnMissingFiles = property.failOnMissingFiles?.default
      this.formData.readerOptionRadioEnum = property.readerOptionRadioEnum?.default
      this.formData.appendColumnName = property.appendColumnName?.default
    } catch (error) {
      console.error('Failed to initialize formData:', error)
    }
  }
}
</script>
<style lang=""></style>
