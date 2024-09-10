function getSchemaPropertySet(property) {
  // const property = schema.properties
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
  return formData
}

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
  INIT_NODE_DEFAULT(state, { id, group, label }) {
    state.defaultNodeSchema[id] = {
      ...state.defaultNodeSchema[id],
      group: group,
      label: label
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
  },

  UPDATE_NODE_STORAGE_OUTPUT(state, { id, outputKey, formData }) {
    // console.log(formData)
    state.defaultNodeSchema[id].storage[outputKey] = formData
  },
  UPDATE_NODE_STORAGE_OUTPUT_FORM(state, { id, formData }) {
    // console.log(id, formData)
    state.defaultNodeSchema[id].storage = formData
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
  getDockerImageUrl: (state) => (id) => {
    return state.defaultNodeSchema[id].metadata.address &&
      state.defaultNodeSchema[id].metadata.version
      ? state.defaultNodeSchema[id].metadata.address +
          ':' +
          state.defaultNodeSchema[id].metadata.version
      : ''
  },
  getNodeOutputStorage: (state) => (id) => {
    return state.defaultNodeSchema[id].storage
  },
  getNodeOuputs: (state) => (id) => {
    return Object.keys(state.defaultNodeSchema[id].storage)
  },
  getNodeOuputStorageEnv: (state) => (id) => {
    const result = Object.keys(state.defaultNodeSchema[id].storage).map((key) => {
      return {
        name: key,
        value: JSON.stringify(state.defaultNodeSchema[id].storage[key])
      }
    })
    return result
  }
}

const actions = {
  async initNodeDataWithSchema({ commit, dispatch }, node) {
    try {
      // TODO : C2_N01 부터 C2_N04 는 C2_N01 의 스키마를 사용하도록
      const schemaNodeId =
        node.nodeId === 'C2_N02' || node.nodeId === 'C2_N03' || node.nodeId === 'C2_N04'
          ? 'C2_N01'
          : node.nodeId

      const schema = await import(`@/components/nodes/schema/${schemaNodeId}_schema.json`)
      const metadata = {
        address: '',
        version: ''
      }
      commit('INIT_NODE_SCHEMA', { id: node.id, data: schema.default })

      const formData = getSchemaPropertySet(schema.properties)

      commit('UPDATE_NODE_SCHEMA_SETTING', { id: node.id, formData: formData }) // settings
      commit('UPDATE_NODE_METADATA', { id: node.id, metadata: metadata }) // metadata
      commit('INIT_NODE_DEFAULT', { id: node.id, group: node.group, label: node.label }) // group, label
      commit('argo/INIT_CONTAINER_TEMPLATE', { name: node.id, group: node.group }, { root: true })

      await dispatch('initNodeStorageOuput', { id: node.id, storage: Object.keys(node.outputs) }) // storage
    } catch (error) {
      console.error(error)
    }
  },
  async initNodeStorageOuput({ state }, { id, storage }) {
    const initStorageType = 'ceph'
    if (!state.defaultNodeSchema[id]) {
      state.defaultNodeSchema[id] = {}
    }
    const schema = await import(`@/components/nodes/schema/STORAGE_${initStorageType}.json`)
    const formData = getSchemaPropertySet(schema.properties)

    state.defaultNodeSchema[id].storage = storage.reduce((acc, key) => {
      acc[key] = {
        ...formData
      }
      return acc
    }, {})
  },
  async updateNodeStorageOutputType({ commit }, { id, outputKey, type }) {
    // console.log(id, outputKey, type)
    const schema = await import(`@/components/nodes/schema/STORAGE_${type}.json`)
    const formData = getSchemaPropertySet(schema.properties)

    commit('UPDATE_NODE_STORAGE_OUTPUT', { id, outputKey, formData })
  },
  removeNodeDataWithSchema({ commit }, id) {
    commit('REMOVE_NODE_SCHEMA', id)
  },
  updateFormData({ commit }, { nodeId, formData }) {
    commit('UPDATE_NODE_SCHEMA_SETTING', { id: nodeId, formData: formData })
  },
  updateMetadaData({ commit }, { nodeId, metadata }) {
    commit('UPDATE_NODE_METADATA', { id: nodeId, metadata: metadata })
  },
  updateNodeStorageOuputForm({ commit }, { id, formData }) {
    commit('UPDATE_NODE_STORAGE_OUTPUT_FORM', { id, formData })
  }
}

export default { namespaced: true, state, mutations, actions, getters }
