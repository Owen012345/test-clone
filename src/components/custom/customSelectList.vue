<template lang="">
  <v-select hide-details v-model="localSelected" :items="items" multiple></v-select>
  <div>
    <v-btn @click="removeSelectedItems">제거</v-btn>
    <v-btn @click="removeAll">전체 제거</v-btn>
  </div>
  <div>
    <v-list class="table-list">
      <v-list-item
        v-for="(item, index) in localSelected"
        :key="index"
        :class="['table-row', { 'selected-item': isSelected(item) }]"
        @click="toggleItemSelection(item)"
      >
        <v-list-item class="table-cell">
          {{ item }}
        </v-list-item>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'CustomSelectList',
  props: {
    modelValue: {
      type: Array
    },
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedItems: []
    }
  },
  computed: {
    localSelected: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  },
  methods: {
    removeSelectedItems() {
      this.localSelected = this.localSelected.filter((item) => !this.selectedItems.includes(item))
      this.selectedItems = []
    },
    removeAll() {
      this.localSelected = []
      this.selectedItems = []
    },
    toggleItemSelection(item) {
      const index = this.selectedItems.indexOf(item)
      if (index > -1) {
        this.selectedItems.splice(index, 1)
      } else {
        this.selectedItems.push(item)
      }
    },
    isSelected(item) {
      return this.selectedItems.includes(item)
    }
  }
}
</script>

<style scoped>
.table-list {
  display: table;
  width: 100%;
  border-collapse: collapse;
}

.table-row {
  display: table-row;
  cursor: pointer;
}

.table-cell {
  padding: 8px;
  border: 1px solid #ddd;
}

.selected-item {
  background-color: lightgrey;
}

.table-row:hover {
  background-color: #f1f1f1;
}
</style>
