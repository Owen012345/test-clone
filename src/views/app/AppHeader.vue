<template>
  <div class="top-bar">
    <div class="rectangle" />
    <div class="title">Workflow Designer</div>
    <div class="navigation">
      <div @click="routeTo(route.path)" v-for="route in routes" :key="route.name" class="tab">
        {{ route.meta.title }}
      </div>
    </div>
  </div>
</template>

<script>
import { protectedRoute as routes } from '@/utils/router/menu'
export default {
  name: 'TopBar',
  computed: {
    routes() {
      return routes[0].children
    }
  },
  methods: {
    routeTo(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>
.top-bar {
  align-items: center;
  background-color: #ffffff;
  display: flex;
  gap: 20px;
  justify-content: center;
  padding: 20px;
  position: relative;
  width: 100%;
  height: 80px;
  min-height: 80px;
}

.top-bar .rectangle {
  background-color: #0000001a;
  border-radius: 100px;
  height: 40px;
  position: relative;
  width: 40px;
}

.top-bar .title {
  color: #000000;
  flex: 1;
  font-family: 'Roboto-Medium', Helvetica;
  font-size: 28px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 36px;
  position: relative;
}

.top-bar .navigation {
  align-items: center;
  background-color: #ffffff;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 40px;
  justify-content: center;
  position: relative;
}

.top-bar .tab {
  color: #000000;
  font-family: 'Roboto-Regular', Helvetica;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 24px;
  margin-top: -1px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
  cursor: pointer;
}
</style>
