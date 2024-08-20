import store from '@/stores'
import { structures } from 'rete-structures'

export function getDataStructure() {
  const editor = store.getters['workflow/getEditor']
  console.log(editor.nodes)
  const nodes = editor.nodes.map((node) => ({
    id: node.id,
    label: node.label,
    nodeId: node.nodeId,
    position: node.position,
    data: node.data,
    inputs: Object.keys(node.inputs).map((key) => ({
      key: key,
      multipleConnections: node.inputs[key].multipleConnections
    })),
    outputs: Object.keys(node.outputs).map((key) => ({
      key: key,
      multipleConnections: node.outputs[key].multipleConnections
    }))
  }))

  // 모든 연결 정보를 수집
  const connections = editor.connections?.map((connection) => ({
    sourceNode: connection.source,
    targetNode: connection.target,
    sourceOutput: connection.sourceOutput,
    targetInput: connection.targetInput
  }))

  // JSON 구조 생성
  const dataStructure = {
    nodes: nodes,
    connections: connections
  }

  // 콘솔에 출력
  console.log(dataStructure)
  const data = dataStructure
  const getOutgoingConnections = (nodeId) => {
    return data.connections.filter((conn) => conn.sourceNode === nodeId)
  }

  const getIncomingConnections = (nodeId) => {
    return data.connections.filter((conn) => conn.targetNode === nodeId)
  }

  // Identify nodes
  const startNode = data.nodes.find((node) => {
    return (
      getOutgoingConnections(node.id).length > 0 && getIncomingConnections(node.id).length === 0
    )
  })

  const endNode = data.nodes.find((node) => {
    return (
      getIncomingConnections(node.id).length > 0 && getOutgoingConnections(node.id).length === 0
    )
  })

  const middleNodes = data.nodes.filter((node) => {
    return getIncomingConnections(node.id).length > 0 && getOutgoingConnections(node.id).length > 0
  })

  // Output the nodes in order
  const orderedNodes = []

  if (startNode) orderedNodes.push(startNode)
  if (middleNodes.length > 0) {
    middleNodes.forEach((node) => orderedNodes.push(node))
  }
  if (endNode) orderedNodes.push(endNode.name)

  console.log('Node order:', orderedNodes)
}
