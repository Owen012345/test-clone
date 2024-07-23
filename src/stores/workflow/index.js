const state = {
  nodes: [],
  connections: []
}
const mutations = {
  SET_NODES(state, nodes) {
    state.nodes = nodes
  },
  SET_CONNECTIONS(state, connections) {
    state.connections = connections
  }
}
const actions = {
  updateNodes({ commit }, nodes) {
    commit('SET_NODES', nodes)
  },
  updateConnections({ commit }, connections) {
    commit('SET_CONNECTIONS', connections)
  }
}
const getters = {
  getNodes: (state) => state.nodes,
  getConnections: (state) => state.connections
}

export default { namespaced: true, state, mutations, actions, getters }
