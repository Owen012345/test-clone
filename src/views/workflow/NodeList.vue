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
        {
          id: 'N01',
          label: 'CSV Reader',
          options: { input: { cnt: 0 }, output: { cnt: 2, multiple: false } }
        },
        {
          id: 'N02',
          label: 'CSV Writer',
          options: { input: { cnt: 2, multiple: true }, output: { cnt: 1, multiple: true } }
        },
        {
          id: 'N03',
          label: 'File Writer',
          options: { input: { cnt: 1, multiple: false }, output: { cnt: 1, multiple: false } }
        }
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
