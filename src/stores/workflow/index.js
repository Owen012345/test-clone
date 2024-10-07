const state = {
  editor: null,
  area: null,
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
  },
  SET_AREA(state, area) {
    state.area = area
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
  getArea: (state) => state.area,
  getSelectedNode: (state) => {
    return {
      id: state.selectedNode?.id,
      nodeId: state.selectedNode?.nodeId
    }
  },
  getNodes: (state) => state.nodes,
  getConnections: (state) => state.connections,

  getTargetNodeInputInfo: (state) => (nodeId) => {
    // editor와 targetNode의 존재 여부를 먼저 확인
    const targetNode = state.editor?.getNode(nodeId)
    if (!targetNode) {
      return [] // targetNode가 없으면 빈 배열 반환
    }

    const inputs = targetNode.inputs
    if (!inputs) {
      return [] // inputs가 없으면 빈 배열 반환
    }

    const result = Object.keys(inputs).reduce((acc, inputName) => {
      const input = inputs[inputName]
      const connections = input.connections

      // connections 객체가 존재할 경우에만 처리
      if (connections) {
        Object.keys(connections).forEach((connectionKey) => {
          const connection = connections[connectionKey]
          acc.push({
            inputKey: inputName,
            nodeId: connection.sourceNodeId, // sourceNodeId
            nodeLabel: connection.sourceNodeLabel,
            outputKey: connection.sourceOutputKey // sourceOutputKey
          })
        })
      }

      return acc
    }, [])

    // console.log(result)
    return result
  },

  getTargetNodeInputConnections: (state) => {
    const selectedNode = { ...state.selectedNode }
    if (!selectedNode || !selectedNode.inputs) {
      return {}
    }

    const allConnections = {}

    Object.keys(selectedNode.inputs).forEach((inputKey) => {
      const input = selectedNode.inputs[inputKey]
      if (input.connections) {
        Object.assign(allConnections, input.connections)
      }
    })

    // console.log(allConnections)
    return allConnections
  }
}

export default { namespaced: true, state, mutations, actions, getters }
