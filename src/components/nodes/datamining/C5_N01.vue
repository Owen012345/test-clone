<template lang="">
  <v-container fluid>
    <CustomCard title="Choose size of first partition" flat>
      <v-radio-group v-model="formData.partitionType" hide-details>
        <template v-for="(item, index) in schema.properties.partitionType.enum" :key="index">
          <v-radio :label="item" :value="item"></v-radio>
          <CustomCard v-if="item === 'Absolute'">
            <v-text-field
              hide-details
              v-model="formData.partitionAbsolute"
              :type="schema.properties.partitionAbsolute.type"
              :disabled="formData.partitionType !== 'Absolute'"
            >
            </v-text-field>
          </CustomCard>
          <CustomCard v-if="item === 'Relative[%]'">
            <v-text-field
              hide-details
              v-model="formData.partitionRelative"
              :type="schema.properties.partitionRelative.type"
              :disabled="formData.partitionType !== 'Relative[%]'"
            >
            </v-text-field>
          </CustomCard>
        </template>
      </v-radio-group>
    </CustomCard>
    <CustomCard title="Partitioning options" flat>
      <v-radio-group v-model="formData.partitioningOptions" inline hide-details>
        <v-radio
          v-for="(item, index) in schema.properties.partitioningOptions.enum"
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
  name: 'C5_N01',
  components: {
    CustomCard
  },
  mixins: [formMixin]
}
</script>
<style lang=""></style>
