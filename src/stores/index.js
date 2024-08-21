import { createStore } from 'vuex'
import workflow from './workflow'
import nodeDetail from './nodeDetail'
import argo from './argo'

export default createStore({
  namespaced: true,
  modules: {
    workflow,
    nodeDetail,
    argo
  }
})
