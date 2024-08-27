<template lang="">
  <v-container fluid>
    <CustomCard title="Column Select">
      <CustomSelectList
        :leftHeader="'Excludes'"
        :rightHeader="'Includes'"
        v-model="formData.columnSelectionArray"
        :items="[]"
      >
      </CustomSelectList>
    </CustomCard>
    <CustomCard title="Replace/Append Selection">
      <v-radio-group v-model="formData.replaceAppendSelectionEnum" inline hide-details>
        <v-radio
          v-for="(item, index) in schema.properties.replaceAppendSelectionEnum.enum"
          :key="index"
          :label="item"
          :value="item"
        >
        </v-radio>
      </v-radio-group>
    </CustomCard>
    <CustomCard title="Type and Format Selection">
      <span>Date Format</span>
      <v-select
        :items="schema.properties.dateFormatEnum.enum"
        v-model="formData.dateFormatEnum"
        hide-details
      ></v-select>
      <span>Locale</span>
      <v-select
        :items="schema.properties.localeEnum.enum"
        v-model="formData.localeEnum"
        hide-details
      ></v-select>
    </CustomCard>
  </v-container>
</template>
<script>
import CustomCard from '@/components/custom/CustomCard.vue'
import formMixin from '@/components/mixins/formMixin'
import CustomSelectList from '@/components/custom/CustomSelectList.vue'
export default {
  name: 'C4_N04',
  components: {
    CustomCard,
    CustomSelectList
  },
  mixins: [formMixin]
}
</script>
