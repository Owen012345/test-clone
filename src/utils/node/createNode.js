import { ClassicPreset } from 'rete'

class Node extends ClassicPreset.Node {
  width = 120
  height = 80
}

export async function createNode(container, area, selectedNode, event) {
  console.log(event)
  const socket = new ClassicPreset.Socket('socket')

  const node = new Node(selectedNode.label)

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
