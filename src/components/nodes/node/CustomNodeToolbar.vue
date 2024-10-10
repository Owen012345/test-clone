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
    },
    store: {}
  },
  data() {
    return {
      status: 'init'
    }
  },
  computed: {
    ...mapGetters('nodeDetail', {
      getNodeStatus: 'getNodeStatus'
    }),
    getNodeStatusById() {
      const status = this.store.getters['nodeDetail/getNodeStatus'](this.id)
      if (status) {
        return this.store.getters['nodeDetail/getNodeStatus'](this.id) // getters 접근
      } else return 'init'
    },
    readyClass() {
      return this.getNodeStatusById === 'init'
    },
    inProgressClass() {
      return this.getNodeStatusById === 'ready' ? 'yellow' : 'grey'
    },
    resultClass() {
      if (this.getNodeStatusById === 'success') {
        return 'green'
      } else if (this.getNodeStatusById === 'failed') {
        return 'red'
      }
      return 'grey'
    }
  },
  mounted() {
    // console.log('check1')
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
