<template lang="">
  <v-container fluid>
    <CustomCard title="Sort by">
      <v-row>
        <v-col>
          <v-select
            @update:modelValue="updateSelectedItem('sort', 'column', $event)"
            :items="[]"
            v-model="formData.columnArray"
            hide-details
          ></v-select>
        </v-col>
        <v-col cols="auto"><span>sorting type</span></v-col>
        <v-col>
          <v-radio-group
            @update:modelValue="updateSelectedItem('sort', 'sortingType', $event)"
            v-model="formData.sortByEnum"
            inline
            hide-details
          >
            <v-radio
              v-for="(item, index) in schema.properties.sortByEnum.enum"
              :key="index"
              :label="item"
              :value="item"
            >
            </v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <CustomTableWithAddItems
        :headers="['column', 'sorting type']"
        :selectedItem="selectedItems.sort"
        v-model="formData.sortByArrayObject"
      ></CustomTableWithAddItems>
    </CustomCard>
  </v-container>
</template>
<script>
import CustomCard from '@/components/custom/CustomCard.vue'
import formMixin from '@/components/mixins/formMixin'
import CustomTableWithAddItems from '@/components/custom/CustomTableWithAddItems.vue'
export default {
  name: 'C3_N05',
  components: {
    CustomCard,
    CustomTableWithAddItems
  },
  mixins: [formMixin],
  data() {
    return {
      selectedItems: {
        sort: {
          column: '',
          sortingType: ''
        }
      }
    }
  }
}
</script>
<style scoped>
.selected-row {
  background-color: lightgray;
}
</style>
