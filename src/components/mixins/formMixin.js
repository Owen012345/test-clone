import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    selectedNodeId: {
      type: String
    }
  },
  data() {
    return {
      formData: {}
    }
  },
  methods: {
    ...mapActions('nodeDetail', {
      updateFormData: 'updateFormData'
    }),
    updateSelectedItem(section, type, value) {
      this.selectedItems[section][type] = value
    },
    settingFormUpdate() {
      this.updateFormData({ nodeId: this.selectedNodeId, formData: this.formData })
    },
    settingFormReset() {
      this.formData = { ...this.initFormData }
    },
    validateRequired(field, value) {
      if (this.getSchemaRequiredFields.includes(field)) {
        return !!value || `${field} field is required`
      }
      return true
    }
  },
  watch: {
    // 자동 저장
    // formData: {
    //   handler(newVal) {
    //     this.updateFormData({ nodeId: this.selectedNodeId, formData: newVal })
    //   },
    //   deep: true
    // },
    selectedNodeId: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.formData = { ...this.initFormData }
        }
      }
    }
  },
  mounted() {
    this.formData = { ...this.initFormData }
  },
  computed: {
    ...mapGetters('nodeDetail', {
      getInitSettingNodeSchema: 'getInitSettingNodeSchema',
      getDefaultSettingNodeSchema: 'getDefaultSettingNodeSchema'
    }),
    initFormData() {
      return this.getDefaultSettingNodeSchema(this.selectedNodeId)
    },
    schema() {
      return this.getInitSettingNodeSchema(this.selectedNodeId)
    },
    getSchemaRequiredFields() {
      return this.getInitSettingNodeSchema(this.selectedNodeId).required
    }
  }
}
