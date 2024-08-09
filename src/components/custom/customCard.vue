<template>
  <v-card :flat="flat" :elevation="elevation">
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'CustomCard',
  props: {
    title: {
      type: String,
      required: true
    },
    flat: {
      type: Boolean,
      default: false
    },
    elevation: {
      type: [Number, String],
      default: 0
    }
  }
}
</script>

<style scoped></style>
