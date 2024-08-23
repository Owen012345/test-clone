import axios from 'axios'
import argo from './argo'

class Api {
  constructor(url = import.meta.env.VITE_API_URL) {
    // 기본 axios 인스턴스
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000
    })

    // 각 모듈을 초기화
    this.argo = this.#initializeModule(argo, {
      baseURL: import.meta.env.VITE_ARGO_URL,
      timeout: 30000
    })
  }

  #initializeModule(modules, config) {
    const moduleInstance = {}
    Object.keys(modules).forEach((key) => {
      const axiosInstance = config
        ? axios.create({
            ...config
          })
        : this.instance

      moduleInstance[key] = new modules[key](axiosInstance)
    })
    return moduleInstance
  }
}

export default new Api()
