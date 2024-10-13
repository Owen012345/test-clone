<template>
  <v-container fluid>
    <CustomCard title="Output Storage Settings" v-if="Object.keys(tempFormData).length > 0">
      <CustomCard v-for="(item, key) in Object.keys(tempFormData)" :key="key">
        <span>{{ item }} Storage</span>
        <v-radio-group
          v-model="tempFormData[item]['type']"
          inline
          @update:modelValue="(type) => handleStorageTypeChange(type, item)"
        >
          <v-radio
            v-for="(storage, index) in storageType"
            :key="index"
            :label="storage"
            :value="storage"
          >
          </v-radio>
        </v-radio-group>
        <v-form ref="form">
          <CustomCard v-if="tempFormData[item]['type'] === 'ceph'">
            <span>user_name</span>
            <v-text-field
              v-model="tempFormData[item]['user_name']"
              :rules="[(v) => validateRequired('user_name', v, 'ceph')]"
              readonly
            ></v-text-field>
            <span>refresh_token</span>
            <v-text-field
              v-model="tempFormData[item]['refresh_token']"
              :rules="[(v) => validateRequired('refresh_token', v, 'ceph')]"
              readonly
            ></v-text-field>
            <span>end_point</span>
            <v-text-field
              v-model="tempFormData[item]['end_point']"
              :rules="[(v) => validateRequired('end_point', v, 'ceph')]"
              readonly
            ></v-text-field>
            <span>base_url</span>
            <v-text-field
              v-model="tempFormData[item]['base_url']"
              :rules="[(v) => validateRequired('base_url', v, 'ceph')]"
            ></v-text-field>
            <span>bucket_name</span>
            <v-text-field
              v-model="tempFormData[item]['bucket_name']"
              :rules="[(v) => validateRequired('bucket_name', v, 'ceph')]"
            ></v-text-field>
            <span>object_name</span>
            <v-text-field
              v-model="tempFormData[item]['object_name']"
              :rules="[(v) => validateRequired('object_name', v, 'ceph')]"
            ></v-text-field>
          </CustomCard>

          <CustomCard v-if="tempFormData[item]['type'] === 'postgres'">
            <span>user_name</span>
            <v-text-field
              v-model="tempFormData[item]['user_name']"
              :rules="[(v) => validateRequired('user_name', v, 'postgres')]"
              readonly
            ></v-text-field>
            <span>refresh_token</span>
            <v-text-field
              v-model="tempFormData[item]['refresh_token']"
              :rules="[(v) => validateRequired('refresh_token', v, 'postgres')]"
              readonly
            ></v-text-field>
            <span>host</span>
            <v-text-field
              v-model="tempFormData[item]['host']"
              :rules="[(v) => validateRequired('host', v, 'postgres')]"
              readonly
            ></v-text-field>
            <span>base_url</span>
            <v-text-field
              v-model="tempFormData[item]['base_url']"
              :rules="[(v) => validateRequired('base_url', v, 'postgres')]"
            ></v-text-field>
            <span>database_name</span>
            <v-text-field
              v-model="tempFormData[item]['database_name']"
              :rules="[(v) => validateRequired('database_name', v, 'postgres')]"
            ></v-text-field>
            <span>table_name</span>
            <v-text-field
              v-model="tempFormData[item]['table_name']"
              :rules="[(v) => validateRequired('table_name', v, 'postgres')]"
            ></v-text-field>
          </CustomCard>

          <CustomCard v-if="tempFormData[item]['type'] === 's3'">
            <span>aws_access_key_id</span>
            <v-text-field
              v-model="tempFormData[item]['aws_access_key_id']"
              :rules="[(v) => validateRequired('aws_access_key_id', v, 's3')]"
            ></v-text-field>
            <span>aws_secret_access_key</span>
            <v-text-field
              v-model="tempFormData[item]['aws_secret_access_key']"
              :rules="[(v) => validateRequired('aws_secret_access_key', v, 's3')]"
            ></v-text-field>
            <span>bucket_name</span>
            <v-text-field
              v-model="tempFormData[item]['bucket_name']"
              :rules="[(v) => validateRequired('bucket_name', v, 's3')]"
            ></v-text-field>
            <span>prefix</span>
            <v-text-field
              v-model="tempFormData[item]['prefix']"
              :rules="[(v) => validateRequired('prefix', v, 's3')]"
            ></v-text-field>
          </CustomCard>
        </v-form>
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
      type: Object
    }
  },
  computed: {
    ...mapGetters('nodeDetail', {
      getInitStorageSchema: 'getInitStorageSchema',
      getInitStorageNodeSchema: 'getInitStorageNodeSchema',
      getNodeOutputStorage: 'getNodeOutputStorage',
      getNodeOuputs: 'getNodeOuputs'
    }),
    initNodeOutputStorage() {
      return this.getNodeOutputStorage(this.selectedNode?.id)
    }
  },
  data() {
    return {
      formData: {},
      tempFormData: {},
      storageType: ['ceph', 'postgres', 's3'],
      selectedStorageType: 'ceph',
      initStorageForm: null
    }
  },
  methods: {
    ...mapActions('nodeDetail', {
      updateNodeStorageOutputType: 'updateNodeStorageOutputType',
      updateNodeStorageOuputForm: 'updateNodeStorageOuputForm'
    }),

    validateRequired(field, value, type) {
      const requiredField = this.getInitStorageSchema(type).required

      if (requiredField?.includes(field)) {
        return !!value || `${field} field is required`
      }
      return true
    },
    async handleStorageTypeChange(type, outputKey) {
      const initStorageForm = await this.updateNodeStorageOutputType({
        id: this.selectedNode.id,
        outputKey: outputKey,
        type: type
      })

      this.tempFormData[outputKey] = { ...initStorageForm } // tempFormData에 업데이트

      await this.validate()
    },
    async validate() {
      const forms = Array.isArray(this.$refs.form) ? this.$refs.form : [this.$refs.form]

      const validations = forms.map(async (form, index) => {
        const outputKey = `OUTPUT${index}`
        const formData = this.tempFormData[outputKey] // tempFormData로 변경

        if (!formData || Object.keys(formData).length === 0) {
          return true
        }

        if (form && typeof form.validate === 'function') {
          const { valid } = await form.validate()
          return valid
        }
      })

      const results = await Promise.all(validations)
      const allValid = results.every((result) => result === true)

      return allValid
    },

    storageFormUpdate() {
      this.formData = JSON.parse(JSON.stringify(this.tempFormData))
      this.updateNodeStorageOuputForm({
        id: this.selectedNode.id,
        formData: this.formData
      })
    },
    async storageFormReset() {
      const newData = this.getNodeOutputStorage(this.selectedNode?.id)
      this.tempFormData = JSON.parse(JSON.stringify(newData))

      this.$nextTick(async () => {
        await this.validate()
      })
    }
  },
  watch: {
    'selectedNode.id': {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          if (this.initNodeOutputStorage) {
            this.tempFormData = JSON.parse(JSON.stringify(this.initNodeOutputStorage))

            this.$nextTick(async () => {
              await this.validate()
            })
          }
        }
      }
    }
  },

  mounted() {}
}
</script>

<style></style>
