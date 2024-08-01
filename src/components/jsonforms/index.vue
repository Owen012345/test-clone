<template>
  <json-forms :schema="jsonschema" :uischema="uischema" :renderers="renderers" :data="data" />
</template>

<script setup lang="js">
import { JsonForms } from '@jsonforms/vue'
import { vuetifyRenderers } from '@jsonforms/vue-vuetify'
import { markRaw } from 'vue'

const renderers = markRaw([...vuetifyRenderers])
const jsonschema = {
  type: 'object',
  properties: {
    exampleRadioEnum: {
      type: 'string',
      enum: ['One', 'Two', 'Three']
    },
    exampleRadioOneOfEnum: {
      type: 'string',
      oneOf: [
        {
          const: 'foo',
          title: 'Foo'
        },
        {
          const: 'bar',
          title: 'Bar'
        },
        {
          const: 'foobar',
          title: 'FooBar'
        }
      ]
    }
  }
}
const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Group',
      label: 'Simple enum',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/exampleRadioEnum',
          class: 'custom-class',
          options: {
            format: 'radio'
          }
        }
      ]
    },
    {
      type: 'Group',
      label: 'One of Enum',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/exampleRadioOneOfEnum',
          options: {
            format: 'radio'
          }
        }
      ]
    }
  ]
}

const data = {}
</script>
