import store from '@/stores'

export function getDataStructure() {
  const editor = store.getters['workflow/getEditor']
  const getAllMetdata = store.getters['nodeDetail/getAllMetdata']

  const nodes = editor.nodes
  const connections = editor.connections

  // 노드 정보를 맵으로 변환
  const nodeMap = new Map(nodes.map((node) => [node.id, node]))

  // console.log(nodeMap)
  // 각 노드에 대한 dependencies 설정
  const nodeDependencies = new Map()

  // TODO : source node 에
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

  nodeDependencies.forEach((value, nodeId) => {
    console.log(value)
    const task = {
      name: value.id,
      template: value.group,
      arguments: {
        parameters: [{ name: 'message', value: value.id }]
      }
    }

    if (value.dependencies.length > 0) {
      task.dependencies = value.dependencies
    }

    tasks.push(task)
  })

  console.log(store.getters['argo/getContainerTemplates'])
  // Argo Workflow YAML 템플릿 생성
  const argoWorkflowTemplate = {
    apiVersion: 'argoproj.io/v1alpha1',
    kind: 'Workflow',
    metadata: {
      generateName: 'dag-generated-'
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

  console.log(JSON.stringify(argoWorkflowTemplate, null, 2))
  return argoWorkflowTemplate
}
