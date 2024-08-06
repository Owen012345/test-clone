<template lang="">
  <component v-if="selectedTab && selectedNode" :is="selectedNode" :selectedTab="selectedTab" />
</template>
<script>
import N01 from '@/components/nodes/N01/N01.vue'
import N12 from '@/components/nodes/N12/N12.vue'

export default {
  name: 'ComponentRender',
  components: {
    N01,
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
