<template lang="">
  <component v-if="selectedTab && selectedNode" :is="selectedNode" :selectedTab="selectedTab" />
</template>
<script>
import N12 from '@/components/nodes/N12/N12.vue'

export default {
  name: 'ComponentRender',
  components: {
    N12
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
