<template lang="">
  <v-container fluid>
    <CustomCard title="Standard settings">
      <span>Column with values to count</span>
      <v-select
        v-model="formData.columnSelectionArray"
        :items="[]"
        outlined
        hide-details
      ></v-select>
      <v-checkbox
        v-model="formData.enableHiliting"
        label="Count missing values"
        hide-details
      ></v-checkbox>
    </CustomCard>
  </v-container>
</template>
<script>
import CustomCard from '@/components/custom/CustomCard.vue'
import CustomSelectList from '@/components/custom/CustomSelectList.vue'
import formMixin from '@/components/mixins/formMixin'

export default {
  name: 'C5_N08',
  components: {
    CustomCard,
    CustomSelectList
  },
  mixins: [formMixin]
}
</script>
<style lang=""></style>
