<template lang="">
  <v-container fluid>
    <CustomCard title="Write DB Config">
      <span>hostname(IP)</span>
      <v-text-field hide-details v-model="formData.hostname"></v-text-field>
      <span>port</span>
      <v-text-field hide-details v-model="formData.port"></v-text-field>
      <span>database name</span>
      <v-text-field hide-details v-model="formData.databaseName"></v-text-field>
      <span>table name</span>
      <v-text-field hide-details v-model="formData.tableName"></v-text-field>
      <span>Authentication</span>
      <v-row>
        <v-col auto>username</v-col>
        <v-col>
          <v-text-field hide-details v-model="formData.authUsername"></v-text-field>
        </v-col>
        <v-col auto>password</v-col>
        <v-col>
          <v-text-field hide-details v-model="formData.authPassword"></v-text-field>
        </v-col>
      </v-row>
    </CustomCard>
  </v-container>
</template>

<script>
import CustomCard from '@/components/custom/CustomCard.vue'
import formMixin from '@/components/mixins/formMixin'

export default {
  name: 'C1_N11',
  components: {
    CustomCard
  },
  mixins: [formMixin]
}
</script>

<style lang=""></style>
