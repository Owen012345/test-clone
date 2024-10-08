<template lang="">
  <v-tabs v-model="localTab" direction="vertical" @update:modelValue="updateTab">
    <v-tab text="Tasks" value="tasks"></v-tab>
    <v-tab text="Workflows" value="workflows"></v-tab>
  </v-tabs>
</template>

<script>
export default {
  props: {
    tab: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      localTab: this.tab
    }
  },
  watch: {
    tab(newValue) {
      this.localTab = newValue
    }
  },
  methods: {
    updateTab(value) {
      this.localTab = value // 로컬 데이터 업데이트
      this.$emit('update:tab', value) // 부모에게 이벤트 emit
    }
  }
}
</script>

<style lang="scss" scoped>
.v-tab {
  text-transform: none !important;
}
.v-tab-item--selected {
  background-color: #f4f4f4 !important;
}
</style>
