import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    selectedTab: {
      type: String
    },
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
      getInitNodeSchema: 'getInitNodeSchema',
      getDefaultNodeSchema: 'getDefaultNodeSchema'
    }),
    initFormData() {
      return this.getDefaultNodeSchema(this.selectedNodeId)
    },
    schema() {
      return this.getInitNodeSchema(this.selectedNodeId)
    }
  }
}
