<template lang="">
  <v-container fluid>
    <CustomCard title="Input Location" flat>
      <v-select
        :items="[]"
        v-model="formData.inputLocationArray"
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
            :type="schema.properties.appendColumnName.type"
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
  name: 'C1_N01',
  components: {
    CustomCard
  },
  mixins: [formMixin]
}
</script>
<style lang=""></style>
