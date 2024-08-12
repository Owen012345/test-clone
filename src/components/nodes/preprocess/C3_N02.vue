<template lang="">
  <v-container fluid>
    <CustomCard title="Column Filter Settings" flat>
      <v-radio-group v-model="formData.ColumnFilterEnum" inline>
        <v-radio
          v-for="(item, index) in schema.properties.ColumnFilterEnum.enum"
          :key="index"
          :label="item"
          :value="item"
        >
        </v-radio>
      </v-radio-group>
      <CustomSelectList
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
