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
        image: 'alpine:3.7', // test
        command: ['echo', '{{inputs.parameters.function}}']
      }
    },
    restAPI: {
      name: '',
      inputs: {
        parameters: [
          {
            name: 'function'
          },
          {
            name: 'url'
          }
        ]
      },
      container: {
        image: '',
        command: ['curl', '-X', 'GET', '{{inputs.parameters.url}}']
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
