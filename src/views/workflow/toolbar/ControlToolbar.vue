<template lang="">
  <div class="node-execution">
    <button @click="saveWorkflow">Save</button>
    <button @click="flowExecution">Execution</button>
    <button @click="dataStructure">Debug</button>
    <v-switch v-model="debugMode" hide-details inset></v-switch>
    <span class="current-workflow">Current Workflow : {{ getCurrentWorkflowName }}</span>
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
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters('workflow', ['getNodes', 'getConnections', 'getCurrentWorkflowName'])
  },
  methods: {
    dataStructure() {
      redrawGraph()
    },
    saveWorkflow() {
      const workflow = {
        nodes: this.getNodes,
        connections: this.getConnections
      }
      console.log(workflow)
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
  position: relative;
  display: flex;
  min-height: 45px;
  max-height: 45px;
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
.current-workflow {
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 16px;
  color: #aaa;
}
</style>
