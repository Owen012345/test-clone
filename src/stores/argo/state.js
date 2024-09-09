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
        image: '199377707058.dkr.ecr.ap-northeast-2.amazonaws.com/argo/alpine:3.7', // test
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
