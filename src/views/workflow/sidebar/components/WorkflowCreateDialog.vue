<template>
  <v-dialog v-model="internalDialog" max-width="500">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span>New Workflow</span>
        <v-btn variant="text" icon @click="this.$emit('update:dialog', false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <div>
          <label for="name" class="form-label">Name</label>
          <v-text-field
            id="name"
            v-model="form.name"
            placeholder="Enter name"
            outlined
            dense
            full-width
            hied-details
            variant="outlined"
          ></v-text-field>
        </div>

        <div class="mt-4">
          <label for="description" class="form-label">Description</label>
          <v-text-field
            id="description"
            v-model="form.description"
            placeholder="Enter description"
            outlined
            dense
            full-width
            hied-details
            variant="outlined"
          ></v-text-field>
        </div>
        <v-btn text @click="createWorkflow">Create</v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import api from '@/api'
import { getDataStructure } from '@/utils/node/getDataStructure'

export default {
  props: {
    dialog: {
      type: Boolean,
      required: true
    }
  },
  emits: ['update:dialog'],
  data() {
    return {
      form: {
        name: '',
        description: ''
      }
    }
  },
  computed: {
    internalDialog() {
      return this.dialog
    }
  },
  methods: {
    async createWorkflow() {
      const spec = getDataStructure('new')
      const workflow = {
        name: this.form.name,
        autoRun: false,
        spec: spec
      }
      await api.etri.createDistributedPipeline(workflow)
      // this.$emit('update:dialog', false)
    }
  }
}
</script>

<style scoped>
.form-label {
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 4px;
  display: inline-block;
}
.mt-4 {
  margin-top: 16px;
}
</style>
