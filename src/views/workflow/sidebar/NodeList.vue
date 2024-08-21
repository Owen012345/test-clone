<template>
  <div class="sidebar">
    <v-text-field
      v-model="search"
      label="Search"
      clearable
      @input="filterItems"
      @click:clear="clearSearch"
    ></v-text-field>
    <v-expansion-panels v-model="expandedPanels">
      <v-expansion-panel v-for="(group, index) in filteredData" :key="index">
        <v-expansion-panel-title>{{ group.name }}</v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-container fluid>
            <v-row>
              <v-col v-for="item in group.items" :key="item.id" cols="6">
                <v-list-item
                  draggable="true"
                  @dragstart="(e) => onDragStart(e, item)"
                  class="small-text"
                >
                  {{ item.label }}
                </v-list-item>
              </v-col>
            </v-row>
          </v-container>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import NodeList from '@/assets/nodes.json'
export default {
  name: 'NodeList',
  data() {
    return {
      search: '',
      expandedPanels: [],
      filteredData: []
    }
  },
  computed: {
    jsonData() {
      return NodeList
    }
  },
  methods: {
    clearSearch() {
      this.search = ''
      this.filterItems()
    },
    filterItems() {
      if (!this.search) {
        this.filteredData = Object.keys(this.jsonData).map((key) => ({
          name: key,
          items: this.jsonData[key].map((item) => ({
            ...item,
            group: key
          }))
        }))
        this.expandedPanels = []
        return
      }

      const searchLower = this.search.toLowerCase()
      this.filteredData = Object.keys(this.jsonData)
        .map((key) => ({
          name: key,
          items: this.jsonData[key]
            .filter((item) => item.label.toLowerCase().includes(searchLower))
            .map((item) => ({
              ...item,
              group: key
            }))
        }))
        .filter((group) => group.items.length > 0)

      this.expandedPanels = this.filteredData.map((_, index) => index)
    },
    onDragStart(e, node) {
      e.dataTransfer.setData('node', JSON.stringify(node))
    }
  },
  created() {
    this.filterItems()
  }
}
</script>

<style>
.sidebar {
  background-color: #f4f4f4;
  padding: 10px;
  overflow-y: auto;
}
.node {
  margin: 5px 0;
  padding: 10px;
  background-color: #ddd;
  cursor: grab;
}
</style>
