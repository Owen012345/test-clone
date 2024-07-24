import { h } from 'vue'
import { NodeEditor } from 'rete'
import { AreaPlugin, AreaExtensions } from 'rete-area-plugin'
import {
  BidirectFlow,
  ConnectionPlugin,
  Presets as ConnectionPresets
} from 'rete-connection-plugin'
import { VuePlugin, Presets } from 'rete-vue-plugin'

import CustomNode from '@/components/workspace/node/CustomNode.vue'
import CustomConnection from '@/components/workspace/node/CustomConnection.vue'
import { removeNodeWithConnections } from './removeNodeWithConnections'

export async function createEditor(container) {
  const editor = new NodeEditor('demo@0.1.0')
  const area = new AreaPlugin(container)
  const connection = new ConnectionPlugin()
  const render = new VuePlugin()

  const selector = AreaExtensions.selector()
  const accumulating = AreaExtensions.accumulateOnCtrl()

  AreaExtensions.selectableNodes(area, selector, { accumulating })

  function SelectableConnectionBind() {
    function handleSelect(props) {
      const id = props.id
      const label = 'connection'
      selector.add(
        {
          id,
          label,
          translate() {},
          unselect() {
            props.selected = false
            area.update('connection', id)
          }
        },
        accumulating.active()
      )
      props.selected = true
      area.update('connection', id)
    }
    return h(CustomConnection, {
      onSelect: handleSelect
    })
  }

  render.addPreset(
    Presets.classic.setup({
      customize: {
        node() {
          return CustomNode
          // return Presets.classic.Node
        },
        connection() {
          return SelectableConnectionBind()
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
      context.type === 'connectionremoved' ||
      context.type === 'connectioncreated'
    ) {
      console.log(context)
    }
    return context
  })

  AreaExtensions.simpleNodesOrder(area)

  AreaExtensions.zoomAt(area, editor.getNodes())

  // TODO : vuex 연동 필요?
  // const syncWithVuex = () => {}

  return {
    removeSelected: async () => {
      for (const item of [...editor.getConnections()]) {
        if (item.selected) {
          await editor.removeConnection(item.id)
        }
      }
      for (const item of [...editor.getNodes()]) {
        if (item.selected) {
          await removeNodeWithConnections(editor, item.id)
        }
      }
    },
    editor,
    area
  }
}
