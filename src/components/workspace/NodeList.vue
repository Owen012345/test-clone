<template>
  <div class="sidebar">
    <h2>Nodes</h2>
    <div
      v-for="node in nodes"
      :key="node.id"
      class="node"
      draggable="true"
      @dragstart="(e) => onDragStart(e, node)"
    >
      {{ node.label }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'NodeList',
  data() {
    return {
      nodes: [
        { id: 'N01', label: 'CSV Reader', options: { input: 0, output: 1 } },
        { id: 'N02', label: 'CSV Writer', options: { input: 1, output: 1 } },
        { id: 'N03', label: 'File Writer', options: { input: 1, output: 1 } }
      ]
    }
  },
  methods: {
    onDragStart(e, node) {
      e.dataTransfer.setData('node', JSON.stringify(node))
    }
  }
}
</script>

<style>
.sidebar {
  width: 200px;
  background-color: #f4f4f4;
  padding: 10px;
}
.node {
  margin: 5px 0;
  padding: 10px;
  background-color: #ddd;
  cursor: grab;
}
</style>
