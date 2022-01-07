<!--
LAYOUT: MAIN ⏺
The whole app loads inside this layout.

Path: /*
 -->
<template>
  <router-view />
  <!-- <div v-else class="fixed-center text-center">
    <q-circular-progress
      color="grey"
      indeterminate
      size="50px"
      class="q-ma-md"
    />
    <div class="text-grey">
      Loading auth...
    </div>
  </div> -->
</template>
<script>

export default {
  name: 'App',
  computed: {
    movementNotFound () {
      return this.$store.state.currentMovement.data.notFound
    }
  },
  watch: {
    movementNotFound: function (result) {
      if (result) {
        this.$router.push({ name: '404', params: { catchAll: 404 } })
      }
    }
  }
}
</script>
