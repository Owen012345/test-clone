class Etri {
  constructor(instance) {
    this.instance = instance
    this.token = localStorage.getItem('token') || null

    if (this.token) {
      this.instance.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
    }
  }

  async login(userData) {
    try {
      const response = await this.instance.post('/authnz/authentication/user/login', userData)
      const { accessToken } = response.data

      if (accessToken) {
        this.token = accessToken
        this.instance.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        localStorage.setItem('token', this.token)
      }
      return true
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  // 분산 파이프라인 생성
  async createDistributedPipeline(pipelineData) {
    try {
      const response = await this.instance.post('/distributed-pipeline/create', pipelineData)
      return response.data
    } catch (error) {
      if (error.response) {
        const { statusCode, code, flag, message } = error.response.data
        console.error('에러 발생:', {
          statusCode,
          code,
          flag,
          message
        })

        // 에러 코드에 따른 처리
        switch (code) {
          case 1000001:
            console.error('입력 값이 유효하지 않습니다.')
            break
          case 1000002:
            console.error('인증되지 않은 사용자입니다.')
            break
          case 1000003:
            console.error('권한이 없습니다.')
            break
          case 1000000:
            console.error('서버 오류가 발생했습니다.')
            break
          default:
            console.error('알 수 없는 에러가 발생했습니다.')
        }
      } else {
        console.error('요청 실패:', error.message)
      }
      throw error
    }
  }

  async getDistributedPipeline(id) {
    try {
      const url = '/distributed-pipeline/get'
      const params = { id }

      // API 요청
      const response = await this.instance.get(url, { params })
      return response.data
    } catch (error) {
      if (error.response) {
        const { statusCode, code, flag, message } = error.response.data
        console.error('에러 발생:', {
          statusCode,
          code,
          flag,
          message
        })

        // 에러 코드에 따른 처리
        switch (code) {
          case 1000001:
            console.error('입력 값이 유효하지 않습니다.')
            break
          case 1000002:
            console.error('인증되지 않은 사용자입니다.')
            break
          case 1000003:
            console.error('권한이 없습니다.')
            break
          case 1000000:
            console.error('서버 오류가 발생했습니다.')
            break
          default:
            console.error('알 수 없는 에러가 발생했습니다.')
        }
      } else {
        console.error('요청 실패:', error.message)
      }
      throw error
    }
  }

  async listDistributedPipelines({ offset = 0, limit = 10, sort = 'issued', ordered = 'ASC' }) {
    try {
      const url = '/distributed-pipeline/list'
      const params = {
        offset,
        limit,
        sort,
        ordered
      }

      const response = await this.instance.get(url, { params })
      return response.data
    } catch (error) {
      if (error.response) {
        const { statusCode, code, flag, message } = error.response.data
        console.error('에러 발생:', {
          statusCode,
          code,
          flag,
          message
        })

        switch (code) {
          case 1000001:
            console.error('입력 값이 유효하지 않습니다.')
            break
          case 1000002:
            console.error('인증되지 않은 사용자입니다.')
            break
          case 1000003:
            console.error('권한이 없습니다.')
            break
          case 1000000:
            console.error('서버 오류가 발생했습니다.')
            break
          default:
            console.error('알 수 없는 에러가 발생했습니다.')
        }
      } else {
        console.error('요청 실패:', error.message)
      }
      throw error
    }
  }

  async updateDistributedPipeline(pipelineData) {
    try {
      const url = '/distributed-pipeline/update'

      const response = await this.instance.post(url, pipelineData)
      return response.data
    } catch (error) {
      if (error.response) {
        const { statusCode, code, flag, message } = error.response.data
        console.error('에러 발생:', {
          statusCode,
          code,
          flag,
          message
        })

        // 에러 코드에 따른 처리
        switch (code) {
          case 1000001:
            console.error('입력 값이 유효하지 않습니다.')
            break
          case 1000002:
            console.error('인증되지 않은 사용자입니다.')
            break
          case 1000003:
            console.error('권한이 없습니다.')
            break
          //   case 'DISTRIBUTED_PIPELINE_NOT_FOUND':
          //     console.error('지정된 분산 파이프라인이 존재하지 않습니다.');
          //     break;
          case 1000000:
            console.error('서버 오류가 발생했습니다.')
            break
          default:
            console.error('알 수 없는 에러가 발생했습니다.')
        }
      } else {
        console.error('요청 실패:', error.message)
      }
      throw error
    }
  }

  async removeDistributedPipeline(pipelineData) {
    try {
      const url = '/distributed-pipeline/remove'

      const response = await this.instance.post(url, pipelineData)
      return response.data
    } catch (error) {
      if (error.response) {
        const { statusCode, code, flag, message } = error.response.data
        console.error('에러 발생:', {
          statusCode,
          code,
          flag,
          message
        })

        switch (code) {
          case 1000001:
            console.error('입력 값이 유효하지 않습니다.')
            break
          case 1000002:
            console.error('인증되지 않은 사용자입니다.')
            break
          case 1000003:
            console.error('권한이 없습니다.')
            break
          //   case 'DEVOPS_SOLUTION_INSTANCE_NOT_FOUND':
          //     console.error('지정된 솔루션 인스턴스가 존재하지 않습니다.')
          //     break
          case 1000000:
            console.error('서버 오류가 발생했습니다.')
            break
          default:
            console.error('알 수 없는 에러가 발생했습니다.')
        }
      } else {
        console.error('요청 실패:', error.message)
      }
      throw error
    }
  }

  async executeDistributedPipeline(actionData) {
    try {
      const url = '/distributed-pipeline/execute'

      const response = await this.instance.post(url, actionData)
      return response.data
    } catch (error) {
      if (error.response) {
        const { statusCode, code, flag, message } = error.response.data
        console.error('에러 발생:', {
          statusCode,
          code,
          flag,
          message
        })

        switch (code) {
          case 1000001:
            console.error('입력 값이 유효하지 않습니다.')
            break
          case 'DEVOPS_EXECUTION_ACTION_INVALID':
            console.error('실행할 작업이 유효하지 않습니다.')
            break
          case 1000002:
            console.error('인증되지 않은 사용자입니다.')
            break
          case 1000003:
            console.error('권한이 없습니다.')
            break
          case 'DISTRIBUTED_PIPELINE_NOT_FOUND':
            console.error('지정된 분산 파이프라인이 존재하지 않습니다.')
            break
          case 1000000:
            console.error('서버 오류가 발생했습니다.')
            break
          default:
            console.error('알 수 없는 에러가 발생했습니다.')
        }
      } else {
        console.error('요청 실패:', error.message)
      }
      throw error
    }
  }

  async validateDistributedPipeline(pipelineId) {
    try {
      const url = `/distributed-pipeline/validate?id=${encodeURIComponent(pipelineId)}`

      const response = await this.instance.get(url)
      return response.data
    } catch (error) {
      if (error.response) {
        const { statusCode, code, flag, message } = error.response.data
        console.error('에러 발생:', {
          statusCode,
          code,
          flag,
          message
        })

        switch (code) {
          case 1000001:
            console.error('입력 값이 유효하지 않습니다.')
            break
          case 60061:
            console.error('분산 파이프라인 스펙이 유효하지 않습니다.')
            break
          case 1000002:
            console.error('인증되지 않은 사용자입니다.')
            break
          case 1000003:
            console.error('권한이 없습니다.')
            break
          case 60056:
            console.error('지정된 분산 파이프라인이 존재하지 않습니다.')
            break
          case 1000000:
            console.error('서버 오류가 발생했습니다.')
            break
          default:
            console.error('알 수 없는 에러가 발생했습니다.')
        }
      } else {
        console.error('요청 실패:', error.message)
      }
      throw error
    }
  }

  // async getWorkflow(workflowName) {
  //   try {
  //     const response = await this.instance.get(`/${workflowName}.json`)
  //     return response.data
  //   } catch (error) {
  //     console.error(error)
  //     throw error
  //   }
  // }
}

export default Etri
