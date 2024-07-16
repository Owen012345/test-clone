<template lang="">
  <div class="workspace">
    <NodeList class="node-list" />
    <div class="main-content">
      <FlowChart class="flow-chart" />
      <NodeDetails class="node-details" />
    </div>
  </div>
</template>
<script>
import FlowChart from '@/components/workspace/Canvas.vue'
import NodeDetails from '@/components/workspace/NodeDetails.vue'
import NodeList from '@/components/workspace/NodeList.vue'

export default {
  name: 'Workspace',
  components: {
    FlowChart,
    NodeDetails,
    NodeList
  }
}
</script>
<style>
.workspace {
  display: flex;
  height: 100%;
}

.node-list {
  width: 200px;
  border-right: 1px solid #ccc;
  box-sizing: border-box;
}

.main-content {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.flow-chart {
  flex: 8;
  border-bottom: 1px solid #ccc;
}

.node-details {
  flex: 2;
}
</style>
