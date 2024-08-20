const state = {
  initialNodeSchema: {},
  defaultNodeSchema: {}
}

const mutations = {
  INIT_NODE_SCHEMA(state, { id, data }) {
    if (state.initialNodeSchema[id]) {
      state.initialNodeSchema[id].settings = {
        ...state.initialNodeSchema[id].settings,
        ...data
      }
    } else {
      state.initialNodeSchema[id] = {
        settings: data
      }
    }
  },
  REMOVE_NODE_SCHEMA(state, id) {
    if (state.initialNodeSchema[id] && state.defaultNodeSchema[id]) {
      delete state.initialNodeSchema[id]
      delete state.defaultNodeSchema[id]
    }
  },
  UPDATE_NODE_SCHEMA_SETTING(state, { id, formData }) {
    if (state.defaultNodeSchema[id]) {
      if (state.defaultNodeSchema[id].settings) {
        state.defaultNodeSchema[id].settings = {
          ...state.defaultNodeSchema[id].settings,
          ...formData
        }
      } else {
        state.defaultNodeSchema[id].settings = formData
      }
    } else {
      state.defaultNodeSchema[id] = {
        settings: formData
      }
    }
  },
  UPDATE_NODE_METADATA(state, { id, metadata }) {
    if (state.defaultNodeSchema[id]) {
      state.defaultNodeSchema[id].metadata = {
        ...state.defaultNodeSchema[id].metadata,
        ...metadata
      }
    } else {
      state.defaultNodeSchema[id] = {
        metadata: metadata
      }
    }
  }
}

const getters = {
  getDefaultSettingNodeSchema: (state) => (id) => {
    return state.defaultNodeSchema[id].settings
  },
  getDefaultMetadataNodeSchema: (state) => (id) => {
    return state.defaultNodeSchema[id].metadata
  },
  getInitSettingNodeSchema: (state) => (id) => {
    return state.initialNodeSchema[id].settings
  },

  // Argo workflow docker container image templates
  getAllMetdata: (state) => {
    return Object.keys(state.defaultNodeSchema).reduce((acc, key) => {
      const metadata = state.defaultNodeSchema[key].metadata
      acc[key] = metadata
      return acc
    }, {})
  }
}

const actions = {
  async initNodeDataWithSchema({ commit }, node) {
    try {
      const schema = await import(`@/components/nodes/schema/${node.nodeId}_schema.json`)
      const metadata = {
        address: '',
        version: ''
      }
      commit('INIT_NODE_SCHEMA', { id: node.id, data: schema.default })

      const property = schema.properties
      const formData = Object.keys(property).reduce((acc, key) => {
        const field = property[key]

        // default 값이 있는 경우 해당 값을 사용
        if ('default' in field) {
          acc[key] = field.default
        } else if (field.type === 'array') {
          acc[key] = []
        } else {
          acc[key] = null // 그 외의 경우 null로 설정
        }

        return acc
      }, {})

      commit('UPDATE_NODE_SCHEMA_SETTING', { id: node.id, formData: formData })
      commit('UPDATE_NODE_METADATA', { id: node.id, metadata: metadata })
    } catch (error) {
      console.error(error)
    }
  },
  removeNodeDataWithSchema({ commit }, id) {
    commit('REMOVE_NODE_SCHEMA', id)
  },
  updateFormData({ commit }, { nodeId, formData }) {
    commit('UPDATE_NODE_SCHEMA_SETTING', { id: nodeId, formData: formData })
  },
  updateMetadaData({ commit }, { nodeId, metadata }) {
    commit('UPDATE_NODE_METADATA', { id: nodeId, metadata: metadata })
  }
}

export default { namespaced: true, state, mutations, actions, getters }
