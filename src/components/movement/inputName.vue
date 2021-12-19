<!--
COMPONENT: MOVEMENT / INPUT NAME
Docs: https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components
 -->
<template>
  <q-input
    label="Name of movement"
    placeholder="Climate Justice Now!"

    outlined

    :value="value"
    @input="$emit('input', $event.target.value)"

  />
</template>
<script>
export default {
  props: ['value']
  // TO-DO: Add some validation here
}
</script>
