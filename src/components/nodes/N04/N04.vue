<template lang="">
  <v-container>
    <CustomCard title="Input Location" flat>
      <v-select :items="schema.properties.pathEnum.enum" v-model="formData.pathEnum"></v-select>
      <v-checkbox
        hide-details
        v-model="formData.failOnMissingPath"
        label="Fail if file/folder does not exist"
      ></v-checkbox>
      <v-checkbox
        hide-details
        v-model="formData.hasColumnHeader"
        label="Fail on missing values"
      ></v-checkbox>
    </CustomCard>
    <CustomCard title="Reader Options" flat>
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
import schema from '@/components/nodes/N04/schema.json'
import CustomCard from '@/components/custom/customCard.vue'
export default {
  name: 'N04',
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
        pathEnum: null,
        failOnMissingPath: false,
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

      this.formData.pathEnum = property.pathEnum?.default
      this.formData.failOnMissingPath = property.failOnMissingPath?.default
      this.formData.failOnMissingValues = property.failOnMissingValues?.default
      this.formData.readerOptionRadioEnum = property.readerOptionRadioEnum?.default
      this.formData.appendColumnName = property.appendColumnName?.default
    } catch (error) {
      console.error('Failed to initialize formData:', error)
    }
  }
}
</script>
<style lang=""></style>
