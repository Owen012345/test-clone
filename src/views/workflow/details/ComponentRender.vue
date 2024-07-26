<template lang="">
  <component v-if="selectedTab && selectedNode" :is="selectedNode" />
</template>
<script>
import N01 from '@/components/nodes/N01/N01.vue'

export default {
  name: 'ComponentRender',
  components: {
    N01
  },
  props: {
    selectedTab: {
      type: String,
      required: true
    },
    selectedNode: {
      type: String,
      required: true
    }
  }
}
</script>
<style lang=""></style>
