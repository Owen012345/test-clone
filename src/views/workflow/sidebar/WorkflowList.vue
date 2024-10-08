<template>
  <div class="sidebar">
    <SearchField :search="search" @update:search="filterItems" />

    <v-list>
      <v-list-item
        @click="getWorkflow(workflow)"
        v-for="(workflow, index) in filteredData"
        :key="index"
        :title="workflow"
      >
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import SearchField from '@/views/workflow/sidebar/SearchField.vue'

export default {
  name: 'WorkflowList',
  components: {
    SearchField
  },
  data() {
    return {
      search: '',
      workflows: ['test1', 'test2', 'test3'],
      filteredData: []
    }
  },
  methods: {
    getWorkflow(workflow) {
      console.log(workflow)
    },
    filterItems(search) {
      this.search = search || ''
      if (!this.search) {
        this.filteredData = [...this.workflows]
        return
      }

      const searchLower = this.search.toLowerCase()
      this.filteredData = this.workflows.filter((workflow) =>
        workflow.toLowerCase().includes(searchLower)
      )
    }
  },
  created() {
    this.filterItems()
  }
}
</script>

<style scoped>
.v-list {
  background-color: inherit !important;
}
</style>
