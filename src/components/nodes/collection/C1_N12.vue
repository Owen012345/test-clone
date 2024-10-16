<template lang="">
  <v-container fluid>
    <CustomCard title="Web Crawler" flat>
      <span>Portal Name</span>
      <v-select
        :items="schema.properties.portalNameEnum.enum"
        v-model="formData.portalNameEnum"
      ></v-select>
      <span>Last Collected Timestamp</span>
      <v-text-field
        v-model="formData.timestamp"
        :type="schema.properties.timestamp.type"
      ></v-text-field>
    </CustomCard>
  </v-container>
</template>
<script>
import CustomCard from '@/components/custom/CustomCard.vue'
import formMixin from '@/components/mixins/formMixin'
export default {
  name: 'C1_N12',
  components: {
    CustomCard
  },
  mixins: [formMixin]
}
</script>
<style lang=""></style>
