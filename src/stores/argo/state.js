const state = {
  containerTemplate: {
    collection: {
      name: '',
      inputs: {
        parameters: []
      },
      container: {
        // image: 'nexus.dtonic.io:5001/repository/test/alpine:3.7',
        image: '' // ecr test
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
