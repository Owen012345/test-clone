<template lang="">
  <v-container fluid>
    <CustomCard title="Column Value Matching" flat>
      <v-radio-group v-model="formData.rowIdEnum" inline hide-details>
        <v-radio
          v-for="(item, index) in schema.properties.rowIdEnum.enum"
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
  name: 'C4_N02',
  components: {
    CustomCard
  },
  mixins: [formMixin]
}
</script>
<style lang=""></style>
