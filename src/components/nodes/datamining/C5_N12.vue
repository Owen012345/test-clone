<template lang="">
  <v-container fluid>
    <CustomCard title="Standard settings">
      <span>Epsilon</span>
      <v-text-field
        v-model="formData.epsilon"
        :type="schema.properties.epsilon.type"
        outlined
        hide-details
      ></v-text-field>
      <span>Minimum points</span>
      <v-text-field
        v-model="formData.minimumPoints"
        :type="schema.properties.minimumPoints.type"
        outlined
        hide-details
      ></v-text-field>
    </CustomCard>
  </v-container>
</template>
<script>
import CustomCard from '@/components/custom/CustomCard.vue'
import formMixin from '@/components/mixins/formMixin'

export default {
  name: 'C5_N12',
  components: {
    CustomCard
  },
  mixins: [formMixin]
}
</script>
<style lang=""></style>
