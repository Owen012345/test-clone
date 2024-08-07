<template lang="">
  <component v-if="selectedTab && selectedNode" :is="selectedNode" :selectedTab="selectedTab" />
</template>
<script>
import C1_N01 from '@/components/nodes/collection/C1_N01.vue'
import C1_N02 from '@/components/nodes/collection/C1_N02.vue'
import C1_N03 from '@/components/nodes/collection/C1_N03.vue'
import C1_N04 from '@/components/nodes/collection/C1_N04.vue'
import C1_N05 from '@/components/nodes/collection/C1_N05.vue'
import C1_N06 from '@/components/nodes/collection/C1_N06.vue'
import C1_N07 from '@/components/nodes/collection/C1_N07.vue'
import N12 from '@/components/nodes/N12/N12.vue'

export default {
  name: 'ComponentRender',
  components: {
    C1_N01,
    C1_N02,
    C1_N03,
    C1_N04,
    C1_N05,
    C1_N06,
    C1_N07,
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
