<template lang="">
  <div class="nodedetails-container">
    <v-tabs v-model="selectedTabIdx">
      <v-tab v-for="(tab, idx) in tabs" :key="idx" :title="tab.title">
        {{ tab.title }}
      </v-tab>
    </v-tabs>
    <v-tabs-window v-model="selectedTabIdx">
      <v-tabs-window-item v-for="(tab, idx) in tabs" :key="idx">
        <ComponentRender
          v-if="selectedNode && tab.title === 'Settings'"
          :selectedTab="selectedTabTitle"
          :selectedNode="selectedNode"
        />
      </v-tabs-window-item>
    </v-tabs-window>
    <div v-if="selectedNode" class="execution-footer">
      <v-btn>OK</v-btn>
      <v-btn>Cancel</v-btn>
      <v-btn>Execute</v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ComponentRender from '@/views/workflow/details/ComponentRender.vue'
export default {
  name: 'NodeDetails',
  components: { ComponentRender },
  data() {
    return {
      selectedTabIdx: 1,
      selectedTabTitle: '',
      tabs: [{ title: 'Metadata' }, { title: 'Settings' }, { title: 'Output' }, { title: 'Logs' }]
    }
  },
  computed: {
    ...mapGetters('workflow', ['getSelectedNode']),
    selectedNode() {
      if (!this.getSelectedNode.id && !this.getSelectedNode.nodeId) return null
      else return this.getSelectedNode
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
  methods: {}
}
</script>
<style lang="scss">
.nodedetails-container {
  position: relative;
  padding-bottom: 60px;
}
.execution-footer {
  position: absolute;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  padding: 10px;
}
</style>
