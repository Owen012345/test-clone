import { ClassicPreset } from 'rete'

class Node extends ClassicPreset.Node {
  constructor(label, nodeId) {
    super(label)
    this.width = 120
    this.height = 80
    this.nodeId = nodeId
  }
}

export async function createNode(container, area, selectedNode, event) {
  const socket = new ClassicPreset.Socket('socket')

  const node = new Node(selectedNode.label, selectedNode.id)

  if (selectedNode.options.input) {
    for (let i = 0; i < selectedNode.options.input; i++) {
      node.addInput(`input-${i}`, new ClassicPreset.Input(socket))
    }
  }
  if (selectedNode.options.output) {
    for (let i = 0; i < selectedNode.options.output; i++) {
      node.addOutput(`output-${i}`, new ClassicPreset.Output(socket))
    }
  }
  area.area.setPointerFrom(event)
  const { x, y } = area.area.pointer
  await container.addNode(node)

  await area.translate(node.id, { x: x, y: y })

  return {
    destroy: () => area.destroy()
  }
}
