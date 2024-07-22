import { ClassicPreset } from 'rete'

class Node extends ClassicPreset.Node {
  width = 180
  height = 100
}

export async function createNode(container, area, selectedNode, x, y) {
  const socket = new ClassicPreset.Socket('socket')

  const node = new Node(selectedNode.label)

  if (selectedNode.options.input) {
    for (let i = 0; i < selectedNode.options.input; i++) {
      node.addInput('port', new ClassicPreset.Input(socket))
    }
  }
  if (selectedNode.options.output) {
    for (let i = 0; i < selectedNode.options.output; i++) {
      node.addOutput('port', new ClassicPreset.Output(socket))
    }
  }

  await container.addNode(node)
  await area.translate(node.id, { x: x, y: y })

  return node
}
