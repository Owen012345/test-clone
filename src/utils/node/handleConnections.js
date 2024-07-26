export function checkMultiplePort(editor, targetNode, targetInput) {
  // editor / 타겟 노드 / 타겟 노드의 input 포트 정보
  // 1. 검사할 타겟 노드의 input포트 정보중 multipleConnections 여부
  // 2. 전체 커넥션 정보중 target / targetInput
  console.log(editor, targetNode, targetInput)
  console.log(editor.getConnections())
  //   const getConnectionsByTarget = editor.getCon
}

// function filterConnectionsWithOrCondition(data, targetValue, targetInputValue) {
//     return data.connections.filter(connection =>
//       connection.target === targetValue || connection.targetInput === targetInputValue
//     );
//   }
