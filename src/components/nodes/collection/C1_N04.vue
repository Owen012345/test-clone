<template lang="">
  <v-container>
    <CustomCard title="Input Location" flat>
      <v-select :items="schema.properties.pathEnum.enum" v-model="formData.pathEnum"></v-select>
      <v-checkbox
        hide-details
        v-model="formData.failOnMissingPath"
        label="Fail if file/folder does not exist"
      ></v-checkbox>
      <v-checkbox
        hide-details
        v-model="formData.hasColumnHeader"
        label="Fail on missing values"
      ></v-checkbox>
    </CustomCard>
    <CustomCard title="Reader Options" flat>
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
  name: 'N04',
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
