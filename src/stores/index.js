import { createStore } from 'vuex'
import workflow from './workflow'

export default createStore({
  namespaced: true,
  modules: {
    workflow
  }
})
