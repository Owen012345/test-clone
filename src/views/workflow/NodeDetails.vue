<template lang="">
  <b-tabs content-class="mt-3" v-model="selectedTabIdx">
    <b-tab v-for="(tab, idx) in tabs" :key="idx" :title="tab.title">
      <ComponentRender
        v-if="getSelectedNode"
        :selectedTab="selectedTabTitle"
        :selectedNode="selectedNode"
      />
    </b-tab>
  </b-tabs>
</template>
<script>
import { mapGetters } from 'vuex'
import ComponentRender from '@/views/workflow/details/ComponentRender.vue'
export default {
  name: 'NodeDetails',
  components: { ComponentRender },
  data() {
    return {
      selectedTabIdx: 0,
      selectedTabTitle: '',
      tabs: [{ title: 'Metadata' }, { title: 'Settings' }, { title: 'Input' }, { title: 'Output' }]
    }
  },
  computed: {
    ...mapGetters('workflow', ['getSelectedNode']),
    selectedNode() {
      return this.getSelectedNode
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
<style lang=""></style>
