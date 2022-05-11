<template>
  <!-- LOADING -->
  <div
    v-if="
      !this.$store.state.auth.dataLoaded ||
      !this.$store.state.currentMovement.dataLoaded
    "
    class="fixed-center text-center"
  >
    <q-circular-progress
      color="grey"
      indeterminate
      size="50px"
      class="q-ma-md"
    />
    <div class="text-grey">Loading dashboard...</div>
  </div>

  <!-- LOADED, BUT NOT AN ADMIN -->
  <q-layout view="hHh lpR fFf" v-else-if="!isMovementAdmin">
    <q-page-container class="flex justify-center">
      <q-page>
        <oops-error
          title="You are not an admin of this movement"
          description="Sign in with a different account or ask the movement admin to give you permission to manage this movement."
        />
      </q-page>
    </q-page-container>
  </q-layout>

  <!-- LOADED -->
  <div v-else class="row items-stretch window-height bg-grey-1 col full-width">
    <div
      class="col-12 row"
      :class="{ 'col-md-7': $route.meta.secondView }"
      v-if="!($q.screen.lt.md && $route.meta.secondView)"
    >
      <q-layout view="lHh lpR fFf" class="bg-grey-1" container>
        <router-view name="FirstView" />
        <app-menu />
      </q-layout>
      <q-separator
        vertical
        class="full-height fixed"
        style="z-index: 1; left: calc((100% / 12 * 7) - 0.5px)"
        v-if="$q.screen.gt.sm && $route.meta.secondView"
      />
    </div>
    <div class="col-12 col-md-5" v-if="$route.meta.secondView">
      <q-layout view="hHh lpR fFf" class="bg-grey-1 col" container>
        <router-view name="SecondView" />
      </q-layout>
    </div>
  </div>
</template>
<script>
import AppMenu from "components/AppMenu";
import OopsError from "components/OopsError";

export default {
  components: { AppMenu, OopsError },
  data() {
    return {
      navRail: [
        {
          icon: "mdi-home",
          label: "Home",
          to: "/",
        },
        {
          icon: "mdi-account-group",
          label: "Community",
          to: "/settings",
        },
        {
          icon: "mdi-calendar",
          label: "Calendar",
          to: "/calendar",
        },
        {
          icon: "mdi-file",
          label: "Page",
          to: "/account",
        },
      ],
    };
  },
  computed: {
    isMovementAdmin: {
      get() {
        const admins = this.$store.state.currentMovement.data.admins;
        const userUID = this.$store.state.auth.data.uid;
        if (admins.includes(userUID)) {
          return true;
        } else {
          return false;
        }
      },
    },
  },
};
</script>

<style scoped lang="scss">
.border {
  border: 1px solid $grey-4;
}
</style>
