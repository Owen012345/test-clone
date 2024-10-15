import api from '@/api'

const state = {
  user: null
}
const mutations = {
  setUser(state, user) {
    state.user = user
  }
}
const actions = {
  async login({ commit }, payload) {
    try {
      const result = await api.etri.login(payload)
      commit('setUser', result)
      return true
    } catch (error) {
      console.error('Failed to login:', error)
      return false
    }
  },
  logout({ commit }) {
    // 로그아웃 API 호출
    // 성공 시, 사용자 정보를 제거
    commit('setUser', null)
  }
}
const getters = {
  getUser(state) {
    return state.user
  }
}

export default { namespaced: true, state, mutations, actions, getters }
