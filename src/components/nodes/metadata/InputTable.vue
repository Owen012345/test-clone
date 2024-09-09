<template lang="">
  <v-table>
    <thead>
      <tr>
        <th id="no" class="text-left">No</th>
        <th id="nodeId" class="text-left">Node ID</th>
        <th id="nodeName" class="text-left">Node Name</th>
        <th id="inputResult" class="text-left">Input Result</th>
        <th id="resultStorageInfo" class="text-left">Result Storage info</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, key) in inputNodes" :key="item.name">
        <td>{{ key }}</td>
        <td>{{ item.nodeId }} - {{ item.outputKey }}</td>
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
