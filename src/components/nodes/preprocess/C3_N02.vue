<template lang="">
  <v-container fluid>
    <CustomCard title="Column Filter Settings" flat>
      <CustomSelectList
        :leftHeader="'Exclude'"
        :rightHeader="'Include'"
        v-model="formData.ColumnSelectionEnum"
        :items="schema.properties.ColumnSelectionEnum.enum"
      >
      </CustomSelectList>
    </CustomCard>
  </v-container>
</template>
<script>
import CustomCard from '@/components/custom/customCard.vue'
import formMixin from '@/components/mixins/formMixin'
import CustomSelectList from '@/components/custom/customSelectList.vue'
export default {
  name: 'C3_N02',
  components: {
    CustomCard,
    CustomSelectList
  },
  mixins: [formMixin]
}
</script>
<style lang=""></style>
