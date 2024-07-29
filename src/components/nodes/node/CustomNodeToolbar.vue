<template>
  <div class="node-status">
    <div :class="['circle', readyClass]"></div>
    <div :class="['circle', inProgressClass]"></div>
    <div :class="['circle', resultClass]"></div>
  </div>
</template>

<script>
export default {
  name: 'nodeStatus',
  props: {
    status: {
      type: String,
      default: 'ready'
    }
  },
  computed: {
    readyClass() {
      return this.status === 'ready' ? 'red' : 'grey'
    },
    inProgressClass() {
      return this.status === 'inProgress' ? 'yellow' : 'grey'
    },
    resultClass() {
      if (this.status === 'success') {
        return 'green'
      } else if (this.status === 'failed') {
        return 'red'
      }
      return 'grey'
    }
  }
}
</script>

<style scoped>
.node-status {
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 0 5px;
}

.grey {
  background-color: grey; /* 기본 색상 */
}

.red {
  background-color: red;
}

.yellow {
  background-color: yellow;
}

.green {
  background-color: green;
}
</style>
