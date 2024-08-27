import { h } from 'vue'
import { NodeEditor } from 'rete'
import store from '@/stores'
import { AreaPlugin, AreaExtensions } from 'rete-area-plugin'
import {
  BidirectFlow,
  ConnectionPlugin,
  Presets as ConnectionPresets
} from 'rete-connection-plugin'
import { VuePlugin, Presets } from 'rete-vue-plugin'

import CustomNode from '@/components/nodes/node/CustomNode.vue'
import CustomConnection from '@/components/nodes/node/CustomConnection.vue'
import { removeNodeWithConnections } from './removeNodeWithConnections'
import { checkMultiplePort } from './handleConnections'

export async function createEditor(container) {
  const editor = new NodeEditor('demo@0.1.0')
  const area = new AreaPlugin(container)
  const connection = new ConnectionPlugin()
  const render = new VuePlugin()

  const selector = AreaExtensions.selector()
  const accumulating = AreaExtensions.accumulateOnCtrl()

  AreaExtensions.selectableNodes(area, selector, { accumulating })

  function SelectableConnectionBind() {
    function handleSelect(props) {
      const id = props.id
      const label = 'connection'
      selector.add(
        {
          id,
          label,
          translate() {},
          unselect() {
            props.selected = false
            area.update('connection', id)
          }
        },
        accumulating.active()
      )
      props.selected = true
      area.update('connection', id)
    }
    return h(CustomConnection, {
      onSelect: handleSelect
    })
  }

  function CustomNodeBind() {
    return h(CustomNode, {})
  }

  render.addPreset(
    Presets.classic.setup({
      customize: {
        node() {
          return CustomNodeBind()
          // return Presets.classic.Node
        },
        connection() {
          return SelectableConnectionBind()
        }
      }
    })
  )

  connection.addPreset(() => new BidirectFlow())

  editor.use(area)
  area.use(connection)
  area.use(render)

  // Rete.js Event watcher

  area.addPipe((context) => {
    if (context.type === 'nodedragged') {
      const { x, y } = area.area.pointer
      const { data } = context
      data.position = { x: x, y: y }
    }
    if (context.type === 'pointerdown') {
      store.dispatch('workflow/removeNode')
    }
    if (context.type === 'nodepicked') {
      // console.log(context)
      const allNodes = editor.getNodes(context.data.id)

      const selectedNodes = allNodes.filter((node) => node.selected === true)

      if (selectedNodes) {
        store.dispatch('workflow/updateSelectedNode', selectedNodes[0])
      }
    }
    return context
  })

  editor.addPipe((context) => {
    if (context.type === 'nodecreated') {
      const { data } = context

      store.dispatch('nodeDetail/initNodeDataWithSchema', data)
    }
    if (context.type === 'noderemoved') {
      const { data } = context
      store.dispatch('workflow/removeNode')
      store.dispatch('nodeDetail/removeNodeDataWithSchema', data.id)
    }
    if (context.type === 'connectionremoved') {
      // console.log(context)
      // console.log(editor.getConnections(), editor.getNodes())
    }
    if (context.type === 'connectioncreated') {
      const { data } = context

      const targetInput = data.targetInput // targetNode 의 input id
      const sourceOutput = data.sourceOutput // sourceNode 의 output id

      const targetNode = editor.getNode(data.target)
      const sourceNode = editor.getNode(data.source)
      const connectionId = data.id

      checkMultiplePort(editor, connectionId, targetNode, targetInput, sourceNode, sourceOutput)

      // console.log(editor.getNodes(), editor.getConnections())
      // ///////
      // // 1. targetNode 연결되면 targetInput에 연결된 sourceNode 및 sourceOutput 정보 표시
      // const nodes = editor.getNodes()
      // const connections = editor.getConnections()

      // console.log(nodes)
      // // 타겟 노드의 입력 포트에 연결된 모든 소스 노드 및 출력 포트 찾기
      // const incomingConnections = connections.filter(
      //   (conn) => conn.target === targetNode.id && conn.targetInput === targetInput
      // )

      // // 소스 노드와 그 출력 포트를 저장할 Map 객체 생성
      // const sourceNodeMap = new Map()

      // incomingConnections.forEach((conn) => {
      //   const sourceNode = nodes.find((node) => node.id === conn.source)
      //   const outputPortKey = conn.sourceOutput // 소스 노드의 출력 포트 키

      //   if (!sourceNodeMap.has(sourceNode.id)) {
      //     sourceNodeMap.set(sourceNode.id, new Map())
      //   }
      //   sourceNodeMap.get(sourceNode.id).set(outputPortKey, conn.sourceOutput)
      // })

      // // 결과 출력
      // sourceNodeMap.forEach((outputs, sourceNodeId) => {
      //   console.log(`Source Node ID: ${sourceNodeId}`)
      //   console.log(`  Target Node ID: ${targetNode.id}`)
      //   outputs.forEach((outputPortKey, outputPortId) => {
      //     console.log(`  Output Port Key: ${outputPortKey} -> Output Port ID: ${outputPortId}`)
      //   })
      // })
    }

    return context
  })
  //

  AreaExtensions.simpleNodesOrder(area)

  AreaExtensions.zoomAt(area, editor.getNodes())

  // TODO : vuex 연동 필요?
  // const syncWithVuex = () => {}

  return {
    removeSelected: async () => {
      for (const item of [...editor.getConnections()]) {
        if (item.selected) {
          await editor.removeConnection(item.id)
        }
      }
      for (const item of [...editor.getNodes()]) {
        if (item.selected) {
          await removeNodeWithConnections(editor, item.id)
        }
      }
    },
    editor,
    area
  }
}
