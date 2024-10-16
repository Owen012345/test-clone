<template lang="">
  <button class="create-button" @click="this.dialog = true">+ New Create Workflow</button>
  <WorkflowCreateDialog v-model:dialog="dialog" />
</template>
<script>
import WorkflowCreateDialog from './WorkflowCreateDialog.vue'
export default {
  name: 'WorkflowCreate',
  components: {
    WorkflowCreateDialog
  },
  data() {
    return {
      dialog: false
    }
  }
}
</script>
<style scoped>
.create-button {
  height: 52px;
  font-size: 1rem;
  font-style: normal;
  font-weight: 300;
}
</style>
