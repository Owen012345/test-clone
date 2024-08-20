import store from '@/stores'

export function getDataStructure() {
  const editor = store.getters['workflow/getEditor']
  const getAllMetdata = store.getters['nodeDetail/getAllMetdata']

  console.log(getAllMetdata)
  const nodes = editor.nodes
  const connections = editor.connections

  // 노드 정보를 맵으로 변환
  const nodeMap = new Map(nodes.map((node) => [node.id, node]))

  console.log(nodeMap)
  // 각 노드에 대한 dependencies 설정
  const nodeDependencies = new Map()

  nodes.forEach((node) => {
    nodeDependencies.set(node.id, {
      id: node.id,
      dependencies: []
    })
  })

  console.log(nodeDependencies)
  console.log(connections)
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
    const task = {
      name: value.id,
      template: 'echo', // 예시로 'echo' 템플릿 사용
      arguments: {
        parameters: [{ name: 'message', value: value.id }]
      }
    }

    if (value.dependencies.length > 0) {
      task.dependencies = value.dependencies
    }

    tasks.push(task)
  })

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
        {
          name: 'echo',
          inputs: {
            parameters: [{ name: 'message' }]
          },
          container: {
            image: 'alpine:3.7',
            command: ['echo', '{{inputs.parameters.message}}']
          }
        },
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
