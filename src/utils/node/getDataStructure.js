import store from '@/stores'

export function getDataStructure() {
  const editor = store.getters['workflow/getEditor']
  console.log(editor.nodes)
  const nodes = editor.nodes.map((node) => ({
    id: node.id,
    name: node.label,
    data: node.data,
    position: node.position,
    inputs: Object.keys(node.inputs).map((key) => ({
      key: key,
      connections: node.inputs[key].connections?.map((connection) => ({
        node: connection.node,
        output: connection.output
      }))
    })),
    outputs: Object.keys(node.outputs).map((key) => ({
      key: key,
      connections: node.outputs[key].connections?.map((connection) => ({
        node: connection.node,
        input: connection.input
      }))
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
  console.log(JSON.stringify(dataStructure, null, 2))

  // JSON 데이터를 반환
  console.log(dataStructure)
}
