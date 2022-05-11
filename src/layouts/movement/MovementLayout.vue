<template>
  <div class="yes-animations">
    <oops-error
      title="Movement not found."
      description="This page was deleted or hidden."
      v-if="$store.state.currentMovement.error"
    />
    <router-view v-else />
  </div>
</template>
<script>
import OopsError from "components/OopsError";

export default {
  components: { OopsError },
  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        if (this.$route.params.movementPath) {
          this.$store.dispatch(
            "currentMovement/subscribeToDatabase",
            this.$route.params.movementPath
          );
        }
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    );
  },
  unmounted() {
    this.$store.commit("currentMovement/destroy");
  },
};
</script>
