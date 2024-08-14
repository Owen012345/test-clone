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
    })
  },
  watch: {
    formData: {
      handler(newVal) {
        this.updateFormData({ nodeId: this.selectedNodeId, formData: newVal })
      },
      deep: true
    },
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
    }
  }
}
