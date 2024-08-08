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
import CustomCard from '@/components/custom/customCard.vue'
import formMixin from '@/components/mixins/formMixin'
export default {
  name: 'C1_N05',
  components: {
    CustomCard
  },
  mixins: [formMixin]
}
</script>
<style lang=""></style>
