class Test {
  constructor(instance) {
    this.instance = instance
  }

  async getWorkflow(workflowName) {
    try {
      const response = await this.instance.get(`/${workflowName}.json`)
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

export default Test
