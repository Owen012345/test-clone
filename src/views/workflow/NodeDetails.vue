<template lang="">
  <div class="nodedetails-container">
    <v-tabs v-model="selectedTabIdx">
      <v-tab v-for="(tab, idx) in tabs" :key="idx" :title="tab.title">
        {{ tab.title }}
      </v-tab>
    </v-tabs>
    <v-tabs-window v-model="selectedTabIdx">
      <v-tabs-window-item v-for="(tab, idx) in tabs" :key="idx">
        <SettingItems
          ref="settingItems"
          v-if="selectedNode && tab.title === 'Settings'"
          :selectedNode="selectedNode"
        />
        <StorageItems
          ref="storageItems"
          v-if="selectedNode && tab.title === 'Settings'"
          :selectedNode="selectedNode"
        />
        <MetadataItem
          ref="metadataItem"
          :selectedNode="selectedNode"
          v-else-if="selectedNode && tab.title === 'Metadata'"
        />
      </v-tabs-window-item>
    </v-tabs-window>
    <div v-if="selectedNode" class="execution-footer">
      <v-btn @click="saveForms">OK</v-btn>
      <v-btn>Cancel</v-btn>
      <v-btn>Execute</v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
    saveForms() {
      if (this.$refs.metadataItem && this.$refs.metadataItem[0]) {
        this.$refs.metadataItem[0].metadataFormUpdate()
      }

      if (
        this.$refs.settingItems &&
        this.$refs.settingItems[0] &&
        this.$refs.settingItems[0].$refs.settingItem
      ) {
        this.$refs.settingItems[0].$refs.settingItem.settingFormUpdate()
      }

      if (this.$refs.storageItems && this.$refs.storageItems[0]) {
        this.$refs.storageItems[0].storageFormUpdate()
      }
    }
  }
}
</script>
<style lang="scss">
.nodedetails-container {
  position: relative;
  padding-bottom: 60px;
}
.execution-footer {
  position: absolute; /* 또는 fixed로 설정 가능 */
  width: 100%;
  height: 40px; /* 고정 높이 */
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
