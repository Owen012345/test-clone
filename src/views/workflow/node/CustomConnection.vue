<template>
  <div>
    <svg data-testid="connection" @click="handleClick">
      <path :d="path" :style="getPathStyle()"></path>
    </svg>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
// import { mapActions } from 'vuex'
export default defineComponent({
  props: ['data', 'start', 'end', 'path', 'onSelect'],
  methods: {
    // ...mapActions('workflow', ['removeNode']),
    handleClick() {
      // this.removeNode()
      this.onSelect(this.data)
    },
    getPathStyle() {
      return {
        fill: 'none',
        strokeWidth: '5px',
        stroke: this.data.selected ? 'rgb(61, 199, 61)' : 'black' // 선택된 상태에 따라 색상 변경
      }
    }
  }
})
</script>

<style lang="scss" scoped>
svg {
  overflow: visible !important;
  position: absolute;
  pointer-events: none;
  width: 9999px;
  height: 9999px;
  path {
    fill: none;
    stroke-width: 5px;
    stroke: black;
    pointer-events: auto;
  }
}
</style>
