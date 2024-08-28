import store from '@/stores'

export function getDataStructure() {
  const editor = store.getters['workflow/getEditor']

  const nodes = editor.nodes
  const connections = editor.connections

  const nodeMap = new Map(nodes.map((node) => [node.id, node]))

  const nodeDependencies = new Map()

  nodes.forEach((node) => {
    nodeDependencies.set(node.id, {
      ...node,
      dependencies: []
    })
  })

  connections.forEach((conn) => {
    const sourceNode = nodeMap.get(conn.source)
    const targetNode = nodeMap.get(conn.target)

    if (sourceNode && targetNode) {
      nodeDependencies.get(conn.target).dependencies.push(sourceNode.id)
    }
  })

  // Argo Workflow의 DAG tasks 생성
  const tasks = []

  nodeDependencies.forEach((value) => {
    console.log(value)
    const task = {
      name: value.id,
      template: value.id,
      arguments: {
        parameters: [
          { name: 'function', value: value.label }
          // docker image parameter 예시
          // {
          //   name: 'metadata',
          //   value: store.getters['nodeDetail/getDockerImageUrl'](value.id)
          // },
          // {
          //   name: 'settings',
          //   value: store.getters['nodeDetail/getDefaultSettingNodeSchema'](value.id)
          // }
        ]
      }
    }

    if (value.dependencies.length > 0) {
      task.dependencies = value.dependencies
    }

    tasks.push(task)
  })

  // console.log(nodes)
  // Argo Workflow 템플릿 생성
  const argoWorkflowTemplate = {
    apiVersion: 'argoproj.io/v1alpha1',
    kind: 'Workflow',
    metadata: {
      generateName: 'dag-generated-',
      namespace: 'argo'
    },
    spec: {
      entrypoint: 'main',
      templates: [
        ...store.getters['argo/getContainerTemplates'],
        {
          name: 'main',
          dag: {
            tasks: tasks
          }
        }
      ]
    }
  }

  // console.log(JSON.stringify(argoWorkflowTemplate, null, 2))
  return argoWorkflowTemplate
}
