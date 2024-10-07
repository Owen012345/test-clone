<template>
  <v-container fluid>
    <v-form ref="form">
      <CustomCard title="Output Storage Settings" v-if="Object.keys(formData).length > 0">
        <CustomCard v-for="(item, key) in Object.keys(formData)" :key="key">
          <span>{{ item }} Storage</span>
          <v-radio-group
            v-model="formData[item]['type']"
            inline
            @update:modelValue="(value) => handleStorageTypeChange(value, item)"
          >
            <v-radio v-for="(item, index) in storageType" :key="index" :label="item" :value="item">
            </v-radio>
          </v-radio-group>
          <CustomCard v-if="formData[item]['type'] === 's3'">
            <span>aws_access_key_id</span>
            <v-text-field
              v-model="formData[item]['aws_access_key_id']"
              :rules="[(v) => validateRequired('aws_access_key_id', v)]"
            ></v-text-field>
            <span>aws_secret_access_key</span>
            <v-text-field
              v-model="formData[item]['aws_secret_access_key']"
              :rules="[(v) => validateRequired('aws_secret_access_key', v)]"
            ></v-text-field>
            <span>bucket_name</span>
            <v-text-field
              v-model="formData[item]['bucket_name']"
              :rules="[(v) => validateRequired('bucket_name', v)]"
            ></v-text-field>
            <span>prefix</span>
            <v-text-field
              v-model="formData[item]['prefix']"
              :rules="[(v) => validateRequired('prefix', v)]"
            ></v-text-field>
          </CustomCard>
        </CustomCard>
      </CustomCard>
    </v-form>
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
      type: Object
    }
  },
  computed: {
    ...mapGetters('nodeDetail', {
      getInitStorageNodeSchema: 'getInitStorageNodeSchema',
      getNodeOutputStorage: 'getNodeOutputStorage',
      getNodeOuputs: 'getNodeOuputs'
    }),
    initNodeOutputStorage() {
      return this.getNodeOutputStorage(this.selectedNode?.id)
    },
    getStorageSchemaRequiredFields() {
      return this.getInitStorageNodeSchema(this.selectedNode.id).required
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
    validateRequired(field, value) {
      if (this.getStorageSchemaRequiredFields.includes(field)) {
        return !!value || `${field} field is required`
      }
      return true
    },
    async handleStorageTypeChange(type, outputKey) {
      await this.updateNodeStorageOutputType({
        id: this.selectedNode.id,
        outputKey: outputKey,
        type: type
      })
      this.formData = JSON.parse(JSON.stringify(this.initNodeOutputStorage))
    },
    validate() {
      return this.$refs.form.validate()
    },
    storageFormUpdate() {
      this.updateNodeStorageOuputForm({
        id: this.selectedNode.id,
        formData: this.formData
      })
    },
    storageFormReset() {
      this.formData = JSON.parse(JSON.stringify(this.initNodeOutputStorage))
    }
  },
  watch: {
    'selectedNode.id': {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          if (this.initNodeOutputStorage) {
            this.formData = JSON.parse(JSON.stringify(this.initNodeOutputStorage))
          }
        }
      }
    }
  },

  mounted() {
    if (this.initNodeOutputStorage) {
      this.formData = JSON.parse(JSON.stringify(this.initNodeOutputStorage))
    }
  }
}
</script>

<style></style>
