<template>
  <router-view />
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
