// import workflow from '@/assets/workflow.json'
import { ClassicPreset } from 'rete'
import store from '@/stores' // Vuex store import

class Node extends ClassicPreset.Node {
  constructor(label, nodeId) {
    super(label)
    this.width = 120
    this.height = 80
    this.nodeId = nodeId
  }
}

// 노드와 연결을 기반으로 Rete.js에서 그래프를 재구성하는 함수
export async function redrawGraph(data) {
  const editor = store.getters['workflow/getEditor']
  const area = store.getters['workflow/getArea']

  const { nodes, connections } = data

  console.log(nodes)
  // for (const node of nodes) {
  //   const id = node.id
  //   const nodeId = node.nodeId
  //   const nodeData = JSON.parse(node.data)

  //   // settings, metadata, group, label, outputs 추출
  //   const { settings, metadata, storage } = nodeData
  //   const { label, outputs } = node
  //   const group = nodeData.group || '' // group이 없는 경우 기본값 처리

  //   // dispatch initNodeDataWithJSON action
  //   await store.dispatch('nodeDetail/initNodeDataWithJSON', {
  //     id: id,
  //     nodeId: nodeId,
  //     settings,
  //     metadata,
  //     group,
  //     label,
  //     outputs: outputs
  //   })
  // }

  // 1. 기존 노드와 연결 삭제
  await editor.clear()

  // 2. 노드 생성 및 매핑
  const nodeMap = new Map()
  // 노드 생성 및 매핑
  for (let nodeData of nodes) {
    const socket = new ClassicPreset.Socket('socket')
    const node = new Node(nodeData.label, nodeData.nodeId)

    // 노드의 입력과 출력 추가
    if (nodeData.inputs) {
      for (const [key, input] of Object.entries(nodeData.inputs)) {
        const inputSocket = new ClassicPreset.Input(socket)
        inputSocket.multipleConnections = input.multipleConnections
        node.addInput(key, inputSocket)
      }
    }

    if (nodeData.outputs) {
      for (const [key, output] of Object.entries(nodeData.outputs)) {
        const outputSocket = new ClassicPreset.Output(socket)
        outputSocket.multipleConnections = output.multipleConnections
        node.addOutput(key, outputSocket)
      }
    }

    node.data = nodeData.data
    // 노드 위치 설정
    node.position = { x: nodeData.position.x, y: nodeData.position.y }

    await editor.addNode(JSON.parse(JSON.stringify(node)))
    await area.translate(node.id, { x: nodeData.position.x, y: nodeData.position.y })

    nodeMap.set(nodeData.id, node)
  }

  // 3. 연결 생성
  for (const conn of connections) {
    const sourceNode = nodeMap.get(conn.source)
    const targetNode = nodeMap.get(conn.target)

    if (sourceNode && targetNode) {
      const sourceOutput = sourceNode.outputs ? sourceNode.outputs[conn.sourceOutput] : null
      const targetInput = targetNode.inputs ? targetNode.inputs[conn.targetInput] : null

      if (!sourceOutput) {
        console.error(`Source output not found for key ${conn.sourceOutput} in node ${conn.source}`)
        continue
      }
      if (!targetInput) {
        console.error(`Target input not found for key ${conn.targetInput} in node ${conn.target}`)
        continue
      }

      try {
        const connection = new ClassicPreset.Connection(
          sourceNode,
          conn.sourceOutput,
          targetNode,
          conn.targetInput
        )
        editor.addConnection(connection)
      } catch (error) {
        console.error(
          `Failed to connect ${conn.source}'s output ${conn.sourceOutput} to ${conn.target}'s input ${conn.targetInput}`,
          error
        )
      }
    }
  }
}
