<!--
COMPONENT: MOVEMENT / INPUT COLOR
Docs: https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components
 -->
<template>
  <div>
    <q-input
      :label="label"
      placeholder="#000000"
      outlined
      @focus="focus()"
      ref="colorInput"
      v-bind="$attrs"

      :error="error"
      :error-message="errorMessage"
    >
      <template v-slot:append>
        <q-btn icon="mdi-eyedropper" label="Pick color" flat no-caps v-bind:style="{ color: $attrs.modelValue }">
          <q-menu :offset="[0, 4]">
            <q-color
              v-bind="$attrs"
              @change="this.$emit('blur')"
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
  props: ['label', 'value', 'error', 'errorMessage'],
  inheritAttrs: false,
  methods: {
    focus: function () {
      this.$refs.colorInput.select()
    }
  }
  // 👉 TO-DO: Add some contrast validation here: https://www.npmjs.com/package/color-contrast-checker
}
</script>
