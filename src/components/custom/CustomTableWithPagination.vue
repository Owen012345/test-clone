<template>
  <div style="width: 100%">
    <table>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in paginatedData" :key="row.name">
          <td v-for="key in Object.keys(row)" :key="key">{{ row[key] }}</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        :class="{ disabled: currentPage === 1 }"
        class="pagination-button"
      >
        <v-icon>mdi-arrow-left</v-icon>
        <span>Previous</span>
      </button>
      <button
        v-for="page in filteredPaginationPages"
        :key="page"
        @click="goToPage(page)"
        :class="{ active: currentPage === page, ellipsis: page === '...' }"
        :disabled="page === '...'"
      >
        {{ page }}
      </button>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        :class="{ disabled: currentPage === totalPages }"
        class="pagination-button"
      >
        <span>Next</span>
        <v-icon>mdi-arrow-right</v-icon>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    search: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 10
    }
  },
  computed: {
    filteredData() {
      const searchLower = this.search.toLowerCase()
      return this.data.filter((item) => item.name.toLowerCase().includes(searchLower))
    },
    totalPages() {
      return Math.ceil(this.filteredData.length / this.itemsPerPage)
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredData.slice(start, end)
    },
    paginationPages() {
      if (this.totalPages <= 6) {
        return Array.from({ length: this.totalPages }, (_, i) => i + 1)
      }
      if (this.currentPage <= 3) {
        return [1, 2, 3, 4, '...', this.totalPages]
      }
      if (this.currentPage >= this.totalPages - 2) {
        return [
          1,
          '...',
          this.totalPages - 3,
          this.totalPages - 2,
          this.totalPages - 1,
          this.totalPages
        ]
      }
      return [
        1,
        '...',
        this.currentPage - 1,
        this.currentPage,
        this.currentPage + 1,
        '...',
        this.totalPages
      ]
    },
    filteredPaginationPages() {
      return this.paginationPages.filter((page) => page)
    }
  },
  watch: {
    search() {
      this.currentPage = 1 // 검색어가 변경될 때 페이지를 첫 페이지로 이동
    },
    totalPages() {
      // 현재 페이지가 totalPages보다 클 경우 현재 페이지를 1로 설정
      if (this.currentPage >= this.totalPages) {
        this.currentPage = 1
      }
    }
  },
  methods: {
    goToPage(page) {
      if (page !== '...') {
        this.currentPage = page
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage += 1
      }
    }
  }
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background-color: #f0f0f0;
  text-align: left;
  border: 1px solid #b9b9b9;
  padding: 8px;
  width: auto;
  flex: 1;
}

td {
  border: 1px solid #b9b9b9;
  padding: 8px;
  text-align: left;
}

.pagination {
  margin-top: 10px;
  display: flex;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 1.85rem;
}

.pagination-button {
  display: flex; /* Flexbox 사용 */
  align-items: center; /* 수직 중앙 정렬 */
  padding: 5px 10px; /* 패딩 추가 */
}

.pagination-button .v-icon {
  margin: 0 5px; /* 좌우 여백 추가 */
  padding-top: 3px;
  width: 10px;
}

button {
  margin: 0 2px;
  padding: 5px 10px;
  cursor: pointer;
}

button.active {
  background-color: black;
  color: white;
}

button.disabled {
  color: #ccc;
  cursor: not-allowed;
}

button.ellipsis {
  pointer-events: none;
  cursor: default;
}
</style>
