<template lang="">
  <v-container>
    <CustomCard title="Read" flat>
      <span>Read From</span>
      <v-select
        :items="schema.properties.readFromEnum.enum"
        v-model="formData.readFromEnum"
      ></v-select>
      <span>Mode</span>
      <v-select :items="schema.properties.modeEnum.enum" v-model="formData.modeEnum"></v-select>
      <v-checkbox
        hide-details
        v-model="formData.includeParentFolder"
        label="Include parent folder"
      ></v-checkbox>
      <v-checkbox
        hide-details
        v-model="formData.addFolderIdentifierColumn"
        label="Add folder identifier column"
      ></v-checkbox>
    </CustomCard>
  </v-container>
</template>
<script>
import schema from '@/components/nodes/schema/C1_N05_schema.json'
import CustomCard from '@/components/custom/customCard.vue'
export default {
  name: 'N05',
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
        readFromEnum: null,
        modeEnum: null,
        includeParentFolder: false,
        addFolderIdentifierColumn: false
      }
    }
  },
  created() {
    try {
      this.schema = schema
      const property = schema.properties

      this.formData.readFromEnum = property.readFromEnum?.default
      this.formData.modeEnum = property.modeEnum?.default
      this.formData.includeParentFolder = property.includeParentFolder?.default
      this.formData.addFolderIdentifierColumn = property.addFolderIdentifierColumn?.default
    } catch (error) {
      console.error('Failed to initialize formData:', error)
    }
  }
}
</script>
<style lang=""></style>
