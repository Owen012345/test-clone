<template>
  <div class="sidebar">
    <h2>Nodes</h2>
    <div
      v-for="node in nodes"
      :key="node.id"
      class="node"
      draggable="true"
      @dragstart="onDragStart(node)"
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
        { id: 1, label: 'Node 1' },
        { id: 2, label: 'Node 2' },
        { id: 3, label: 'Node 3' }
      ]
    }
  },
  methods: {
    onDragStart(node) {
      event.dataTransfer.setData('node', JSON.stringify(node))
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
