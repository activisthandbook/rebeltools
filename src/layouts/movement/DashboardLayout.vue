<!--
LAYOUT: DASHBOARD 📝
The dashboard layout is used by activists to manage their movement. Only people with admin rights for that movement can access it.

Path: /:movementPath/dashboard/*
 -->
<template>
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
  <q-layout view="lHh LpR lFf" v-else>
    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      :width="224"
      :breakpoint="767"
    >
      <q-scroll-area class="fit">
        <div class="q-ma-md">
          <h1>{{ movementName }}</h1>
          <div class="q-mt-sm text-caption">Welcome back, {{ firstName }}.</div>
        </div>
        <q-separator />
        <q-list padding>
          <q-item-label header>Apps</q-item-label>
          <q-item
            clickable
            active-class="text-primary"
            :to="{ name: 'Dashboard' }"
            exact
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="mdi-rocket-launch" />
            </q-item-section>
            <q-item-section>Dashboard</q-item-section>
          </q-item>
          <q-item
            clickable
            active-class="text-primary"
            :to="{ name: 'Dashboard Community' }"
            exact
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="mdi-account-group" />
            </q-item-section>
            <q-item-section>Community</q-item-section>
          </q-item>
          <q-item
            clickable
            active-class="text-primary"
            :to="{ name: 'Dashboard Calendar' }"
            exact
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="mdi-calendar" />
            </q-item-section>
            <q-item-section>Calendar</q-item-section>
          </q-item>
          <q-item
            clickable
            active-class="text-primary"
            :to="{ name: 'Dashboard Page' }"
            exact
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="mdi-file" />
            </q-item-section>
            <q-item-section>Page</q-item-section>
          </q-item>
        </q-list>
        <q-separator />
        <div class="q-ma-md">
          <q-btn
            icon="mdi-exit-to-app"
            label="Close dashboard"
            :to="{ name: 'Movement' }"
            color="white"
            text-color="black"
            no-caps
            outline
          />
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="flex justify-center">
      <q-page padding class="q-py-lg full-width">
        <router-view />
        <footer class="text-caption text-center q-mt-xl">
          <div class="text-grey-6 text-bold">
            Made with
            <span
              @click="$router.push('/')"
              class="cursor-pointer text-underline"
              >Rebel Tools</span
            >
          </div>

          <div class="text-caption text-center text-grey-6 q-mb-sm">
            <div>{{ randomMessage }}</div>
          </div>
          <help-menu />
        </footer>
      </q-page>
      <q-page-sticky position="bottom-left" :offset="[18, 18]">
        <q-btn
          icon="mdi-apps"
          color="primary"
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script>
import HelpMenu from "components/HelpMenu";
import OopsError from "components/OopsError";
export default {
  name: "MainLayout",
  components: {
    HelpMenu,
    OopsError,
  },
  data() {
    return {
      leftDrawerOpen: false,
      welcomeMessages: [
        "Hungry? Eat the rich 🤑",
        "Careful with each other, dangerous together 🦋",
        "Climate justice now 🌍",
        "Rebel for life ✊",
        "Rebelling out of love, rage and solidarity ❤️",
        "Fuck this shit 💩",
        "Solid like a rock, rooted like a tree 🌳",
        "Hear the voice of my great granddaughter 🧓🏽",
        "Activism rocks 😎",
        "Tell the truth ⌛️",
        "Act now 💪",
        "System change 📢",
        "Shifting the Overton window 🌊",
        "Are we willing to fight for it? 🐝",
        "Join the rebellion 🐞",
        "Uproot the system 🙃",
        "Strong in solidarity we stand 🙌",
        "People power ⚡️",
        "Black lives matter ✊🏿",
        "Love is love 🏳️‍🌈",
        "Make love, not war 🕊",
        "Building resilient communities 💪",
        "Building the movements of tomorrow 🌊",
        "Rebel for life 🐛",
        "By activists, for activists 🙌",
        "Climate justice now 🌏",
        "You can't sink a rainbow 🌈",
        "With love, rage & solidarity 💚",
        "Change is coming, whether you like it or not ✊",
        "Keep your carbon in the soil 🔥",
      ],
      randomMessage: "",
    };
  },
  mounted() {
    this.randomMessage =
      this.welcomeMessages[
        Math.floor(Math.random() * this.welcomeMessages.length)
      ];
  },
  computed: {
    firstName() {
      return this.$store.state.currentUser.data.firstName;
    },
    movementName: {
      get() {
        return this.$store.state.currentMovement.data.name;
      },
    },
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
<style scoped>
.q-list .q-router-link--active,
.q-list .q-router-link--exact-active {
  font-weight: 700;
}
h1 {
  font-size: 26px;
}
</style>
