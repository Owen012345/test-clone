class Argo {
  constructor(instance) {
    this.axios = instance
  }

  async submit(workflow) {
    try {
      const argoFormat = {
        namespace: 'argo',
        serverDryRun: false,
        workflow: {
          ...workflow
        }
      }
      const response = await this.axios.post('/workflows/argo', argoFormat)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }
}

export default Argo
