<template>
  <svg data-testid="connection" @click="handleClick">
    <path :d="path" :style="pathStyle"></path>
  </svg>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['data', 'start', 'end', 'path', 'onSelect'],
  data() {
    return {
      cpProps: { ...this.data }
    }
  },
  watch: {
    data: {
      handler(newData) {
        this.cpProps = { ...newData }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handleClick() {
      this.onSelect(this.cpProps)
    }
  },
  computed: {
    pathStyle() {
      return {
        fill: 'none',
        strokeWidth: '5px',
        stroke: this.cpProps.selected ? 'rgb(61, 199, 61)' : 'black' // 선택된 상태에 따라 색상 변경
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
