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
        acc[key] = property[key]?.default
        return acc
      }, {})
      //   console.log(formData)

      commit('UPDATE_NODE_SCHEMA_DEFAULT', { id: node.id, formData: formData })
    } catch (error) {
      console.error(error)
    }
  },
  updateFormData({ commit }, { nodeId, formData }) {
    console.log(nodeId, formData)
    commit('UPDATE_NODE_SCHEMA_DEFAULT', { id: nodeId, formData: formData })
  }
}

export default { namespaced: true, state, mutations, actions, getters }

// 1. 노드 생성 시 스키마 파일 import 후 스키마 내용을 생성된 노드의 초기값으로 설정
// 2. 초기값은 노드가 선택시 가져오도록 설정
// 2-1. 노드는 id 기준으로 가져오도록 설정
// 3.

// nodeDetail store 는 노드의 세팅 관련 정보를 저장하는 store 입니다.
// editor 내 node 생성 및 삭제 시 필요한 로직을 구현합니다.
