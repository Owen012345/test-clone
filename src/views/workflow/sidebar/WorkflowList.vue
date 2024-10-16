<template>
  <div class="workflow-list">
    <div class="search-field">
      <SearchField :search="search" @update:search="filterItems" />
    </div>
    <div class="list-container">
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
    <div class="workflow-create">
      <WorkflowCreateButton />
    </div>
  </div>
</template>

<script>
import api from '@/api'
import SearchField from '@/components/custom/CustomSearchField.vue'
import WorkflowCreateButton from '@/views/workflow/sidebar/components/WorkflowCreateButton.vue'
import { redrawGraph } from '@/utils/node/redrawNode'

export default {
  name: 'WorkflowList',
  components: {
    SearchField,
    WorkflowCreateButton
  },
  data() {
    return {
      search: '',
      workflows: ['test1', 'test2', 'test3'],
      filteredData: []
    }
  },
  methods: {
    async getWorkflow(workflow) {
      console.log(workflow)
      const NodeConnectionData = await api.test.getWorkflow(workflow)
      await redrawGraph(NodeConnectionData)
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
  async mounted() {
    try {
      this.filterItems()
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style scoped>
.workflow-list {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.search-field {
  flex: 1;
}

.list-container {
  flex: 8;
  overflow-y: auto; /* 스크롤을 위해 추가 */
}

.workflow-create {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
