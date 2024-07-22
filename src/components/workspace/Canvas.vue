<template>
  <div id="editor" ref="editor" @drop="(e) => onDrop(e)" @dragover="onDragOver"></div>
</template>

<script>
import { createEditor } from '@/utils/node/createEditor'
import { createNode } from '@/utils/node/createNode'

export default {
  name: 'Canvas',
  data() {
    return {
      editor: null,
      area: null
    }
  },
  methods: {
    async onDrop(e) {
      e.preventDefault()
      const node = JSON.parse(e.dataTransfer.getData('node'))

      if (node) {
        // const rect = this.$refs.editor.getBoundingClientRect()
        // const editorLeft = rect.left
        // const editorTop = rect.top

        // // Get the position of the drop event relative to the editor
        // const x = e.clientX - editorLeft
        // const y = e.clientY - editorTop
        console.log(e)
        const x = e.offsetX
        const y = e.offsetY

        console.log(x, y)
        await createNode(this.editor, this.area, node, x, y)

        // TODO : 노드 위치 조정
        // https://github.com/retejs/dock-plugin/blob/main/src/drop-strategy.ts
      }
    },

    onDragOver(e) {
      e.preventDefault()
    }
  },
  async mounted() {
    const container = this.$refs.editor
    const { editor, area } = await createEditor(container)
    this.editor = editor
    this.area = area

    console.log(this.editor, this.area)
  },
  beforeUnmount() {}
}
</script>

<style>
#editor {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
