<template>
  <div class="fixed-center text-center">
          <q-circular-progress
            color="grey"
            indeterminate
            size="50px"
            class="q-ma-md"
          />
          <div class="text-grey">
            Verifying email...
          </div>
        </div>
</template>
<script>
export default {
  mounted () {
    this.$nextTick(function () {
      this.$store.dispatch('auth/signInWithEmailLink')
    })
  },
  watch: {
    '$store.state.auth.dataLoaded': function () {
      if (this.$store.state.auth.dataLoaded) {
        this.$router.push(this.$route.query.continue)
      }
    }
  }
}
</script>
