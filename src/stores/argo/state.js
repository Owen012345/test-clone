const state = {
  containerTemplate: {
    collection: {
      name: '',
      inputs: {
        parameters: [
          {
            name: 'function'
          }
        ]
      },
      container: {
        image: '', // test
        command: ['echo', '{{inputs.parameters.function}}']
      }
    },
    preprocess: {
      name: '',
      inputs: {
        parameters: [
          {
            name: 'function'
          }
        ]
      },
      container: {
        image: '',
        command: ['echo', '{{inputs.parameters.function}}']
      }
    },
    transformation: {
      name: '',
      inputs: {
        parameters: [
          {
            name: 'function'
          }
        ]
      },
      container: {
        image: '',
        command: ['echo', '{{inputs.parameters.function}}']
      }
    },
    visualization: {
      name: '',
      inputs: {
        parameters: [
          {
            name: 'function'
          }
        ]
      },
      container: {
        image: '',
        command: ['echo', '{{inputs.parameters.function}}']
      }
    },
    SQL: {
      name: '',
      inputs: {
        parameters: [
          {
            name: 'function'
          }
        ]
      },
      container: {
        image: '',
        command: ['echo', '{{inputs.parameters.function}}']
      }
    },
    dataMining: {
      name: '',
      inputs: {
        parameters: [
          {
            name: 'function'
          }
        ]
      },
      container: {
        image: '',
        command: ['echo', '{{inputs.parameters.function}}']
      }
    }
  },
  containerTemplatesList: []
}

export default state
