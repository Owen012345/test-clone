<template lang="">
  <div class="workflow">
    <div class="sidebar-content">
      <NodeExecution class="flow-execution" />
      <NodeList class="node-list" />
    </div>
    <div class="main-content">
      <FlowChart class="flow-chart" />
      <NodeDetails class="node-details" />
    </div>
  </div>
</template>
<script>
import FlowChart from '@/views/workflow/Canvas.vue'
import NodeDetails from '@/views/workflow/NodeDetails.vue'
import NodeList from '@/views/workflow/sidebar/NodeList.vue'
import NodeExecution from '@/views/workflow/sidebar/NodeExecution.vue'

export default {
  name: 'Workflow',
  components: {
    FlowChart,
    NodeDetails,
    NodeList,
    NodeExecution
  }
}
</script>
<style scoped>
.workflow {
  display: flex;
  height: 100%;
}
.flow-execution {
  min-height: 45px;
}
.node-list {
  flex: 9;
}
.main-content {
  display: flex;
  flex: 1;
  flex-direction: column;
}
.sidebar-content {
  display: flex;
  width: 220px;
  border-right: 1px solid #ccc;
  box-sizing: border-box;
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
