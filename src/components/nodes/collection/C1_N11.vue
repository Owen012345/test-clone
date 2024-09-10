<template lang="">
  <v-container fluid>
    <CustomCard title="Select the Columns to Write">
      <CustomSelectList
        :leftHeader="'Excludes'"
        :rightHeader="'Includes'"
        v-model="formData.columnSelectionArray"
        :items="[]"
      >
      </CustomSelectList>
    </CustomCard>

    <CustomCard title="Write DB Config">
      <span>hostname(IP)</span>
      <v-text-field hide-details v-model="formData.hostname"></v-text-field>
      <span>port</span>
      <v-text-field hide-details v-model="formData.port"></v-text-field>
      <span>database name</span>
      <v-text-field hide-details v-model="formData.databaseName"></v-text-field>

      <span>Authentication</span>
      <v-row>
        <v-col auto>username</v-col>
        <v-col>
          <v-text-field hide-details v-model="formData.authUsername"></v-text-field>
        </v-col>
        <v-col auto>password</v-col>
        <v-col>
          <v-text-field hide-details v-model="formData.authPassword"></v-text-field>
        </v-col>
      </v-row>
    </CustomCard>

    <CustomCard title="Existing table handling">
      <v-radio-group v-model="formData.existedTableEnum" inline>
        <v-radio
          v-for="(item, index) in schema.properties.existedTableEnum.enum"
          :key="index"
          :label="item"
          :value="item"
        >
        </v-radio>
      </v-radio-group>
    </CustomCard>
  </v-container>
</template>

<script>
import CustomCard from '@/components/custom/CustomCard.vue'
import CustomSelectList from '@/components/custom/CustomSelectList.vue'
import formMixin from '@/components/mixins/formMixin'

export default {
  name: 'C1_N11',
  components: {
    CustomCard,
    CustomSelectList
  },
  mixins: [formMixin]
}
</script>

<style lang=""></style>
