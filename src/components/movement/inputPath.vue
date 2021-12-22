<!--
COMPONENT: MOVEMENT / INPUT PATH
Docs: https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components
 -->
<template>
  <q-input
    placeholder="my-url"
    hint="Only use lowercase letters and dashes."

    filled
    dense

    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
    required
  >
    <template v-slot:prepend>
      <div class="text-grey-8 text-body2">🔗 rebel.tools/</div>
    </template>
  </q-input>
</template>
<script>
export default {
  props: ['value']
  // 👉 TO-DO: Add some validation here
}
</script>
