<template lang="">
  <v-container fluid>
    <CustomCard title="Uploader Settings" flat>
      <span>Save Format</span>
      <v-radio-group v-model="formData.saveFormatEnum" inline hide-details>
        <v-radio
          v-for="(item, index) in schema.properties.saveFormatEnum.enum"
          :key="index"
          :label="item"
          :value="item"
        >
        </v-radio>
      </v-radio-group>
      <span>Category ID</span>
      <v-text-field
        v-model="formData.categoryId"
        :type="schema.properties.categoryId.type"
      ></v-text-field>
      <span>Profile ID</span>
      <v-text-field
        v-model="formData.profileId"
        :type="schema.properties.profileId.type"
      ></v-text-field>
    </CustomCard>
  </v-container>
</template>
<script>
import CustomCard from '@/components/custom/CustomCard.vue'
import formMixin from '@/components/mixins/formMixin'
export default {
  name: 'C1_N13',
  components: {
    CustomCard
  },
  mixins: [formMixin]
}
</script>
<style lang=""></style>
