<template>
  <v-text-field
    v-model="searchQuery"
    label="Search"
    clearable
    @input="onInput"
    @click:clear="clearSearch"
  ></v-text-field>
</template>

<script>
export default {
  props: {
    search: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      searchQuery: this.search // 초기 검색어 값 설정
    }
  },
  methods: {
    onInput() {
      this.$emit('update:search', this.searchQuery) // 검색어 변경 시 상위 컴포넌트로 emit
    },
    clearSearch() {
      this.searchQuery = ''
      this.onInput()
    }
  }
}
</script>

<style scoped></style>
