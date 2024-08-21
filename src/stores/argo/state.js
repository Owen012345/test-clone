const state = {
  containerTemplate: {
    collection: {
      name: '',
      inputs: {
        parameters: [
          {
            name: 'message'
          }
        ]
      },
      container: {
        image: '',
        command: ['echo', '{{inputs.parameters.message}}']
      }
    },
    preprocess: {
      name: '',
      inputs: {
        parameters: [
          {
            name: 'message'
          }
        ]
      },
      container: {
        image: '',
        command: ['echo', '{{inputs.parameters.message}}']
      }
    },
    transformation: {
      name: '',
      inputs: {
        parameters: [
          {
            name: 'message'
          }
        ]
      },
      container: {
        image: '',
        command: ['echo', '{{inputs.parameters.message}}']
      }
    },
    visualization: {
      name: '',
      inputs: {
        parameters: [
          {
            name: 'message'
          }
        ]
      },
      container: {
        image: '',
        command: ['echo', '{{inputs.parameters.message}}']
      }
    },
    SQL: {
      name: '',
      inputs: {
        parameters: [
          {
            name: 'message'
          }
        ]
      },
      container: {
        image: '',
        command: ['echo', '{{inputs.parameters.message}}']
      }
    },
    dataMining: {
      name: '',
      inputs: {
        parameters: [
          {
            name: 'message'
          }
        ]
      },
      container: {
        image: '',
        command: ['echo', '{{inputs.parameters.message}}']
      }
    }
  },
  containerTemplatesList: []
}

export default state
