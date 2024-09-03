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

      // console.log('Editor Nodes:', editor.getNodes())
      // console.log('Editor Connections:', editor.getConnections())

      // IO Storage 정보 가져오는 시퀀스
      // 1. 노드가 생성되면 vuex 에서 I/O storage 정보를 nodeId 별로 생성한다.
      // 2. 생성된 I/O storage 정보는 settings 탭에서 form 을 핸들링 해 vuex 에 업데이트 한다.
      // 2-1. I/O storage 는 ouput 의 키 갯수 및 id 별로 각각 form 을 핸들링 해야 한다.

      // 3. connection 이 연결되면 targetNode 즉 해당 노드의 input 에 sourceNode 의 output 정보를 저장한다.
      // 3-1. sourceNode 의 Id 및 output 키 정보를 가지고 있는다.

      // 4. 이 후 workflow 를 구성할때 sourceNode 의 ouput 정보를 맵핑하여 targetNode 의 input 에 저장한다.

      // 타겟 노드의 입력 포트에 연결된 모든 소스 노드 및 출력 포트 찾기
      const incomingConnections = editor
        .getConnections()
        .filter((conn) => conn.target === targetNode.id && conn.targetInput === targetInput)

      // 소스 노드와 그 출력 포트를 저장할 Map 객체 생성
      const sourceNodeMap = new Map()

      incomingConnections.forEach((conn) => {
        const sourceNode = editor.getNode(conn.source)
        const outputPortKey = conn.sourceOutput // 소스 노드의 출력 포트 키

        if (!sourceNodeMap.has(sourceNode.id)) {
          sourceNodeMap.set(sourceNode.id, new Map())
        }
        sourceNodeMap.get(sourceNode.id).set(outputPortKey, conn.sourceOutput)

        console.log(targetNode)
        // targetNode의 input 키값 정보에 sourceNodeId 및 output 정보 추가
        // 현재는 targetNode에 inputs 에 connections 키값을 추가 해 sourceNode의 id 및 ouput 키값을 저장
        // 없으면 connections 키값을 생성하지 않음. -> 수정 필요 할 수도 있음

        if (!targetNode.inputs[targetInput].connections) {
          targetNode.inputs[targetInput].connections = {}
        }

        targetNode.inputs[targetInput].connections[connectionId] = {
          sourceNodeId: sourceNode.id,
          sourceOutputKey: outputPortKey
        }
      })

      console.log(editor.getNodes())
      // 결과 출력 용 로그
      // console.log(`Updated Target Node (ID: ${targetNode.id}) Inputs:`, targetNode.inputs)
      // sourceNodeMap.forEach((outputs, sourceNodeId) => {
      //   console.log(editor.getNode(sourceNodeId))
      //   outputs.forEach((outputPortKey, outputPortId) => {
      //     console.log(`Output Port Key: ${outputPortKey} -> Output Port ID: ${outputPortId}`)
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
