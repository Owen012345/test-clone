<template lang="">
  <v-container fluid>
    <CustomCard title="Storage Config">
      <span>aws_access_key_id</span>
      <v-text-field hide-details v-model="formData.aws_access_key_id"></v-text-field>
      <span>aws_secret_access_key</span>
      <v-text-field hide-details v-model="formData.aws_secret_access_key"></v-text-field>
      <span>bucket_name</span>
      <v-text-field hide-details v-model="formData.bucket_name"></v-text-field>
      <span>prefix</span>
      <v-text-field hide-details v-model="formData.prefix"></v-text-field>
    </CustomCard>
    <!-- <CustomCard title="JSON File Reader Settings">
      <span>File Path</span>
      <v-text-field hide-details v-model="formData.filePath"></v-text-field>
      <span>Orient</span>
      <v-radio-group v-model="formData.orientEnum" inline>
        <v-radio
          v-for="(item, index) in schema.properties.orientEnum.enum"
          :key="index"
          :label="item"
          :value="item"
        >
        </v-radio>
      </v-radio-group>
    </CustomCard> -->
  </v-container>
</template>
<script>
import CustomCard from '@/components/custom/CustomCard.vue'
import formMixin from '@/components/mixins/formMixin'
export default {
  name: 'C1_N10',
  components: {
    CustomCard
  },
  mixins: [formMixin]
}
</script>
<style lang=""></style>
