<!--
LAYOUT: MAIN ⏺
The whole app loads inside this layout.

Path: /*
 -->
<template>
  <router-view v-if="$store.state.auth.user" />
  <div v-else class="fixed-center text-center">
    <q-circular-progress
      color="grey"
      indeterminate
      size="50px"
      class="q-ma-md"
    />
    <div class="text-grey">
      Loading auth...
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>
