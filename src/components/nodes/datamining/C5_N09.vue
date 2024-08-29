<template lang="">
  <v-container fluid>
    <CustomCard title="Standard settings">
      <span>Class column</span>
      <v-select
        v-model="formData.columnSelectionArray"
        :items="[]"
        outlined
        hide-details
      ></v-select>
      <span>Overlapping penalty</span>
      <v-text-field
        v-model="formData.overlappingPenalty"
        :type="schema.properties.overlappingPenalty.type"
        outlined
        hide-details
      ></v-text-field>
    </CustomCard>
    <CustomCard title="Choose Kernel">
      <v-radio-group v-model="formData.kernelEnum" hide-details>
        <template v-for="(item, index) in schema.properties.kernelEnum.enum" :key="index">
          <v-radio :label="item" :value="item"></v-radio>
          <CustomCard v-if="item === 'Polynomial'">
            <span>Bias</span>
            <v-text-field
              v-model="formData.polynomialBias"
              :type="schema.properties.polynomialBias.type"
              outlined
              hide-details
              :disabled="formData.kernelEnum !== 'Polynomial'"
            ></v-text-field>
            <span>Power</span>
            <v-text-field
              v-model="formData.polynomialPower"
              :type="schema.properties.polynomialPower.type"
              outlined
              hide-details
              :disabled="formData.kernelEnum !== 'Polynomial'"
            ></v-text-field>
            <span>Gamma</span>
            <v-text-field
              v-model="formData.polynomialGamma"
              :type="schema.properties.polynomialGamma.type"
              outlined
              hide-details
              :disabled="formData.kernelEnum !== 'Polynomial'"
            ></v-text-field>
          </CustomCard>
          <CustomCard v-if="item === 'HyperTangent'">
            <span>Kappa</span>
            <v-text-field
              v-model="formData.hyperTangentKappa"
              :type="schema.properties.hyperTangentKappa.type"
              outlined
              hide-details
              :disabled="formData.kernelEnum !== 'HyperTangent'"
              step="0.1"
            ></v-text-field>
            <span>Delta</span>
            <v-text-field
              v-model="formData.hyperTangentDelta"
              :type="schema.properties.hyperTangentDelta.type"
              outlined
              hide-details
              :disabled="formData.kernelEnum !== 'HyperTangent'"
              step="0.1"
            ></v-text-field>
          </CustomCard>
          <CustomCard v-if="item === 'RBF'">
            <span>Sigma</span>
            <v-text-field
              v-model="formData.rbfSigma"
              :type="schema.properties.rbfSigma.type"
              outlined
              hide-details
              :disabled="formData.kernelEnum !== 'RBF'"
              step="0.1"
            ></v-text-field>
          </CustomCard>
        </template>
      </v-radio-group>
    </CustomCard>
  </v-container>
</template>
<script>
import CustomCard from '@/components/custom/CustomCard.vue'
import formMixin from '@/components/mixins/formMixin'

export default {
  name: 'C5_N09',
  components: {
    CustomCard
  },
  mixins: [formMixin]
}
</script>
<style lang=""></style>
