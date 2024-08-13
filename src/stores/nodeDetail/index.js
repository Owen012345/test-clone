const state = {
  initialNodeSchema: {},
  defaultNodeSchema: {}
}
const mutations = {
  INIT_NODE_SCHEMA(state, { id, data }) {
    state.initialNodeSchema = {
      ...state.initialNodeSchema,
      [id]: data
    }
  },
  REMOVE_NODE_SCEHMA(state, id) {
    if (state.initialNodeSchema[id] && state.defaultNodeSchema[id]) {
      delete state.initialNodeSchema[id]
      delete state.defaultNodeSchema[id]
    }
  },
  UPDATE_NODE_SCHEMA_DEFAULT(state, { id, formData }) {
    // console.log(id, formData)
    if (state.defaultNodeSchema[id]) {
      state.defaultNodeSchema[id] = { ...state.defaultNodeSchema[id], ...formData }
    } else {
      state.defaultNodeSchema = { ...state.defaultNodeSchema, [id]: formData }
    }
  }
}
const getters = {
  getDefaultNodeSchema: (state) => (id) => {
    return state.defaultNodeSchema[id]
  },
  getInitNodeSchema: (state) => (id) => {
    // console.log(id)
    return state.initialNodeSchema[id]
  }
}
const actions = {
  async initNodeDataWithSchema({ commit }, node) {
    try {
      const schema = await import(`@/components/nodes/schema/${node.nodeId}_schema.json`)

      commit('INIT_NODE_SCHEMA', { id: node.id, data: schema.default })

      const property = schema.properties
      const formData = Object.keys(property).reduce((acc, key) => {
        const field = property[key]

        // default 값이 있는 경우 해당 값을 사용
        if ('default' in field) {
          acc[key] = field.default
        }
        // type이 'array'이고 items.type이 'object'인 경우
        else if (field.type === 'array' && field.items && field.items.type === 'object') {
          const objectTemplate = Object.keys(field.items.properties).reduce((objAcc, objKey) => {
            const objField = field.items.properties[objKey]
            if (objField.type === 'string') {
              objAcc[objKey] = ''
            } else if (objField.type === 'number') {
              objAcc[objKey] = 0
            } else if (objField.type === 'boolean') {
              objAcc[objKey] = false
            } else {
              objAcc[objKey] = null
            }
            return objAcc
          }, {})

          acc[key] = [objectTemplate]
        }
        // type이 'array'이고 default 값이 없는 경우 빈 배열 [] 할당
        else if (field.type === 'array') {
          acc[key] = []
        }
        // 그 외의 경우 null로 설정
        else {
          acc[key] = null
        }

        return acc
      }, {})

      commit('UPDATE_NODE_SCHEMA_DEFAULT', { id: node.id, formData: formData })
    } catch (error) {
      console.error(error)
    }
  },
  removeNodeDataWithSchema({ commit }, id) {
    commit('REMOVE_NODE_SCEHMA', id)
  },

  updateFormData({ commit }, { nodeId, formData }) {
    commit('UPDATE_NODE_SCHEMA_DEFAULT', { id: nodeId, formData: formData })
  }
}

export default { namespaced: true, state, mutations, actions, getters }

// nodeDetail store 는 노드의 세팅 관련 정보를 저장하는 store 입니다.
// editor 내 node 생성 및 삭제 시 필요한 로직을 구현합니다.
