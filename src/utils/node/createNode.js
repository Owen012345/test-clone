import { ClassicPreset } from 'rete'

class Node extends ClassicPreset.Node {
  constructor(label, nodeId) {
    super(label)
    this.width = 120
    this.height = 80
    this.nodeId = nodeId
  }
}

export async function createNode(editor, area, selectedNode, event) {
  const socket = new ClassicPreset.Socket('socket')

  const node = new Node(selectedNode.label, selectedNode.id)

  if (selectedNode.options.input) {
    for (let i = 0; i < selectedNode.options.input.cnt; i++) {
      const input = new ClassicPreset.Input(socket)
      input.multipleConnections = selectedNode.options.input.multiple
      node.addInput(`input-${i}`, input)
    }
  }
  if (selectedNode.options.output) {
    for (let i = 0; i < selectedNode.options.output.cnt; i++) {
      const output = new ClassicPreset.Output(socket)
      output.multipleConnections = selectedNode.options.output.multiple
      node.addOutput(`output-${i}`, output)
    }
  }

  area.area.setPointerFrom(event)
  const { x, y } = area.area.pointer
  await editor.addNode(node)

  await area.translate(node.id, { x: x, y: y })

  return {
    destroy: () => area.destroy()
  }
}
