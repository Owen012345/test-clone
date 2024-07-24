export async function removeNodeWithConnections(editor, nodeId) {
  for (const item of [...editor.getConnections()]) {
    if (item.source === nodeId || item.target === nodeId) {
      await editor.removeConnection(item.id)
    }
  }
  await editor.removeNode(nodeId)
}
