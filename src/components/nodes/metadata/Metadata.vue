<template lang="">
  <v-container fluid>
    <CustomCard title="docker repo address">
      {{ selectedNode }}
    </CustomCard>
  </v-container>
</template>
<script>
import CustomCard from '@/components/custom/CustomCard.vue'
export default {
  name: 'MetadataItem',
  components: {
    CustomCard
  },
  props: {
    selectedNode: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang=""></style>
