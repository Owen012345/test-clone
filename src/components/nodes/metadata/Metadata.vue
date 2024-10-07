<template lang="">
  <v-container fluid>
    <v-form ref="form">
      <CustomCard title="Input Node(s)" v-if="Object.keys(inputNodes).length > 0">
        <InputTable :inputNodes="inputNodes"></InputTable>
      </CustomCard>
      <CustomCard title="docker repo address">
        <v-text-field
          placeholder="Insert address"
          v-model="metadata.address"
          :rules="[(v) => !!v || 'Address is required']"
        >
        </v-text-field>
      </CustomCard>
      <CustomCard title="version settings">
        <v-select
          single-line
          label="docker image versions"
          :items="dockerImageVersionList"
          v-model="metadata.version"
          :rules="[(v) => !!v || 'Version is required']"
        >
        </v-select>
      </CustomCard>
    </v-form>
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
      type: Object
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
    }),
    metadataFormUpdate() {
      this.updateContainerTemplate({
        name: this.selectedNode.id,
        metadata: this.metadata
      })
      this.updateMetadaData({
        nodeId: this.selectedNode.id,
        metadata: this.metadata
      })
    },
    metadataFormReset() {
      this.metadata = { ...this.initMetadata }
    },
    validate() {
      return this.$refs.form.validate()
    }
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
      return this.getTargetNodeInputInfo(this.selectedNode?.id)
    },
    initMetadata() {
      return this.getDefaultMetadataNodeSchema(this.selectedNode?.id)
    }
  },
  watch: {
    // 자동 저장
    // metadata: {
    //   handler(newVal) {
    //     // this.metadata = newVal
    //     console.log(this.metadata)
    //     // this.updateContainerTemplate({
    //     //   name: this.selectedNode.id,
    //     //   metadata: newVal
    //     // })
    //     // this.updateMetadaData({
    //     //   nodeId: this.selectedNode.id,
    //     //   metadata: newVal
    //     // })
    //   },
    //   deep: true
    // },

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
        // console.log(newVal, oldVal)
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.metadata = { ...this.initMetadata }
    this.inputNodes = { ...this.getInputNodes }
  }
}
</script>
<style lang=""></style>
