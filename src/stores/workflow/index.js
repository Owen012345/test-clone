const state = {
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
  }
}
const getters = {
  getSelectedNode: (state) => {
    return state.selectedNode?.nodeId
  },
  getNodes: (state) => state.nodes,
  getConnections: (state) => state.connections
}

export default { namespaced: true, state, mutations, actions, getters }
