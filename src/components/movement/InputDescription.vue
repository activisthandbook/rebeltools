<!--
COMPONENT: MOVEMENT / INPUT DESCRIPTION
Docs: https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components
 -->
<template>
  <q-input
    label="📝 Short description"

    type="textarea"
    outlined

    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
  />
</template>
<script>
export default {
  props: ['value']
  // 👉 TO-DO: Add some validation here
}
</script>
