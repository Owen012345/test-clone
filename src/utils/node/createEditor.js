import { NodeEditor, ClassicPreset } from 'rete'
import { AreaPlugin, AreaExtensions } from 'rete-area-plugin'
import { ConnectionPlugin, Presets as ConnectionPresets } from 'rete-connection-plugin'
import { VuePlugin, Presets } from 'rete-vue-plugin'

export async function createEditor(container) {
  const socket = new ClassicPreset.Socket('socket')

  const editor = new NodeEditor('demo@0.1.0')
  const area = new AreaPlugin(container)
  const connection = new ConnectionPlugin()
  const render = new VuePlugin()

  AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
    accumulating: AreaExtensions.accumulateOnCtrl()
  })

  render.addPreset(Presets.classic.setup())
  connection.addPreset(ConnectionPresets.classic.setup())

  editor.use(area)
  area.use(connection)
  area.use(render)

  AreaExtensions.simpleNodesOrder(area)

  const a = new ClassicPreset.Node('A')
  a.addControl('a', new ClassicPreset.InputControl('text', { initial: 'hello' }))
  a.addOutput('a', new ClassicPreset.Output(socket))
  await editor.addNode(a)

  const b = new ClassicPreset.Node('B')
  b.addControl('b', new ClassicPreset.InputControl('text', { initial: 'hello' }))
  b.addInput('b', new ClassicPreset.Input(socket))
  await editor.addNode(b)

  AreaExtensions.zoomAt(area, editor.getNodes())

  return { editor, area }
}
