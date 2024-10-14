<template>
  <div class="workflowlist-container">
    <div class="myspace-header">My Space</div>
    <div class="form-container">
      <SearchField class="search-field" :search="search" @update:search="updateSearchQuery" />
      <TableWithPagination
        v-if="workflowList"
        :headers="['Workflow Name', 'Create At', 'Modified At', 'Description']"
        :data="workflowList"
      />
    </div>
  </div>
</template>

<script>
import api from '@/api'
import SearchField from '@/components/custom/CustomSearchField.vue'
import TableWithPagination from '@/components/custom/CustomTableWithPagination.vue'

export default {
  name: 'MySpace',
  data() {
    return {
      search: '',
      workflowList: null,
      originalWorkflowList: null
    }
  },
  components: {
    SearchField,
    TableWithPagination
  },
  methods: {
    async getWorkflowList() {
      const workflows = await api.test.getWorkflowList()
      this.workflowList = workflows
      this.originalWorkflowList = [...workflows]
    },
    updateSearchQuery(search) {
      this.search = search || ''
      this.filterItems()
    },
    filterItems() {
      if (!this.search) {
        this.workflowList = [...this.originalWorkflowList]
        return
      }

      const searchLower = this.search.toLowerCase()
      this.workflowList = this.originalWorkflowList.filter((workflow) =>
        Object.values(workflow).some((value) => String(value).toLowerCase().includes(searchLower))
      )
    }
  },
  mounted() {
    this.getWorkflowList()
  }
}
</script>

<style scoped>
.workflowlist-container {
  width: 100%;
}
.myspace-header {
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  margin-bottom: 20px;
}

.form-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
