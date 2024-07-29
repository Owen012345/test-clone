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
      getDataStructure() // this 없이 함수 호출
    }
  }
}
</script>
<style lang="scss" scoped>
.node-execution {
  display: flex;
  > div {
    flex: 1; /* 기본 flex 비율을 1로 설정 */
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
