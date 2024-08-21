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
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'MetadataItem',
  components: {
    CustomCard
  },
  props: {
    selectedNode: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      metadata: {},
      dockerImageVersionList: ['latest', '1.0.1', '1.0.0']
    }
  },
  methods: {
    ...mapActions('nodeDetail', {
      updateMetadaData: 'updateMetadaData'
    }),
    ...mapMutations('argo', {
      updateContainerTemplate: 'UPDATE_CONTAINER_TEMPLATE'
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
        this.updateContainerTemplate({
          name: this.selectedNode.id,
          metadata: newVal
        })
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
  }
}
</script>
<style lang=""></style>
