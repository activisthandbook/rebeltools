<!--
COMPONENT: MOVEMENT / INPUT PATH
Docs: https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components
 -->
<template>
  <q-input
    label="URL Path"
    placeholder="climate-justice-now"
    hint="Only use lowercase letters and dashes (my-movement)."

    outlined

    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
    required
  />
</template>
<script>
export default {
  props: ['value']
  // TO-DO: Add some validation here
}
</script>
