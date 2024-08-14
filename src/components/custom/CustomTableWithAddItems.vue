<template lang="">
  <v-btn @click="addItems">add</v-btn>
  <v-btn @click="removeSelected">remove</v-btn>
  <v-btn @click="removeAll">remove all</v-btn>
  <v-table>
    <thead>
      <tr>
        <th :id="item" class="text-left" v-for="(item, idx) in headers" :key="idx">
          {{ item }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in modelValue"
        :key="index"
        :class="{ 'selected-row': selectedRow === index }"
        @click="selectRow(index)"
      >
        <td>{{ item.column }}</td>
        <td>{{ item.function }}</td>
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
    selectedItem: {
      type: Object
    },
    modelValue: {
      type: Object
    }
  },
  data() {
    return {
      selectedRow: null,
      localSelected: []
    }
  },
  computed: {},
  methods: {
    addItems() {
      const item = this.selectedItem
      this.localSelected = [...this.localSelected, item]
    },
    selectRow(index) {
      if (this.selectedRow === index) {
        this.selectedRow = null
      } else {
        this.selectedRow = index
      }
    },
    removeSelected() {
      if (this.selectedRow !== null) {
        this.localSelected.splice(this.selectedRow, 1)
        this.selectedRow = null
      }
    },
    removeAll() {
      this.localSelected = []
    }
  },
  watch: {
    localSelected(newValue) {
      this.$emit('update:modelValue', newValue)
    }
  }
}
</script>
<style lang=""></style>
