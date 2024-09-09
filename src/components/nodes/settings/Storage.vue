<template>
  <v-container fluid>
    <CustomCard title="Output Storage Settings">
        <CustomCard v-for="(item, key) in initNodeOutputStorage" :key="key">
            <span>{{ item }} Storage</span>
            <v-radio-group v-model="selectedStorageType" inline hide-details>
            <v-radio
                v-for="(item, index) in storageType"
                :key="index"
                :label="item"
                :value="item"
                >
            </v-radio>
            </v-radio-group>
        </CustomCard>
    </CustomCard>
  </v-container>
</template>

<script>
import CustomCard from '@/components/custom/customCard.vue'
import { mapGetters } from 'vuex'
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
            getNodeOutputStorage: 'getNodeOutputStorage'
        }),
        initNodeOutputStorage() {
            return this.getNodeOutputStorage(this.selectedNode.id)
        },
    },
    data() {
        return {
            outputKeys : null,
            storageType: ['ceph','postgres']
        }
    },
    
    mounted() {
        this.outputKeys = this.initNodeOutputStorage
    }
}
</script>

<style>

</style>