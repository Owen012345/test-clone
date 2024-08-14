import workflow from '@/assets/workflow.json'
import { ClassicPreset } from 'rete'
import store from '@/stores' // Vuex store import
import { getSourceTarget } from 'rete-connection-plugin'

class Node extends ClassicPreset.Node {
  constructor(label, nodeId) {
    super(label)
    this.width = 120
    this.height = 80
    this.nodeId = nodeId
  }
}

// 노드와 연결을 기반으로 Rete.js에서 그래프를 재구성하는 함수
export async function redrawGraph() {
  const editor = store.getters['workflow/getEditor']
  const area = store.getters['workflow/getArea']
  const { nodes, connections } = workflow

  // 기존 노드와 연결 삭제
  editor.clear()

  // 노드 생성
  const nodeMap = new Map()
  for (const nodeData of nodes) {
    console.log(nodeData)
    const socket = new ClassicPreset.Socket('socket')
    const node = new Node(nodeData.label, nodeData.nodeId)

    // 노드의 입력과 출력 추가
    if (nodeData.inputs) {
      for (const input of nodeData.inputs) {
        const inputSocket = new ClassicPreset.Input(socket)
        node.addInput(input.key, inputSocket)
      }
    }

    if (nodeData.outputs) {
      for (const output of nodeData.outputs) {
        const outputSocket = new ClassicPreset.Output(socket)
        node.addOutput(output.key, outputSocket)
      }
    }

    // console.log(node, area)
    // 노드 위치 설정
    node.position = { x: nodeData.position.x, y: nodeData.position.y }
    await editor.addNode(node)
    await area.translate(node.id, { x: nodeData.position.x, y: nodeData.position.y })

    nodeMap.set(nodeData.id, node)
  }
  console.log(nodeMap)
  //   // 연결 생성
  //   for (const conn of connections) {
  //     const sourceNode = nodeMap.get(conn.sourceNode)
  //     const targetNode = nodeMap.get(conn.targetNode)

  //     if (sourceNode && targetNode) {
  //       const sourceOutput = sourceNode.outputs[conn.sourceOutput]
  //       const targetInput = targetNode.inputs[conn.targetInput]

  //       if (sourceOutput && targetInput) {
  //         try {
  //           const [source, target] = getSourceTarget(sourceOutput, targetInput)
  //           if (source && target) {
  //             editor.addConnection(
  //               new ClassicPreset.Connection(source.node, source.key, target.node, target.key)
  //             )
  //           }
  //         } catch (error) {
  //           // 오류 발생 시 무시하고 계속 진행
  //           console.error(
  //             `Failed to connect ${conn.sourceNode}'s output ${conn.sourceOutput} to ${conn.targetNode}'s input ${conn.targetInput}`,
  //             error
  //           )
  //         }
  //       }
  //     }
  //   }
}
