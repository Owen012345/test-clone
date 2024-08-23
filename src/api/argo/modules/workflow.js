class Workflow {
  constructor(instance) {
    this.axios = instance
  }

  async submit(workflow) {
    try {
      const response = await this.axios.post('/workflows/argo', workflow)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }
}

export default Workflow
