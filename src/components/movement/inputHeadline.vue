<!--
COMPONENT: MOVEMENT / INPUT HEADLINE
Docs: https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components
 -->
<template>
  <q-input
    label="Headline"

    outlined

    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
  />
</template>
<script>
export default {
  props: ['value']
  // TO-DO: Add some validation here
}
</script>
