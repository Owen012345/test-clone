<template lang="">
  <div class="workspace">
    <h2>Workspace</h2>
    <FlowChart />
    <NodeDetails />
  </div>
</template>
<script>
import FlowChart from '@/components/workspace/Canvas.vue'
import NodeDetails from '@/components/workspace/NodeDetails.vue'

export default {
  name: 'Workspace',
  components: {
    FlowChart,
    NodeDetails
  }
}
</script>
<style>
.workspace {
  flex: 1;
  border: 2px dashed #ccc;
  position: relative;
}
</style>
