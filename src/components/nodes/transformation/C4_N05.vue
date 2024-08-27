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
    <CustomCard title="Start Time Settings">
      <v-radio-group v-model="formData.startTimeSettingEnum" hide-details>
        <template v-for="(item, index) in schema.properties.startTimeSettingEnum.enum" :key="index">
          <v-radio :label="item" :value="item"></v-radio>
          <CustomCard v-if="item === 'Custom'">
            <span>Date</span>
            <v-text-field
              :type="schema.properties.startTimeCustomDate.type"
              :disabled="formData.startTimeSettingEnum !== 'Custom'"
              hide-details
              v-model="formData.startTimeCustomDate"
            ></v-text-field>
            <span>Time</span>
            <v-text-field
              :type="schema.properties.startTimeCustomTime.type"
              :disabled="formData.startTimeSettingEnum !== 'Custom'"
              hide-details
              v-model="formData.startTimeCustomTime"
            ></v-text-field>
          </CustomCard>
        </template>
      </v-radio-group>
    </CustomCard>
    <CustomCard title="End Time Settings">
      <v-radio-group v-model="formData.endTimeSettingEnum" hide-details>
        <template v-for="(item, index) in schema.properties.endTimeSettingEnum.enum" :key="index">
          <v-radio :label="item" :value="item"></v-radio>
          <CustomCard v-if="item === 'Custom'">
            <span>Date</span>
            <v-text-field
              :type="schema.properties.endTimeCustomDate.type"
              :disabled="formData.endTimeSettingEnum !== 'Custom'"
              hide-details
              v-model="formData.endTimeCustomDate"
            ></v-text-field>
            <span>Time</span>
            <v-text-field
              :type="schema.properties.endTimeCustomTime.type"
              :disabled="formData.endTimeSettingEnum !== 'Custom'"
              hide-details
              v-model="formData.endTimeCustomTime"
            ></v-text-field>
          </CustomCard>
        </template>
      </v-radio-group>
    </CustomCard>
    <!-- <CustomCard title="Replace/Append Selection">
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
      <span>New Type</span>
      <v-select
        :items="schema.properties.newTypeEnum.enum"
        v-model="formData.newTypeEnum"
        hide-details
      ></v-select>
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
    </CustomCard> -->
  </v-container>
</template>
<script>
import CustomCard from '@/components/custom/CustomCard.vue'
import formMixin from '@/components/mixins/formMixin'
import CustomSelectList from '@/components/custom/CustomSelectList.vue'
export default {
  name: 'C4_N05',
  components: {
    CustomCard,
    CustomSelectList
  },
  mixins: [formMixin]
}
</script>
