<template lang="">
  <v-btn @click="addItem">add</v-btn>
  <v-table>
    <thead>
      <tr>
        <th :id="item" class="text-left" v-for="(item, idx) in headers" :key="idx">{{ item }}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td></td>
      </tr>
    </tbody>
  </v-table>
</template>
<script>
export default {
  name: 'customTableWithSelectedItems',
  props: {
    headers: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    modelValue: {
      type: Array
    }
  },
  computed: {
    tableRowKey() {
      return this.modelValue[0]
    }
  },
  methods: {
    addItem() {
      this.$emit('update:modelValue', [...this.modelValue, { column: '', function: '' }])
    },
    removeItem(index) {
      const updatedItems = this.modelValue.filter((_, i) => i !== index)
      this.$emit('update:modelValue', updatedItems)
    }
  }
}
</script>
<style lang=""></style>
