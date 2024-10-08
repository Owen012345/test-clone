const state = {
  user: null
}
const mutations = {
  setUser(state, user) {
    state.user = user
  }
}
const actions = {
  login({ commit }, payload) {
    // 로그인 API 호출
    // 성공 시, 사용자 정보를 저장
    commit('setUser', payload)
    return true
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
