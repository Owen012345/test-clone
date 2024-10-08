import { createStore } from 'vuex'
import workflow from './workflow'
import nodeDetail from './nodeDetail'
import argo from './argo'
import auth from './auth'

export default createStore({
  namespaced: true,
  modules: {
    auth,
    workflow,
    nodeDetail,
    argo
  }
})
