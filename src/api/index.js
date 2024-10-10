import axios from 'axios'
import Argo from './modules/argo'
import Workflow from './modules/workflow'
import Test from './modules/test'
class Api {
  constructor(url = import.meta.env.VITE_API_URL) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000
    })
  }

  #getInstance(_class, customConfig = {}) {
    const className = _class.name

    if (!this[className]) {
      const instance = customConfig.baseURL ? axios.create({ ...customConfig }) : this.instance

      this[className] = new _class(instance)
    }

    return this[className]
  }

  get argo() {
    return this.#getInstance(Argo, {
      baseURL: '/argo',
      timeout: 30000
    })
  }

  get workflow() {
    return this.#getInstance(Workflow, {
      baseURL: '/workflow',
      timeout: 30000
    })
  }

  get test() {
    return this.#getInstance(Test, {
      baseURL: '/',
      timeout: 30000
    })
  }
}

export default new Api()
