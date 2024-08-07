<template lang="">
  <v-container>
    <CustomCard title="Input Location" flat>
      <v-select
        :items="schema.properties.inputLocationEnum.enum"
        v-model="formData.inputLocationEnum"
      ></v-select>
      <v-checkbox
        hide-details
        v-model="formData.failOnMissingFiles"
        label="Fail if file does not exist ( only applies to local files )"
      ></v-checkbox>
    </CustomCard>
    <CustomCard title="New Column" flat>
      <v-radio-group v-model="formData.readerOptionRadioEnum">
        <template
          v-for="(item, index) in schema.properties.readerOptionRadioEnum.enum"
          :key="index"
        >
          <v-radio :label="item" :value="item"></v-radio>
          <v-text-field
            :disabled="formData.readerOptionRadioEnum !== 'Append column'"
            hide-details
            v-if="item === 'Append column'"
            v-model="formData.appendColumnName"
          ></v-text-field>
        </template>
      </v-radio-group>
    </CustomCard>
  </v-container>
</template>
<script>
import CustomCard from '@/components/custom/customCard.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'N06',
  props: {
    selectedTab: {
      type: String
    },
    selectedNodeId: {
      type: String
    }
  },
  components: {
    CustomCard
  },
  computed: {
    ...mapGetters('nodeDetail', {
      getInitNodeSchema: 'getInitNodeSchema',
      getDefaultNodeSchema: 'getDefaultNodeSchema'
    }),
    formData() {
      return this.getDefaultNodeSchema(this.selectedNodeId)
    },
    schema() {
      return this.getInitNodeSchema(this.selectedNodeId)
    }
  }
}
</script>
<style lang=""></style>
