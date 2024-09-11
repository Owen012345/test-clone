<template lang="">
  <v-table>
    <thead>
      <tr>
        <th id="no" class="text-left">No</th>
        <th id="inputKey" class="text-left">Input Key</th>
        <th id="nodeId" class="text-left">Dependency</th>
        <th id="outputKey" class="text-left">Output Key</th>
        <th id="nodeName" class="text-left">Node Name</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, key) in inputNodes" :key="item.name">
        <td>{{ key }}</td>
        <td>{{ item.inputKey }}</td>
        <td v-html="'{{' + 'tasks.' + item.nodeId + '}}'"></td>
        <td>{{ item.outputKey }}</td>
        <td>{{ item.nodeLabel }}</td>
      </tr>
    </tbody>
  </v-table>
</template>
<script>
export default {
  name: 'InputTable',
  props: {
    inputNodes: {
      type: Object
    }
  }
}
</script>
<style lang=""></style>
