<template>
  <div class="fixed-center text-center">
    <q-circular-progress
      color="grey"
      indeterminate
      size="50px"
      class="q-ma-md"
    />
    <div class="text-grey">Verifying email...</div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.$nextTick(function () {
      this.$store.dispatch("auth/signInWithEmailLink");
    });
  },
  watch: {
    "$store.state.auth.signedInWithEmailLink": {
      handler() {
        // Security: Only if signedInWithEmailLink is true, we allow to save this action. Otherwise, a user could be misled to take a certain action, just by clicking a link.
        // By checking if emailVerified is true, we avoid saving the action with an anonymous account (the user is signed in anonymously before the email is verified)
        if (
          this.$store.state.auth.signedInWithEmailLink &&
          this.$store.state.auth.data.emailVerified
        ) {
          // Only save the action if the action related variables are defined. If not, the user just signed in without it being connected to an action.
          if (
            this.$route.query.actionType &&
            this.$route.query.actionID &&
            this.$route.query.movementID
          ) {
            const actionInstance = {
              actionType: this.$route.query.actionType,
              actionID: this.$route.query.actionID,
              movementID: this.$route.query.movementID,
            };

            if (this.$route.query.invite) {
              actionInstance.invite = this.$route.query.invite;
            }

            this.$store
              .dispatch("currentAction/addToDatabase", actionInstance)
              .then(() => {
                this.$router.push(this.$route.query.continue);
              });
          } else {
            this.$router.push(this.$route.query.continue);
          }
        }
      },
      deep: true,
    },
  },
};
</script>
