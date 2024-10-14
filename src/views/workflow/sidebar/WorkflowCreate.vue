<template lang="">
  <button class="workflow-create" @click="createWorkflow">+ New Create Workflow</button>
</template>
<script>
export default {
  name: 'WorkflowCreate',
  methods: {
    createWorkflow() {
      console.log('createWorkflow')
    }
  }
}
</script>
<style scoped>
.workflow-create {
  height: 52px;
  font-size: 1rem;
  font-style: normal;
  font-weight: 300;
}
</style>
