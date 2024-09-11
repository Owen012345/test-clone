import store from '@/stores'

function createTask(value) {
  // console.log(value)

  const task = {
    name: value.id,
    inline: {}
    // arguments: {
    //   parameters: []
    // }
  }

  // console.log(value)
  // if (
  //   value.group === 'collection' &&
  //   (value.label === 'JSON Reader' || value.label === 'DF Writer')
  // ) {
  //   return { name: task.name, inline: task.inline }
  // }
  // 파라미터 값 결정
  // if (value.group === 'restAPI') {
  //   const data = store.getters['nodeDetail/getDefaultSettingNodeSchema'](value.id)

  //   task.arguments.parameters.push(
  //     { name: 'function', value: value.id },
  //     { name: 'url', value: data.connectionURL }
  //   )
  // } else {
  //   task.arguments.parameters.push({
  //     name: 'settings',
  //     value: JSON.stringify(store.getters['nodeDetail/getDefaultSettingNodeSchema'](value.id))
  //   })
  // }

  // 종속성이 있는 경우 추가
  if (value.dependencies.length > 0) {
    task.dependencies = value.dependencies
  }

  return task
}

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

  const tasks = []

  // 각 노드에 대해 createTask 함수를 호출하여 tasks 배열에 추가
  nodeDependencies.forEach((value) => {
    tasks.push(createTask(value))
  })
  const inlineTemplates = store.getters['argo/getContainerTemplates']

  tasks.forEach((item) => {
    const template = inlineTemplates.find((t) => t.name === item.name)
    if (template && (template.container || template.inputs)) {
      const env = store.getters['nodeDetail/getNodeOutputStorageEnv'](item.name)
      // console.log(env)

      const container = {
        ...template.container
      }

      // env 값을 container의 프로퍼티로 추가

      // item.inline 설정
      item.inline = {
        container: {
          ...container,
          env
        },
        inputs: template.inputs
      }
    }
  })

  // Argo Workflow 템플릿 생성
  const argoWorkflowTemplate = {
    apiVersion: 'argoproj.io/v1alpha1',
    kind: 'Workflow',
    metadata: {
      generateName: 'dag-generated-',
      namespace: 'argo',
      annotations: {
        'workflows.argoproj.io/version': '>= 3.2.0'
      }
    },
    spec: {
      entrypoint: 'main',
      templates: [
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
