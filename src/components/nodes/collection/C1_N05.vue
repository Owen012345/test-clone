<template lang="">
  <v-container fluid>
    <CustomCard title="Read" flat>
      <span>Read From</span>
      <v-select
        :items="schema.properties.readFromEnum.enum"
        v-model="formData.readFromEnum"
      ></v-select>
      <span>Mode</span>
      <v-radio-group v-model="formData.modeEnum" inline hide-details>
        <v-radio
          v-for="(item, index) in schema.properties.modeEnum.enum"
          :key="index"
          :label="item"
          :value="item"
        >
        </v-radio>
      </v-radio-group>
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
import CustomCard from '@/components/custom/CustomCard.vue'
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
