<template lang="">
  <v-container fluid>
    <CustomCard title="JSON File Reader Settings">
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
    </CustomCard>
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
