import { h } from 'vue'
import { NodeEditor } from 'rete'
import store from '@/stores'
import { AreaPlugin, AreaExtensions } from 'rete-area-plugin'
import {
  BidirectFlow,
  ConnectionPlugin,
  Presets as ConnectionPresets
} from 'rete-connection-plugin'
import { VuePlugin, Presets } from 'rete-vue-plugin'

import CustomNode from '@/views/workflow/node/CustomNode.vue'
import CustomConnection from '@/views/workflow/node/CustomConnection.vue'
import { removeNodeWithConnections } from './removeNodeWithConnections'
import { checkMultiplePort } from './handleConnections'

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

  // Rete.js Event watcher

  area.addPipe((context) => {
    if (context.type === 'pointerdown') {
      store.dispatch('workflow/removeNode')
    }
    if (context.type === 'nodepicked') {
      console.log(context)
      const allNodes = editor.getNodes(context.data.id)

      const selectedNodes = allNodes.filter((node) => node.selected === true)

      if (selectedNodes) {
        store.dispatch('workflow/updateSelectedNode', selectedNodes[0])
      }
    }
    return context
  })

  editor.addPipe((context) => {
    if (
      context.type === 'nodecreated' ||
      context.type === 'noderemoved' ||
      context.type === 'connectionremoved'
    ) {
      // console.log(context)
      // console.log(editor.getConnections(), editor.getNodes())
    }
    if (context.type === 'connectioncreated') {
      const { data } = context

      const targetInput = data.targetInput // targetNode 의 input id
      const sourceOutput = data.sourceOutput // sourceNode 의 output id

      const targetNode = editor.getNode(data.target)
      const sourceNode = editor.getNode(data.source)
      const connectionId = data.id

      checkMultiplePort(editor, connectionId, targetNode, targetInput, sourceNode, sourceOutput)
    }

    return context
  })
  //

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
