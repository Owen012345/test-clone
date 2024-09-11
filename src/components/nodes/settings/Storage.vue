<template>
  <v-container fluid>
    <CustomCard title="Output Storage Settings" v-if="Object.keys(formData).length > 0">
      <CustomCard v-for="(item, key) in Object.keys(formData)" :key="key">
        <span>{{ item }} Storage</span>
        <v-radio-group
          v-model="formData[item]['type']"
          inline
          hide-details
          @update:modelValue="(value) => handleStorageTypeChange(value, item)"
        >
          <v-radio
            v-for="(item, index) in storageType"
            :key="index"
            :label="item"
            :value="item"
            hide-details
          >
          </v-radio>
        </v-radio-group>
        <CustomCard v-if="formData[item]['type'] === 's3'">
          <span>aws_access_key_id</span>
          <v-text-field hide-details v-model="formData[item]['aws_access_key_id']"></v-text-field>
          <span>aws_secret_access_key</span>
          <v-text-field
            hide-details
            v-model="formData[item]['aws_secret_access_key']"
          ></v-text-field>
          <span>bucket_name</span>
          <v-text-field hide-details v-model="formData[item]['bucket_name']"></v-text-field>
          <span>prefix</span>
          <v-text-field hide-details v-model="formData[item]['prefix']"></v-text-field>
        </CustomCard>
      </CustomCard>
    </CustomCard>
  </v-container>
</template>

<script>
import CustomCard from '@/components/custom/CustomCard.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'StorageItems',
  components: {
    CustomCard
  },
  props: {
    selectedNode: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters('nodeDetail', {
      getNodeOutputStorage: 'getNodeOutputStorage',
      getNodeOuputs: 'getNodeOuputs'
    }),
    initNodeOutputStorage() {
      return this.getNodeOutputStorage(this.selectedNode.id)
    }
  },
  data() {
    return {
      formData: {},
      storageType: ['ceph', 'postgres', 's3'],
      selectedStorageType: 'ceph'
    }
  },
  methods: {
    ...mapActions('nodeDetail', {
      updateNodeStorageOutputType: 'updateNodeStorageOutputType',
      updateNodeStorageOuputForm: 'updateNodeStorageOuputForm'
    }),
    handleStorageTypeChange(type, outputKey) {
      this.updateNodeStorageOutputType({
        id: this.selectedNode.id,
        outputKey: outputKey,
        type: type
      })
    }
  },
  watch: {
    formData: {
      handler(newVal) {
        this.updateNodeStorageOuputForm({
          id: this.selectedNode.id,
          formData: newVal
        })
      },
      deep: true
    },
    'selectedNode.id': {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.formData = { ...this.initNodeOutputStorage }
        }
      },
      immediate: true
    }
  },

  mounted() {
    this.formData = { ...this.initNodeOutputStorage }
  }
}
</script>

<style></style>
