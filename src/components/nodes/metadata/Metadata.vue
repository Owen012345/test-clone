<template lang="">
  <v-container fluid>
    <CustomCard title="Input Node(s)">
      <InputTable :inputNodes="inputNodes"></InputTable>
    </CustomCard>
    <CustomCard title="docker repo address">
      <v-text-field placeholder="Insert address" hide-details v-model="metadata.address">
      </v-text-field>
    </CustomCard>
    <CustomCard title="version settings">
      <v-select
        single-line
        label="docker image versions"
        :items="dockerImageVersionList"
        v-model="metadata.version"
      >
      </v-select>
    </CustomCard>
    <CustomCard title="information"> </CustomCard>
  </v-container>
</template>
<script>
import CustomCard from '@/components/custom/CustomCard.vue'
import InputTable from './InputTable.vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'MetadataItem',
  components: {
    CustomCard,
    InputTable
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
      inputNodes: {},
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
    ...mapGetters('workflow', {
      getTargetNodeInputInfo: 'getTargetNodeInputInfo',
      getTargetNodeInputConnections: 'getTargetNodeInputConnections'
    }),
    getInputConnections() {
      return this.getTargetNodeInputConnections
    },
    getInputNodes() {
      return this.getTargetNodeInputInfo(this.selectedNode.id)
    },
    initMetadata() {
      return this.getDefaultMetadataNodeSchema(this.selectedNode.id)
    }
  },
  mounted() {
    this.metadata = { ...this.initMetadata }
    this.inputNodes = { ...this.getInputNodes }
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
          this.inputNodes = { ...this.getInputNodes }
        }
      }
    },
    getTargetNodeInputConnections: {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style lang=""></style>
