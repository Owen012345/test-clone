<template lang="">
  <v-container>
    <CustomCard title="Read" flat>
      <span>Read From</span>
      <v-select
        :items="schema.properties.readFromEnum.enum"
        v-model="formData.readFromEnum"
      ></v-select>
      <span>Mode</span>
      <v-select :items="schema.properties.modeEnum.enum" v-model="formData.modeEnum"></v-select>
      <v-checkbox
        hide-details
        v-model="formData.includeParentFolder"
        label="Include parent folder"
      ></v-checkbox>
      <v-checkbox
        hide-details
        v-model="formData.addFolderIdentifierColumn"
        label="Add folder identifier column"
      ></v-checkbox>
    </CustomCard>
  </v-container>
</template>
<script>
import CustomCard from '@/components/custom/customCard.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'N05',
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
