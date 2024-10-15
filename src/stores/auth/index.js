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
  login({ commit }, payload) {},
  logout({ commit }) {}
}
const getters = {
  getUser(state) {
    return state.user
  }
}

export default { namespaced: true, state, mutations, actions, getters }
