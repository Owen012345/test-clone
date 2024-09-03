<template>
  <CustomNodeToolbar />
  <div class="node" :class="{ selected: data.selected }" :style="nodeStyles()" data-testid="node">
    <div class="title" data-testid="title">{{ data.label }}</div>
    <!-- Outputs-->
    <div class="output-wrapper">
      <div
        class="output"
        v-for="[key, output] in outputs()"
        :key="key + seed"
        :data-testid="'OUTPUT' + key"
      >
        <div class="output-title" data-testid="output-title">{{ output.label }}</div>
        <Ref
          class="output-socket"
          :emit="emit"
          :data="{
            type: 'socket',
            side: 'output',
            key: key,
            nodeId: data.id,
            payload: output.socket
          }"
          data-testid="output-socket"
        />
      </div>
    </div>
    <!-- Controls-->
    <Ref
      class="control"
      v-for="[key, control] in controls()"
      :key="key + seed"
      :emit="emit"
      :data="{ type: 'control', payload: control }"
      :data-testid="'control-' + key"
    />
    <!-- Inputs-->
    <div class="input-wrapper">
      <div
        class="input"
        v-for="[key, input] in inputs()"
        :key="key + seed"
        :data-testid="'INPUT' + key"
      >
        <Ref
          class="input-socket"
          :emit="emit"
          :data="{
            type: 'socket',
            side: 'input',
            key: key,
            nodeId: data.id,
            payload: input.socket
          }"
          data-testid="input-socket"
        />
        <div
          class="input-title"
          v-show="!input.control || !input.showControl"
          data-testid="input-title"
        >
          {{ input.label }}
        </div>
        <Ref
          class="input-control"
          v-show="input.control && input.showControl"
          :emit="emit"
          :data="{ type: 'control', payload: input.control }"
          data-testid="input-control"
        />
      </div>
    </div>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue'
import { Ref } from 'rete-vue-plugin'
import CustomNodeToolbar from './CustomNodeToolbar.vue'

function sortByIndex(entries) {
  entries.sort((a, b) => {
    const ai = (a[1] && a[1].index) || 0
    const bi = (b[1] && b[1].index) || 0

    return ai - bi
  })
  return entries
}

export default defineComponent({
  props: ['data', 'emit', 'seed'],
  methods: {
    nodeStyles() {
      return {
        width: Number.isFinite(this.data.width) ? `${this.data.width}px` : '',
        height: Number.isFinite(this.data.height) ? `${this.data.height}px` : ''
      }
    },
    inputs() {
      return sortByIndex(Object.entries(this.data.inputs))
    },
    controls() {
      return sortByIndex(Object.entries(this.data.controls))
    },
    outputs() {
      return sortByIndex(Object.entries(this.data.outputs))
    }
  },
  components: {
    Ref,
    CustomNodeToolbar
  }
})
</script>

<style lang="scss" scoped>
@use 'sass:math';

.node {
  background: #fddddd;
  border-radius: 10px;
  cursor: pointer;
  box-sizing: border-box;
  padding-bottom: 6px;
  position: relative;
  user-select: none;

  //   &:hover {
  //     background: #333;
  //   }

  &.selected {
    background: rgb(61, 199, 61);
  }

  .title {
    color: white;
    font-family: sans-serif;
    font-size: 14px;
    padding: 8px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }

  .output-wrapper {
    position: absolute;
    top: 0;
    right: -15%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .input-wrapper {
    position: absolute;
    top: 0;
    left: -15%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .output-socket {
    text-align: right;
    margin-right: -1px;
    display: inline-block;
  }

  .input-socket {
    text-align: left;
    margin-left: -1px;
    display: inline-block;
  }

  .input-title,
  .output-title {
    vertical-align: middle;
    color: white;
    display: inline-block;
    font-family: sans-serif;
    font-size: 14px;
    margin: 6px;
    line-height: 16px;
  }

  .input-control {
    z-index: 1;
    width: calc(100% - #{16px + 2 * 6px});
    vertical-align: middle;
    display: inline-block;
  }

  .control {
    padding: 6px math.div(16px, 2) + 6px;
  }
}
</style>
