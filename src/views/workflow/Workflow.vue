<template lang="">
  <div class="workflow">
    <div class="sidebar-container">
      <NodeExecution class="flow-execution" />
      <NodeList class="node-list" />
    </div>
    <div class="main-container">
      <FlowChart class="flow-chart" :style="{ flex: flowChartFlex }" />
      <div class="resizer" id="resizer" @mousedown="startResize"></div>
      <NodeDetails class="node-details" :style="{ flex: nodeDetailsFlex }" />
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
  },
  data() {
    return {
      isResizing: false,
      initialY: 0,
      initialFlexFlowChart: 6,
      initialFlexNodeDetails: 4,
      flowChartFlex: 6,
      nodeDetailsFlex: 4
    }
  },
  methods: {
    startResize(event) {
      this.isResizing = true
      this.initialY = event.clientY
      this.initialFlexFlowChart = this.flowChartFlex
      this.initialFlexNodeDetails = this.nodeDetailsFlex
      window.addEventListener('mousemove', this.resize)
      window.addEventListener('mouseup', this.stopResize)
    },
    resize(event) {
      if (this.isResizing) {
        const deltaY = event.clientY - this.initialY
        const totalFlex = this.initialFlexFlowChart + this.initialFlexNodeDetails
        const newFlowChartFlex = Math.max(
          this.initialFlexFlowChart + deltaY / 100, // 조절 스케일을 조정할 수 있습니다.
          1
        )
        const newNodeDetailsFlex = totalFlex - newFlowChartFlex

        this.flowChartFlex = newFlowChartFlex
        this.nodeDetailsFlex = newNodeDetailsFlex
      }
    },
    stopResize() {
      this.isResizing = false
      window.removeEventListener('mousemove', this.resize)
      window.removeEventListener('mouseup', this.stopResize)
    }
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
.main-container {
  display: flex;
  flex: 1;
  flex-direction: column;
}
.sidebar-container {
  display: flex;
  width: 220px;
  border-right: 1px solid #ccc;
  box-sizing: border-box;
  flex-direction: column;
}
.flow-chart {
  flex: 8;
}
.node-details {
  flex: 2;
  overflow-y: auto;
}
.resizer {
  cursor: s-resize;
  height: 5px;
  width: 100%;
  background-color: #ccc;
}
</style>
