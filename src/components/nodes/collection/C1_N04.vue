<template lang="">
  <v-container fluid>
    <CustomCard title="Input Location" flat>
      <v-select :items="[]" v-model="formData.pathArray"></v-select>
      <v-checkbox
        hide-details
        v-model="formData.failOnMissingPath"
        label="Fail if file/folder does not exist"
      ></v-checkbox>
      <v-checkbox
        hide-details
        v-model="formData.failOnMissingValues"
        label="Fail on missing values"
      ></v-checkbox>
    </CustomCard>
    <CustomCard title="Reader Options" flat>
      <v-radio-group v-model="formData.readerOptionEnum">
        <template v-for="(item, index) in schema.properties.readerOptionEnum.enum" :key="index">
          <v-radio :label="item" :value="item"></v-radio>
          <v-text-field
            :type="schema.properties.appendColumnName.type"
            :disabled="formData.readerOptionEnum !== 'Append column'"
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
import CustomCard from '@/components/custom/customCard.vue'
import formMixin from '@/components/mixins/formMixin'
export default {
  name: 'C1_N04',
  components: {
    CustomCard
  },
  mixins: [formMixin]
}
</script>
<style lang=""></style>
