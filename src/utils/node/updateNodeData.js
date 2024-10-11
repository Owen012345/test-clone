import store from '@/stores'

export async function updateNodeData(nodeId, data) {
  const node = store.getters['workflow/getNode'](nodeId)
  if (node) {
    node.data = data
  }
}
