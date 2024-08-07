<template lang="">
  <v-container>
    <CustomCard title="Input Location" flat>
      <span>Read From</span>
      <v-select
        :items="schema.properties.readFromEnum.enum"
        v-model="formData.readFromEnum"
      ></v-select>
      <span>File</span>
      <v-text-field hide-details v-model="formData.file"></v-text-field>
    </CustomCard>
    <CustomCard title="Reader Options" flat>
      <span>Column Delimiter</span>
      <v-text-field hide-details v-model="formData.columnDelimiter"></v-text-field>
      <v-checkbox
        hide-details
        v-model="formData.hasColumnHeader"
        label="Has column header"
      ></v-checkbox>
      <v-checkbox hide-details v-model="formData.hasRowId" label="Has RowID"></v-checkbox>
    </CustomCard>
  </v-container>
</template>
<script>
import CustomCard from '@/components/custom/customCard.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'N03',
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
