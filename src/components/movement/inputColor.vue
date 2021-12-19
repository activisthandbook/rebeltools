<!--
COMPONENT: MOVEMENT / INPUT COLOR
Docs: https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components
 -->
<template>
  <div>
    <q-input
      :label="label"
      outlined

      v-bind="$attrs"
    >
      <template v-slot:append>
        <q-btn icon="mdi-eyedropper" label="Pick color" flat no-caps v-bind:style="{ color: $attrs.modelValue }">
          <q-menu :offset="[0, 4]">
            <q-color
              v-bind="$attrs"
            />
          </q-menu>
        </q-btn>
      </template>
    </q-input>
  </div>
</template>
<script>
export default {
  name: 'input-color',
  props: ['label', 'value'],
  inheritAttrs: false
  // computed: {
  //   model: {
  //     get () {
  //       return this.value
  //     },
  //     set (value) {
  //       console.log(value)
  //       this.$emit('input', value)
  //     }
  //   }
  // }
}
</script>
