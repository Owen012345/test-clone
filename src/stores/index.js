import { createStore } from 'vuex'
import workflow from './workflow'
import nodeDetail from './nodeDetail'

export default createStore({
  namespaced: true,
  modules: {
    workflow,
    nodeDetail
  }
})
