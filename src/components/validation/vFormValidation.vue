<template lang="">
  <v-form ref="form" v-model="isValid" lazy-validation @update:modelValue="updateNodeValidity">
    <slot></slot>
  </v-form>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  name: 'vFormValidation',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isValid: false
    }
  },
  methods: {
    ...mapMutations('nodeDetail', ['UPDATE_NODE_VALIDATION']),
    updateNodeValidity() {
      this.UPDATE_NODE_VALIDATION({ id: this.id, validation: this.isValid })
    },
    validateForm() {
      return this.$refs.form.validate() // 강제 validation
    }
  }
}
</script>
<style lang=""></style>
