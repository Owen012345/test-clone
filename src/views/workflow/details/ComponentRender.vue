<template lang="">
  <component v-if="selectedNode" :is="selectedNode.nodeId" :selectedNodeId="selectedNode.id" />
</template>
<script>
import C1_N01 from '@/components/nodes/collection/C1_N01.vue'
import C1_N02 from '@/components/nodes/collection/C1_N02.vue'
import C1_N03 from '@/components/nodes/collection/C1_N03.vue'
import C1_N04 from '@/components/nodes/collection/C1_N04.vue'
import C1_N05 from '@/components/nodes/collection/C1_N05.vue'
import C1_N06 from '@/components/nodes/collection/C1_N06.vue'
import C1_N07 from '@/components/nodes/collection/C1_N07.vue'

import C2_N01 from '@/components/nodes/restapi/C2_N01.vue'

import C3_N01 from '@/components/nodes/preprocess/C3_N01.vue'
import C3_N02 from '@/components/nodes/preprocess/C3_N02.vue'
import C3_N03 from '@/components/nodes/preprocess/C3_N03.vue'
import C3_N04 from '@/components/nodes/preprocess/C3_N04.vue'
import C3_N05 from '@/components/nodes/preprocess/C3_N05.vue'
import C3_N06 from '@/components/nodes/preprocess/C3_N06.vue'

import C4_N01 from '@/components/nodes/transformation/C4_N01.vue'
import C4_N02 from '@/components/nodes/transformation/C4_N02.vue'
import C4_N03 from '@/components/nodes/transformation/C4_N03.vue'
import C4_N04 from '@/components/nodes/transformation/C4_N04.vue'
import C4_N05 from '@/components/nodes/transformation/C4_N05.vue'
import C4_N06 from '@/components/nodes/transformation/C4_N06.vue'

import C5_N01 from '@/components/nodes/datamining/C5_N01.vue'
import C5_N02 from '@/components/nodes/datamining/C5_N02.vue'
import C5_N03 from '@/components/nodes/datamining/C5_N03.vue'
import C5_N04 from '@/components/nodes/datamining/C5_N04.vue'
import C5_N05 from '@/components/nodes/datamining/C5_N05.vue'
import C5_N06 from '@/components/nodes/datamining/C5_N06.vue'
import C5_N07 from '@/components/nodes/datamining/C5_N07.vue'
import C5_N08 from '@/components/nodes/datamining/C5_N08.vue'
import C5_N09 from '@/components/nodes/datamining/C5_N09.vue'
import C5_N10 from '@/components/nodes/datamining/C5_N10.vue'
import C5_N11 from '@/components/nodes/datamining/C5_N11.vue'
import C5_N12 from '@/components/nodes/datamining/C5_N12.vue'

export default {
  name: 'ComponentRender',
  components: {
    C1_N01,
    C1_N02,
    C1_N03,
    C1_N04,
    C1_N05,
    C1_N06,
    C1_N07,
    C2_N01,
    C3_N01,
    C3_N02,
    C3_N03,
    C3_N04,
    C3_N05,
    C3_N06,
    C4_N01,
    C4_N02,
    C4_N03,
    C4_N04,
    C4_N05,
    C4_N06,
    C5_N01,
    C5_N02,
    C5_N03,
    C5_N04,
    C5_N05,
    C5_N06,
    C5_N07,
    C5_N08,
    C5_N09,
    C5_N10,
    C5_N11,
    C5_N12
  },
  props: {
    selectedNode: {
      type: Object,
      required: true
    }
  }
}
</script>
