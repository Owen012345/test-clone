<template>
  <v-text-field
    rounded="xl"
    v-model="searchQuery"
    label="Search"
    clearable
    variant="outlined"
    append-inner-icon="mdi-magnify"
    single-line
    @click:clear="clearSearch"
    @click:append-inner="onClick"
    class="search-field"
    max-width="400"
    dense
  ></v-text-field>
</template>

<script>
export default {
  props: {
    search: {
      type: String,
      required: true
    },
    emitOnChange: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      searchQuery: this.search
    }
  },
  methods: {
    onClick() {
      if (this.emitOnChange) {
        this.$emit('update:search', this.searchQuery)
      }
    },
    clearSearch() {
      this.searchQuery = ''
      this.onClick()
    }
  }
}
</script>

<style lang="scss" scoped></style>
