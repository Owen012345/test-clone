<template lang="">
    <v-container>
    <CustomCard title="Input Location" flat>
      <span>Read From</span>
      <v-select :items="schema.properties.readFromEnum.enum" v-model="formData.readFromEnum"></v-select>
      <span>File(csv)</span>
      <v-text-field hide-details v-model="formData.file"></v-text-field>
    </CustomCard>
    <CustomCard title="Reader Options" flat>
      <span>Column Delimiter</span>
      <v-text-field hide-details v-model="formData.columnDelimiter"></v-text-field>
      <v-checkbox hide-details v-model="formData.columnHeader" label="Column Header"></v-checkbox>
      <v-checkbox hide-details v-model="formData.rowId" label="Row ID"></v-checkbox>
    </CustomCard>
  </v-container>
</template>
<script>
import schema from '@/components/nodes/N01/schema.json'
import CustomCard from '@/components/custom/customCard.vue'
export default {
    name: 'N01',
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
            schema : null,
            formData : {
                readFromEnum : null,
                file: "",
                columnDelimiter: "",
                columnHeader : false,
                rowId :false,
            }
        }
    },
    created() {
        try {
            this.schema = schema;
            const property = schema.properties;

            this.formData.readFromEnum = property.readFromEnum.default;
            this.formData.file = property.file.default;
            this.formData.columnDelimiter = property.columnDelimiter.default;
            this.formData.columnHeader = property.columnHeader.default;
            this.formData.rowId = property.rowId.default;

        } catch (error) {
            console.error('Failed to initialize formData:', error);
        }
    }
}
</script>
<style lang="">
    
</style>