<!--
COMPONENT: MOVEMENT / INPUT DESCRIPTION
Docs: https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components
 -->
<template>
  <q-input
    label="📝 Short description"

    type="textarea"
    outlined

    v-bind="model"

    :error="error"
    :error-message="errorMessage"

  />

  <!--
    @blur="this.v$.model.modelValue.$touch"
    :error="this.v$.model.modelValue.$error"
    :error-message="allErrorMessages" -->

</template>
<script>
// import useVuelidate from '@vuelidate/core'
// import { required, minLength, helpers } from '@vuelidate/validators'

export default {
  // setup () {
  //   return { v$: useVuelidate() }
  // },
  props: ['value', 'error', 'errorMessage'],
  inheritAttrs: false,
  computed: {
    model: {
      get () {
        // this.$emit('valid', !this.v$.model.modelValue.$invalid)
        return this.$attrs
      }
    }
    // allErrorMessages: function () {
    //   // Our mixins are defined in a Quasar boot file
    //   return this.mixin_mergeErrorMessages(this.v$.model.modelValue.$errors)
    // }
  }
  // validations () {
  //   return {
  //     model: {
  //       modelValue: {
  //         required: helpers.withMessage('A description is required.', required),
  //         minLength: helpers.withMessage('At least 10 characters required.', minLength(10))
  //       }
  //     }
  //   }
  // }
}
</script>
