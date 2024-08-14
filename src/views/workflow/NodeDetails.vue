<template lang="">
  <div>
    <v-tabs v-model="selectedTabIdx">
      <v-tab v-for="(tab, idx) in tabs" :key="idx" :title="tab.title">
        {{ tab.title }}
      </v-tab>
    </v-tabs>
    <v-tabs-window v-model="selectedTabIdx">
      <v-tabs-window-item v-for="(tab, idx) in tabs" :key="idx">
        <ComponentRender
          v-if="selectedNode"
          :selectedTab="selectedTabTitle"
          :selectedNode="selectedNode"
        />
      </v-tabs-window-item>
      <div v-if="selectedNode" class="execution-footer">
        <v-btn>OK</v-btn>
        <v-btn>Cancel</v-btn>
        <v-btn>Execute</v-btn>
      </div>
    </v-tabs-window>
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
.execution-footer {
  position: relative;
  background-color: white;
  border-top: 1px solid black;
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  > .v-btn {
    margin: 10px 20px;
  }
}
</style>
