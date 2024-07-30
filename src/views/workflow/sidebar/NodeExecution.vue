<template lang="">
  <div class="node-execution">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <button @click="flowExecution">Execution</button>
  </div>
</template>
<script>
import { getDataStructure } from '@/utils/node/getDataStructure'
export default {
  name: 'NodeExecution',
  data() {
    return {
      test: 'test'
    }
  },
  methods: {
    flowExecution() {
      console.log('execution')
      // getDataStructure()
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
