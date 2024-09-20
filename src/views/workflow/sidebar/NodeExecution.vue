<template lang="">
  <div class="node-execution">
    <div>a</div>
    <div>b</div>
    <!-- <div @click="dataStructure">test</div> -->
    <button @click="flowExecution">Execution</button>
    <v-dialog v-model="dialog" width="auto">
      <v-card min-width="400" :text="dialogText" title="Submit">
        <template v-slot:actions>
          <v-btn class="ms-auto" text="Ok" @click="dialog = false"></v-btn>
        </template>
      </v-card>
    </v-dialog>
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
      test: 'test',
      dialog: false,
      dialogText: ''
    }
  },

  methods: {
    dataStructure() {
      redrawGraph()
    },
    async flowExecution() {
      try {
        const workflow = getDataStructure()
        console.log(JSON.stringify(workflow, null, 2))

        const result = await api.argo.submit(workflow)
        console.log(result)

        this.dialogText = 'Success'
      } catch (err) {
        this.dialogText = 'Fail'
        console.log(err)
      } finally {
        // 항상 다이얼로그를 보여줌
        this.dialog = true
      }
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
