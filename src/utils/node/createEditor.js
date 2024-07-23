import { NodeEditor } from 'rete'
import { AreaPlugin, AreaExtensions } from 'rete-area-plugin'
import {
  BidirectFlow,
  ConnectionPlugin,
  Presets as ConnectionPresets
} from 'rete-connection-plugin'
import { VuePlugin, Presets } from 'rete-vue-plugin'

import CustomNode from '@/components/workspace/node/CustomNode.vue'

export async function createEditor(container) {
  const editor = new NodeEditor('demo@0.1.0')
  const area = new AreaPlugin(container)
  const connection = new ConnectionPlugin()
  const render = new VuePlugin()

  AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
    accumulating: AreaExtensions.accumulateOnCtrl()
  })

  render.addPreset(
    Presets.classic.setup({
      customize: {
        node() {
          return CustomNode
          // return Presets.classic.Node
        }
      }
    })
  )

  connection.addPreset(() => new BidirectFlow())

  editor.use(area)
  area.use(connection)
  area.use(render)

  editor.addPipe((context) => {
    if (
      context.type === 'nodecreated' ||
      context.type === 'noderemoved' ||
      context.type === 'connectioncreated' ||
      context.type === 'connectionremoved'
    ) {
      console.log(context)
    }
    return context
  })

  AreaExtensions.simpleNodesOrder(area)

  AreaExtensions.zoomAt(area, editor.getNodes())

  // const syncWithVuex = () => {}

  return { editor, area }
}
