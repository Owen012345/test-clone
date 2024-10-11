<template>
  <v-container fluid>
    <CustomCard title="Output Storage Settings" v-if="Object.keys(formData).length > 0">
      <CustomCard v-for="(item, key) in Object.keys(formData)" :key="key">
        <span>{{ item }} Storage</span>
        <v-radio-group
          v-model="formData[item]['type']"
          inline
          @update:modelValue="(type) => handleStorageTypeChange(type, item)"
        >
          <v-radio v-for="(item, index) in storageType" :key="index" :label="item" :value="item">
          </v-radio>
        </v-radio-group>
        <v-form ref="form">
          <CustomCard v-if="formData[item]['type'] === 'ceph'">
            <span>user_name</span>
            <v-text-field
              v-model="formData[item]['user_name']"
              :rules="[(v) => validateRequired('user_name', v, 'ceph')]"
              readonly
            ></v-text-field>
            <span>refresh_token</span>
            <v-text-field
              v-model="formData[item]['refresh_token']"
              :rules="[(v) => validateRequired('refresh_token', v, 'ceph')]"
              readonly
            ></v-text-field>
            <span>end_point</span>
            <v-text-field
              v-model="formData[item]['end_point']"
              :rules="[(v) => validateRequired('end_point', v, 'ceph')]"
              readonly
            ></v-text-field>
            <span>base_url</span>
            <v-text-field
              v-model="formData[item]['base_url']"
              :rules="[(v) => validateRequired('base_url', v, 'ceph')]"
            ></v-text-field>
            <span>bucket_name</span>
            <v-text-field
              v-model="formData[item]['bucket_name']"
              :rules="[(v) => validateRequired('bucket_name', v, 'ceph')]"
            ></v-text-field>
            <span>object_name</span>
            <v-text-field
              v-model="formData[item]['object_name']"
              :rules="[(v) => validateRequired('object_name', v, 'ceph')]"
            ></v-text-field>
          </CustomCard>

          <CustomCard v-if="formData[item]['type'] === 'postgres'">
            <span>user_name</span>
            <v-text-field
              v-model="formData[item]['user_name']"
              :rules="[(v) => validateRequired('user_name', v, 'postgres')]"
              readonly
            ></v-text-field>
            <span>refresh_token</span>
            <v-text-field
              v-model="formData[item]['refresh_token']"
              :rules="[(v) => validateRequired('refresh_token', v, 'postgres')]"
              readonly
            ></v-text-field>
            <span>host</span>
            <v-text-field
              v-model="formData[item]['host']"
              :rules="[(v) => validateRequired('host', v, 'postgres')]"
              readonly
            ></v-text-field>
            <span>base_url</span>
            <v-text-field
              v-model="formData[item]['base_url']"
              :rules="[(v) => validateRequired('base_url', v, 'postgres')]"
            ></v-text-field>
            <span>database_name</span>
            <v-text-field
              v-model="formData[item]['database_name']"
              :rules="[(v) => validateRequired('database_name', v, 'postgres')]"
            ></v-text-field>
            <span>table_name</span>
            <v-text-field
              v-model="formData[item]['table_name']"
              :rules="[(v) => validateRequired('table_name', v, 'postgres')]"
            ></v-text-field>
          </CustomCard>

          <CustomCard v-if="formData[item]['type'] === 's3'">
            <span>aws_access_key_id</span>
            <v-text-field
              v-model="formData[item]['aws_access_key_id']"
              :rules="[(v) => validateRequired('aws_access_key_id', v, 's3')]"
            ></v-text-field>
            <span>aws_secret_access_key</span>
            <v-text-field
              v-model="formData[item]['aws_secret_access_key']"
              :rules="[(v) => validateRequired('aws_secret_access_key', v, 's3')]"
            ></v-text-field>
            <span>bucket_name</span>
            <v-text-field
              v-model="formData[item]['bucket_name']"
              :rules="[(v) => validateRequired('bucket_name', v, 's3')]"
            ></v-text-field>
            <span>prefix</span>
            <v-text-field
              v-model="formData[item]['prefix']"
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
      originalFormData: {}, // 원본 데이터
      formData: {}, // 깊은 복사본
      storageType: ['ceph', 'postgres', 's3'],
      selectedStorageType: 'ceph',
      initStorageForm: null
    }
  },
  methods: {
    ...mapActions('nodeDetail', {
      updateNodeStorageOutputType: 'updateNodeStorageOutputType',
      updateNodeStorageOuputForm: 'updateNodeStorageOuputForm',
      updateNodeStorageOuputTypeTest: 'updateNodeStorageOuputTypeTest'
    }),

    validateRequired(field, value, type) {
      const requiredField = this.getInitStorageSchema(type).required

      if (requiredField?.includes(field)) {
        return !!value || `${field} field is required`
      }
      return true
    },
    async handleStorageTypeChange(type, outputKey) {
      console.log('check1')
      const initStorageForm = await this.updateNodeStorageOuputTypeTest({
        id: this.selectedNode.id,
        outputKey: outputKey,
        type: type
      })

      this.formData[outputKey] = { ...initStorageForm }
    },
    async validate() {
      // $refs.form이 배열인지 체크
      const forms = Array.isArray(this.$refs.form) ? this.$refs.form : [this.$refs.form]

      // 각 form에 대해 validate 호출하고, Promise 배열로 결과 처리
      const validations = forms.map(async (form, index) => {
        const outputKey = `OUTPUT${index}`
        const formData = this.formData[outputKey]

        // formData가 빈 객체일 경우(초기 상태) 무조건 true 반환
        if (!formData || Object.keys(formData).length === 0) {
          console.log('check1')
          return true
        }

        // form이 존재하고 validate 메서드가 있을 경우만 호출
        if (form && typeof form.validate === 'function') {
          const { valid } = await form.validate()
          return valid
        }

        return false // validate 메서드가 없으면 false 처리
      })

      // 모든 Promise가 resolve될 때까지 기다리고, 그 결과로 true/false 반환
      const results = await Promise.all(validations)
      const allValid = results.every((result) => result === true)

      console.log(allValid)
      return allValid
    },

    storageFormUpdate() {
      this.updateNodeStorageOuputForm({
        id: this.selectedNode.id,
        formData: this.formData
      })
    },
    storageFormReset() {
      const newData = this.getNodeOutputStorage(this.selectedNode?.id)
      console.log(newData)
      this.formData = JSON.parse(JSON.stringify(newData)) // 깊은 복사본으로 업데이트
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
    // if (this.initNodeOutputStorage) {
    //   this.originalFormData = JSON.parse(JSON.stringify(this.initNodeOutputStorage))
    //   this.formData = JSON.parse(JSON.stringify(this.originalFormData)) // 깊은 복사본
    // }
  }
}
</script>

<style></style>
