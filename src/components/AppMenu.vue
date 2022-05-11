<template>
  <q-page-sticky position="bottom-left" :offset="[18, 18]">
    <q-btn
      fab
      :icon="iconMenu"
      @click="leftDrawerOpen = !leftDrawerOpen"
      text-color="primary"
      color="white"
    >
      <!-- <q-menu :offset="[0, 6]" class="shadow-12">
      <q-list>
        <q-item v-for="(app, index) in apps" :key="index" clickable>
          <q-item-section avatar>
            <q-avatar :icon="app.icon" />
          </q-item-section>
          <q-item-section>
            {{ app.label }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu> -->
    </q-btn>
  </q-page-sticky>
  <q-drawer
    show-if-above
    v-model="leftDrawerOpen"
    side="left"
    bordered
    :width="190"
    :breakpoint="767"
    class="text-body2"
  >
    <q-scroll-area class="fit">
      <div class="q-mt-md q-mx-md q-mb-sm">
        <h1>{{ this.$store.state.currentMovement.data.name }}</h1>
        <div class="q-mt-sm text-caption">
          Welcome back, {{ this.$store.state.currentUser.data.firstName }}.
        </div>
      </div>
      <q-list>
        <q-item
          clickable
          :class="{ 'active-menu': $route.meta.app === app.name }"
          :to="app.to"
          exact
          v-ripple
          v-for="(app, index) in apps"
          :key="index"
          dense
          class="q-py-xs"
        >
          <q-item-section avatar>
            <q-avatar :icon="app.icon" />
          </q-item-section>
          <q-item-section>{{ app.name }}</q-item-section>
        </q-item>
      </q-list>
      <div class="q-ma-md">
        <q-btn
          icon="mdi-link"
          label="Open page"
          :to="{ name: 'Movement' }"
          color="white"
          text-color="black"
          class="full-width"
          no-caps
          outline
        />
      </div>
    </q-scroll-area>
  </q-drawer>
</template>
<script>
export default {
  data() {
    return {
      leftDrawerOpen: false,
      apps: [
        {
          icon: "mdi-home",
          name: "Home",
          to: { name: "Dashboard" },
        },
        {
          icon: "mdi-account-group",
          name: "Community",
          to: { name: "Dashboard Community" },
        },
        {
          icon: "mdi-calendar",
          name: "Calendar",
          to: { name: "Dashboard Calendar" },
        },
        {
          icon: "mdi-file",
          name: "Page",
          to: { name: "Dashboard Page" },
        },
      ],
    };
  },
  computed: {
    iconMenu() {
      if (this.leftDrawerOpen) {
        return "mdi-menu-open";
      } else {
        return "mdi-menu";
      }
    },
  },
};
</script>
<style scoped lang="scss">
.q-avatar {
  background: $grey-2;
}
.active-menu {
  font-weight: 700;
  color: $primary;
  .q-avatar {
    background: $primary;
    color: white;
  }
}
h1 {
  font-size: 20px;
}
</style>
