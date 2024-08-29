<template lang="">
  <v-container fluid>
    <CustomCard title="Column Settings">
      <v-select
        v-model="formData.columnSelectionArray"
        :items="[]"
        outlined
        hide-details
      ></v-select>
    </CustomCard>
  </v-container>
</template>
<script>
import CustomCard from '@/components/custom/CustomCard.vue'
import formMixin from '@/components/mixins/formMixin'

export default {
  name: 'C5_N05',
  components: {
    CustomCard
  },
  mixins: [formMixin]
}
</script>
<style lang=""></style>
