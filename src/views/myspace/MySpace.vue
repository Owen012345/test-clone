<template lang="">
  <div class="myspace-container">
    <div class="sidebar-container">
      <SidebarController v-model:tab="controlTab" />
    </div>
    <div class="main-container">
      <WorkflowList v-if="controlTab === 'myspace'" />
      <WorkflowCreate v-if="controlTab === 'createWorkflow'" />
    </div>
  </div>
</template>
<script>
import SidebarController from './SidebarController.vue'
import WorkflowList from './WorkflowList.vue'
import WorkflowCreate from './WorkflowCreate.vue'

export default {
  name: 'Myspace',
  data() {
    return {
      controlTab: 'myspace'
    }
  },
  components: {
    SidebarController,
    WorkflowList,
    WorkflowCreate
  }
}
</script>
<style scoped>
.myspace-container {
  display: flex;
  height: 100%;
}
.sidebar-container {
  width: 250px;
}
.main-container {
  padding: 1.25rem 0.65rem 1.25rem 0.65rem;
}
</style>
