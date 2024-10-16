<template>
  <button class="create-button" @click="createDialog = true">+ New Create Workflow</button>
  <WorkflowCreateDialog
    v-model:dialog="createDialog"
    :form="form"
    @update-form="updateForm"
    @create-workflow="createWorkflow"
  />
  <WorkflowSaveDialog v-model:dialog="saveDialog" @save-dialog-handler="saveDialogHandler" />
</template>

<script>
import api from '@/api'
import { getDataStructure } from '@/utils/node/getDataStructure'
import { mapGetters, mapMutations } from 'vuex'
import WorkflowCreateDialog from './WorkflowCreateDialog.vue'
import WorkflowSaveDialog from './WorkflowSaveDialog.vue'

export default {
  name: 'WorkflowCreate',
  components: {
    WorkflowCreateDialog,
    WorkflowSaveDialog
  },
  data() {
    return {
      createDialog: false,
      saveDialog: false,
      form: {
        name: '',
        description: ''
      }
    }
  },
  computed: {
    ...mapGetters('workflow', ['getCurrentWorkflow', 'getEditor'])
  },
  methods: {
    ...mapMutations('workflow', ['SET_CURRENT_WORKFLOW']),
    updateForm(updatedForm) {
      this.form = { ...updatedForm }
    },
    async createWorkflow(form) {
      if (this.getCurrentWorkflow) {
        this.saveDialog = true
        this.createDialog = true
      } else {
        this.createDialog = false
        this.SET_CURRENT_WORKFLOW(form)
      }

      const spec = getDataStructure('new')
      const workflow = {
        name: form.name,
        autoRun: false,
        spec: spec
      }

      await api.etri.createDistributedPipeline(workflow)
    },
    async saveDialogHandler(status) {
      if (status) {
        const obj = {
          id: this.getCurrentWorkflow.id,
          name: this.getCurrentWorkflow.name,
          spec: getDataStructure()
        }
        try {
          await api.etri.updateDistributedPipeline(obj)
        } catch (error) {
          console.log(error)
        }
      }

      await this.getEditor.clear()
      this.SET_CURRENT_WORKFLOW(this.form)

      // clear logic
      this.saveDialog = false
      this.createDialog = false
    }
  }
}
</script>
