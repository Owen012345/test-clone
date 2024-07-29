export function checkMultiplePort(editor, connectionId, targetNode, targetInput) {
  // editor / 타겟 노드 / 타겟 노드의 input 포트 정보

  // 1. 모든 connections 에서 targetNode의 targetInput에 해당하는 connection을 찾는다.
  // 2. targetNode의 targetInput 속성에 multipleConnections 가 true 인지 확인한다.
  // 3. multipleConnections 가 false 이면 찾은 connection 에서 첫번째 것을 제외한 나머지를 제거한다.
  // 3-1. multipleConnections 가 true 이면 그대로 둔다.
  // 3-2. multipleConnections 가 false 이면서 찾은 connection 이 1개 이상이면 첫번째 것을 제외한 나머지를 제거한다.

  const connections = editor.getConnections()
  const targetConnections = connections.filter(
    (connection) => connection.target === targetNode.id && connection.targetInput === targetInput
  )
  const isMultiplePort = targetNode.inputs[targetInput].multipleConnections

  if (!isMultiplePort && targetConnections.length > 1) {
    targetConnections.splice(1)
    editor.removeConnection(connectionId)
  }
}
