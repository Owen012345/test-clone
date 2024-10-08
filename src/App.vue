<template>
  <AppHeader />
  <div id="main-wrapper">
    <RouterView />
  </div>
</template>
<script>
import AppHeader from '@/views/app/AppHeader.vue'

export default {
  name: 'App',
  components: {
    AppHeader
  }
}
</script>
<style scoped>
#main-wrapper {
  /* padding-top: 80px; */
  padding-bottom: 0px;
  max-height: calc(100% - 80px);
  height: 100%;
  overflow-y: auto;
}
</style>
