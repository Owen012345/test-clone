<template lang="">
  <div class="node-execution">
    <div>1</div>
    <div>2</div>
    <div @click="dataStructure">test</div>
    <button @click="flowExecution">Execution</button>
  </div>
</template>
<script>
import { getDataStructure } from '@/utils/node/getDataStructure'
import { redrawGraph } from '@/utils/node/redrawNode'

import api from '@/api'
export default {
  name: 'NodeExecution',
  data() {
    return {
      test: 'test'
    }
  },

  methods: {
    dataStructure() {
      redrawGraph()
    },
    async flowExecution() {
      const workflow = getDataStructure()
      console.log(JSON.stringify(workflow, null, 2))
      const result = await api.argo.submit(workflow)
      console.log(result)
    }
  }
}
</script>
<style lang="scss" scoped>
.node-execution {
  display: flex;
  > div {
    flex: 1;
    padding: 10px;
    background-color: lightgrey;
    border: 1px solid #ddd;
    text-align: center;
  }
  > div:last-child {
    flex: 2;
  }
}
</style>
