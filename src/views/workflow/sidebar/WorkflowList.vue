<template>
  <div class="workflow-list">
    <div class="search-field">
      <SearchField :search="search" @update:search="filterItems" />
    </div>
    <div class="list-container">
      <v-list>
        <v-list-item
          @click="getWorkflow(workflow)"
          v-for="workflow in filteredData"
          :key="workflow.id"
        >
          {{ workflow.name }}
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
import { mapMutations } from 'vuex'

export default {
  name: 'WorkflowList',
  components: {
    SearchField,
    WorkflowCreateButton
  },
  data() {
    return {
      search: '',
      workflows: [
        { id: '1', name: 'test1' },
        { id: '2', name: 'test2' },
        { id: '3', name: 'test3' }
      ],
      filteredData: [],
      selectedWorkflow: null
    }
  },
  methods: {
    ...mapMutations('workflow', ['SET_CURRENT_WORKFLOW']),
    async getWorkflow(workflow) {
      this.selectedWorkflow = workflow
      this.SET_CURRENT_WORKFLOW(workflow)

      const NodeConnectionData = await api.test.getWorkflow(workflow.name)
      await redrawGraph(NodeConnectionData)
    },
    filterItems(search) {
      this.search = search || ''
      if (!this.search) {
        this.filteredData = [...this.workflows]
        console.log('Filtered Data:', this.filteredData) // 중복 확인
        return
      }

      const searchLower = this.search.toLowerCase()
      this.filteredData = this.workflows.filter((workflow) =>
        workflow.name.toLowerCase().includes(searchLower)
      )
      console.log('Filtered Data:', this.filteredData) // 중복 확인
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
