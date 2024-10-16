<template>
  <v-dialog v-model="internalDialog" max-width="500">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span>Save your workflow?</span>
        <v-btn variant="text" icon @click="this.$emit('save-dialog-handler', false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-actions>
        <v-btn text @click="this.$emit('save-dialog-handler', true)">Save</v-btn>
        <v-btn text @click="this.$emit('save-dialog-handler', false)">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      required: true
    }
  },
  emits: ['update:dialog', 'save-dialog-handler'],
  computed: {
    internalDialog() {
      return this.dialog
    }
  },
  methods: {
    cancelDialog() {
      this.internalDialog = false
    }
  }
}
</script>

<style scoped>
/* 필요한 경우 추가적인 스타일을 정의할 수 있습니다. */
</style>
