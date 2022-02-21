<template>
  <router-view />
</template>
<script>
export default {
  created () {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        if (this.$route.params.movementPath) {
          this.$store.dispatch('currentMovement/fetchFromDatabase', this.$route.params.movementPath)
        }
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    )
  },
  unmounted () {
    this.$store.commit('currentMovement/destroy')
  }
}
</script>
