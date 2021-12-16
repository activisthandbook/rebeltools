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

// DYNAMICALLY CHANGE COLOURS
import { setCssVar } from 'quasar'

setCssVar('primary', '#0431EA')
setCssVar('secondary', '#D70057')
setCssVar('accent', '#FFF8DB')
setCssVar('dark', '#000000')
</script>
