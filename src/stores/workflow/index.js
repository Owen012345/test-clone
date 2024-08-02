const state = {
  editor: null,
  selectedNode: null,
  nodes: [],
  connections: []
}
const mutations = {
  SET_NODE(state, node) {
    state.selectedNode = node
  },
  SET_NODES(state, nodes) {
    state.nodes = nodes
  },
  SET_CONNECTIONS(state, connections) {
    state.connections = connections
  },
  REMOVE_NODE(state) {
    state.selectedNode = null
  },
  SET_EDITOR(state, editor) {
    state.editor = editor
  }
}
const actions = {
  updateSelectedNode({ commit }, node) {
    commit('SET_NODE', node)
  },
  updateNodes({ commit }, nodes) {
    commit('SET_NODES', nodes)
  },
  updateConnections({ commit }, connections) {
    commit('SET_CONNECTIONS', connections)
  },
  removeNode({ commit }) {
    commit('REMOVE_NODE')
  }
}
const getters = {
  getEditor: (state) => state.editor,
  getSelectedNode: (state) => {
    return state.selectedNode?.nodeId
  },
  getNodes: (state) => state.nodes,
  getConnections: (state) => state.connections
}

export default { namespaced: true, state, mutations, actions, getters }
