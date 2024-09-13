<template>
  <v-sheet>
    <v-row justify="center">
      <!-- 전체 목록 (왼쪽) -->
      <v-col cols="4">
        <span>{{ leftHeader }}</span>
        <v-list class="list-wrapper">
          <v-list-item
            v-for="(item, index) in availableItems"
            :key="index"
            :class="['list-row', { 'selected-item': isSelected(item) }]"
            @click="toggleItemSelection(item, 'exclude')"
          >
            <v-list-item class="table-cell">
              {{ item }}
            </v-list-item>
          </v-list-item>
        </v-list>
      </v-col>

      <!-- 이동 버튼들 -->
      <v-col cols="2" class="text-center d-flex flex-column justify-center align-center">
        <v-btn @click="moveSelectedItemsTo('include')">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
        <v-btn @click="moveAllItemsTo('include')">
          <v-icon>mdi-chevron-double-right</v-icon>
        </v-btn>
        <v-btn @click="moveSelectedItemsTo('exclude')">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn @click="moveAllItemsTo('exclude')">
          <v-icon>mdi-chevron-double-left</v-icon>
        </v-btn>
      </v-col>

      <!-- 선택된 목록 (오른쪽) -->
      <v-col cols="4">
        <span>{{ rightHeader }}</span>
        <v-list class="list-wrapper">
          <v-list-item
            v-for="(item, index) in includedItems"
            :key="index"
            :class="['list-row', { 'selected-item': isSelected(item) }]"
            @click="toggleItemSelection(item, 'include')"
          >
            <v-list-item class="table-cell">
              {{ item }}
            </v-list-item>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
export default {
  name: 'CustomSelectList',
  props: {
    leftHeader: {
      type: String,
      default: ''
    },
    rightHeader: {
      type: String,
      default: ''
    },
    modelValue: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedItems: [],
      localSelected: []
    }
  },
  computed: {
    availableItems() {
      return this.items.filter((item) => !this.modelValue.includes(item))
    },
    includedItems() {
      return this.modelValue
    }
  },
  methods: {
    moveSelectedItemsTo(destination) {
      const itemsToMove = this.selectedItems
      if (destination === 'include') {
        this.localSelected = [...this.localSelected, ...itemsToMove]
        this.selectedItems = []
      } else if (destination === 'exclude') {
        this.localSelected = this.localSelected.filter((item) => !itemsToMove.includes(item))
        this.selectedItems = []
      }
    },
    moveAllItemsTo(destination) {
      if (destination === 'include') {
        this.localSelected = [...this.localSelected, ...this.availableItems]
      } else if (destination === 'exclude') {
        this.localSelected = []
      }
    },
    toggleItemSelection(item, list) {
      if (list === 'exclude' || list === 'include') {
        const index = this.selectedItems.indexOf(item)
        if (index > -1) {
          this.selectedItems.splice(index, 1)
        } else {
          this.selectedItems.push(item)
        }
      }
    },
    isSelected(item) {
      return this.selectedItems.includes(item)
    }
  },
  watch: {
    localSelected(newValue) {
      this.$emit('update:modelValue', newValue)
    }
  }
}
</script>

<style scoped>
.list-wrapper {
  max-height: 200px;
}

.list-row {
  border: 1px solid lightgray;
}

.selected-item {
  background-color: lightgrey;
}

.table-row:hover {
  background-color: #f1f1f1;
}
</style>
