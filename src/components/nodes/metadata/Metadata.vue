<template lang="">
  <v-container fluid>
    <CustomCard title="docker repo address">
      <v-text-field hide-details v-model="metadata.address"> </v-text-field>
    </CustomCard>
    <CustomCard title="version settings">
      <v-select :items="dockerImageVersionList" v-model="metadata.version"> </v-select>
    </CustomCard>
    <CustomCard title="information"> </CustomCard>
  </v-container>
</template>
<script>
import CustomCard from '@/components/custom/CustomCard.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'MetadataItem',
  components: {
    CustomCard
  },
  data() {
    return {
      metadata: {},
      dockerImageVersionList: []
    }
  },
  methods: {
    ...mapActions('nodeDetail', {
      updateMetadaData: 'updateMetadaData'
    })
  },
  computed: {
    ...mapGetters('nodeDetail', {
      getDefaultMetadataNodeSchema: 'getDefaultMetadataNodeSchema'
    }),
    initMetadata() {
      return this.getDefaultMetadataNodeSchema(this.selectedNode.id)
    }
  },
  mounted() {
    this.metadata = { ...this.initMetadata }
  },
  watch: {
    metadata: {
      handler(newVal) {
        this.updateMetadaData({
          nodeId: this.selectedNode.id,
          metadata: newVal
        })
      },
      deep: true
    },
    'selectedNode.id': {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.metadata = { ...this.initMetadata }
        }
      }
    }
  },
  props: {
    selectedNode: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang=""></style>
