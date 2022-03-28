<template>
  <span class="cursor-pointer non-selectable">
    <span
      v-if="$store.state.currentUser.data.firstName"
      class="text-bold ellipsis"
      style="max-width: 120px"
      >{{ $store.state.currentUser.data.firstName }}</span
    >
    <q-btn
      round
      dense
      unelevated
      text-color="black"
      color="white"
      class="q-mx-sm"
    >
      <q-avatar size="32px" style="margin: 1px">
        <q-icon name="mdi-account" v-if="!profileImage2x" size="24px" />
        <img
          :src="profileImage2x"
          :srcset="profileImage1x + ' 1x,' + profileImage2x + ' 2x'"
          no-spinner
          v-else
        />
      </q-avatar>
    </q-btn>
    <q-menu :offset="[0, 6]" transition-show="jump-down" transition-hide="fade">
      <q-list style="min-width: 180px">
        <q-item clickable v-close-popup :to="{ name: 'Settings' }">
          <q-item-section avatar>
            <q-icon name="mdi-cog" />
          </q-item-section>
          <q-item-section>Settings</q-item-section>
        </q-item>
        <q-item
          clickable
          v-close-popup
          @click="$store.dispatch('auth/signOut')"
        >
          <q-item-section avatar>
            <q-icon name="mdi-exit-to-app" />
          </q-item-section>
          <q-item-section>Sign out</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </span>
</template>
<script>
import { getStorage, ref, getDownloadURL } from "firebase/storage";
const storage = getStorage();

export default {
  data() {
    return {
      profileImage1x: "",
      profileImage2x: "",
    };
  },
  mounted() {
    this.$nextTick(function () {
      getDownloadURL(
        ref(
          storage,
          "profileImages/" + this.$store.state.auth.data.uid + "_32x32"
        )
      )
        .then((url) => {
          this.profileImage1x = url;
        })
        .catch((error) => {
          console.log(error);
        });

      getDownloadURL(
        ref(
          storage,
          "profileImages/" + this.$store.state.auth.data.uid + "_64x64"
        )
      )
        .then((url) => {
          this.profileImage2x = url;
        })
        .catch((error) => {
          console.log(error);
        });
    });
  },
};
</script>
