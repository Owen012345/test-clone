<template lang="">
  <v-container fluid>
    <CustomCard title="Input Location" flat>
      <v-select :items="[]" v-model="formData.inputLocationArray"></v-select>
      <v-checkbox
        hide-details
        v-model="formData.failOnMissingFiles"
        label="Fail if file does not exist ( only applies to local files )"
      ></v-checkbox>
    </CustomCard>
    <CustomCard title="New Column" flat>
      <v-radio-group v-model="formData.readerOptionEnum" hide-details>
        <template v-for="(item, index) in schema.properties.readerOptionEnum.enum" :key="index">
          <v-radio :label="item" :value="item"></v-radio>
          <CustomCard>
            <v-text-field
              :disabled="formData.readerOptionEnum !== 'Append column'"
              hide-details
              v-if="item === 'Append column'"
              v-model="formData.appendColumnName"
              :type="schema.properties.appendColumnName.type"
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
  mixins: [formMixin]
}
</script>
<style lang=""></style>
