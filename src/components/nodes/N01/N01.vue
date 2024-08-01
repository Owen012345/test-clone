<template lang="">
  <div>{{ selectedTab }}</div>
  <JsonForms />
</template>
<script>
import JsonForms from '@/components/jsonforms/index.vue'
export default {
  name: 'N01-Default',
  props: {
    selectedTab: {
      type: String
    }
  },
  components: {
    JsonForms
  }
}
</script>
<style lang=""></style>
