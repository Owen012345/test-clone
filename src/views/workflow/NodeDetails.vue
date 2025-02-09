<template lang="">
  <div class="nodedetails-container">
    <!-- Tab 버튼 구현 -->
    <div v-if="!selectedNode" class="placeholder">Show property inputs and node outputs.</div>
    <div class="tabs" v-show="selectedNode">
      <button
        v-for="(tab, idx) in tabs"
        :key="idx"
        @click="selectTab(idx)"
        :class="{ active: selectedTabIdx === idx }"
      >
        {{ tab.title }}
      </button>
    </div>

    <!-- Tab 내용 구현 -->
    <div class="tabs-content">
      <SettingItems
        v-show="selectedNode && selectedTabTitle === 'Settings'"
        ref="settingItems"
        :selectedNode="selectedNode"
      />
      <StorageItems
        v-show="selectedNode && selectedTabTitle === 'Settings'"
        ref="storageItems"
        :selectedNode="selectedNode"
      />
      <MetadataItem
        v-show="selectedNode && selectedTabTitle === 'Metadata'"
        ref="metadataItem"
        :selectedNode="selectedNode"
      />
    </div>

    <div v-if="selectedNode" class="execution-footer">
      <v-btn @click="saveForms">OK</v-btn>
      <v-btn @click="cancelForms">Cancel</v-btn>
      <v-btn @click="executionNode">Execute</v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import StorageItems from '@/components/nodes/settings/Storage.vue'
import SettingItems from '@/views/workflow/details/ComponentRender.vue'
import MetadataItem from '@/components/nodes/metadata/Metadata.vue'

export default {
  name: 'NodeDetails',
  components: { StorageItems, SettingItems, MetadataItem },
  data() {
    return {
      selectedTabIdx: 0,
      selectedTabTitle: '',
      tabs: [{ title: 'Metadata' }, { title: 'Settings' }, { title: 'Output' }, { title: 'Logs' }]
    }
  },
  computed: {
    ...mapGetters('workflow', ['getSelectedNode']),
    selectedNode() {
      const selectedNode = this.getSelectedNode

      if (!selectedNode.id && !selectedNode.nodeId) return null
      if (
        selectedNode.nodeId === 'C2_N02' ||
        selectedNode.nodeId === 'C2_N03' ||
        selectedNode.nodeId === 'C2_N04'
      ) {
        return { ...selectedNode, nodeId: 'C2_N01' }
      }

      return selectedNode
    }
  },
  watch: {
    selectedTabIdx: {
      handler(newVal) {
        this.selectedTabTitle = this.tabs[newVal].title
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations('nodeDetail', {
      updateNodeStatus: 'UPDATE_NODE_STATUS',
      updateNodeValidation: 'UPDATE_NODE_VALIDATION'
    }),
    selectTab(index) {
      this.selectedTabIdx = index
    },
    async saveForms() {
      if (this.selectedTabTitle === 'Metadata') {
        this.$refs.metadataItem.metadataFormUpdate()
      } else if (this.selectedTabTitle === 'Settings') {
        this.$refs.settingItems.$refs.settingItem.settingFormUpdate()
        this.$refs.storageItems.storageFormUpdate()
      }

      const checkValidation = await this.validateAll()

      if (checkValidation) {
        // console.log('passed validation')
        this.updateNodeValidation({ id: this.selectedNode.id, validation: checkValidation })
        this.updateNodeStatus({ id: this.selectedNode.id, status: 'ready' })
      } else {
        // console.log('failed validation')
        this.updateNodeValidation({ id: this.selectedNode.id, validation: checkValidation })
        this.updateNodeStatus({ id: this.selectedNode.id, status: 'failed' })
      }
    },

    async validateAll() {
      // console.log(this.$refs.storageItems.validate())
      const { valid: isSettingItemsValid } = await this.$refs.settingItems.validate()
      const isStorageItemsValid = await this.$refs.storageItems.validate()
      const { valid: isMetadataItemValid } = await this.$refs.metadataItem.validate()
      // console.log(
      //   'isSettingItemsValid',
      //   isSettingItemsValid,
      //   'isStorageItemsValid',
      //   isStorageItemsValid,
      //   'isMetadataItemValid',
      //   isMetadataItemValid
      // )
      return isSettingItemsValid && isStorageItemsValid && isMetadataItemValid
    },

    cancelForms() {
      if (this.selectedTabTitle === 'Metadata') {
        this.$refs.metadataItem.metadataFormReset()
      } else if (this.selectedTabTitle === 'Settings') {
        this.$refs.settingItems.$refs.settingItem.settingFormReset()
        this.$refs.storageItems.storageFormReset()
      }
    },

    async executionNode() {
      // TODO : 현재는 항상 단독 node excution 시, status 'success'
      this.updateNodeStatus({ id: this.selectedNode.id, status: 'success' })
    }
  }
}
</script>

<style lang="scss" scoped>
.placeholder {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  color: #aaa;
  text-align: center;
}
.nodedetails-container {
  position: relative;
  padding-bottom: 60px;
}

.tabs {
  display: flex;
  margin: 10px;
}

.tabs button {
  margin-right: 10px;
  padding: 10px;
  cursor: pointer;
  border: none;
  background-color: #f0f0f0;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.tabs button.active {
  background-color: #d9d9d9;
  color: black;
}

.execution-footer {
  position: absolute;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  padding: 10px;
  > .v-btn {
    margin: 0 10px;
  }
}
</style>
