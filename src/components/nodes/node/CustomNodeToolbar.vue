<template>
  <div class="node-status">
    <div :class="['circle', 'grey']"></div>
    <div :class="['circle', inProgressClass]"></div>
    <div :class="['circle', resultClass]"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'nodeStatus',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      status: 'null'
    }
  },
  computed: {
    ...mapGetters('nodeDetail', {
      getNodeStatus: 'getNodeStatus'
    }),
    getNodeStatusById() {
      return this.getNodeStatus(this.id) || 'unknown'
    },
    readyClass() {
      return this.status === null
    },
    inProgressClass() {
      return this.status === 'ready' ? 'yellow' : 'grey'
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
