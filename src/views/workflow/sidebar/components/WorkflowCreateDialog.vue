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
            v-model="localForm.name"
            variant="outlined"
            dense
            full-width
          ></v-text-field>
        </div>

        <div class="mt-4">
          <label for="description" class="form-label">Description</label>
          <v-text-field
            id="description"
            v-model="localForm.description"
            variant="outlined"
            dense
            full-width
          ></v-text-field>
        </div>
        <v-btn text @click="handleCreateWorkflow">Create</v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      required: true
    },
    form: {
      type: Object,
      required: true
    }
  },
  emits: ['update:dialog', 'create-workflow', 'update-form'],
  data() {
    return {
      localForm: { ...this.form }
    }
  },
  watch: {
    form: {
      handler(newForm) {
        this.localForm = { ...newForm }
      },
      deep: true
    }
  },
  computed: {
    internalDialog() {
      return this.dialog
    }
  },
  methods: {
    handleCreateWorkflow() {
      this.$emit('update-form', this.localForm)
      this.$emit('create-workflow', this.localForm)
    }
  }
}
</script>
