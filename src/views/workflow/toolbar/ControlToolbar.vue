<template lang="">
  <div class="node-execution">
    <button>Save</button>
    <button @click="flowExecution">Execution</button>
    <button>Debug</button>
    <v-switch v-model="debugMode" hide-details inset></v-switch>
    <!-- <div @click="dataStructure">test</div> -->
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
  name: 'ControlToolbar',
  data() {
    return {
      test: 'test',
      dialog: false,
      dialogText: '',

      debugMode: false
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

        // const result = await api.argo.submit(workflow)
        // console.log(result)

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
  min-height: 45px;
  border-bottom: 1px solid black;
  > button {
    flex: 0 0 auto;
    padding: 10px;
    text-align: center;
    width: 150px;
    font-size: 1rem;
    color: rgba(0, 0, 0, 0.45);
  }
}
</style>
