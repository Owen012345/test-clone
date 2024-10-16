<template>
  <v-dialog v-model="internalDialog" max-width="500">
    <v-card>
      <v-card-title class="d-flex justify-space-between">
        <span>Dialog Title</span>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text> This is the content of the dialog. </v-card-text>

      <v-card-actions>
        <v-btn color="primary" text @click="closeDialog">Close</v-btn>
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
  emits: ['update:dialog'],
  computed: {
    internalDialog: {
      get() {
        return this.dialog
      },
      set(value) {
        this.$emit('update:dialog', value)
      }
    }
  },
  methods: {
    closeDialog() {
      this.internalDialog = false
    }
  }
}
</script>

<style scoped>
/* 필요한 경우 추가적인 스타일을 정의할 수 있습니다. */
</style>
