<template>
  <div v-if="!isMovementMember">Creating your account...</div>
  <div v-else>
    <h2>Almost done...</h2>
    <!-- <div><span class="text-bold">Finish your Rebel Tools profile.</span> With your profile, you can easily sign up for movements, without having to fill in your details again.</div> -->
    <q-card flat class="text-black q-mt-md">
      <q-card-section>
        <div class="q-gutter-y-sm">
          <div class="text-bold" @click="getLocation()">Create profile</div>
          <q-input
            label="💬 First name"
            type="fname"
            outlined
            bg-color="white"
            color="black"
            v-model="firstName"
            :error="this.v$.firstName.$error"
            :errorMessage="mixin_mergeErrorMessages(this.v$.firstName.$errors)"
          />
          <q-input
            label="☎️ Phone number"
            type="tel"
            outlined
            bg-color="white"
            color="black"
            v-model="phoneNumber"
            :error="this.v$.phoneNumber.$error"
            :errorMessage="
              mixin_mergeErrorMessages(this.v$.phoneNumber.$errors)
            "
          />
          <!-- <q-chip square label="Rotterdam" icon-right="mdi-pencil" class="q-mx-none" color="grey-2"/> -->
          <profile-picture-uploader />
          <!-- <q-banner class="bg-grey-3 rounded-borders flex">
          <q-avatar icon="mdi-account" color="secondary" text-color="white" size="64px" class="q-mr-md"/>
          <q-btn icon="mdi-upload" label="Upload picture" no-caps color="white" text-color="secondary"/>
        </q-banner> -->

          <div class="text-body2 q-mt-md" style="line-height: 1">
            <span class="text-bold text-grey-9"
              ><q-icon name="mdi-lock" class="q-mr-xs" />Who can see this
              info:</span
            >
            <span class="text-grey-7"
              >Name and profile picture are public. Phone number is only shared
              with movement admins.</span
            >
          </div>
          <!-- <q-checkbox v-model="acceptPrivacyPolicy" class="text-body2 non-selectable" color="secondary">
          <div class="q-ml-sm">
            <span class="text-bold">Accept privacy policy.</span> <span class="text-grey-8">Name and profile picture are public. Phone number is only shared with movement admins.</span>
          </div>
        </q-checkbox> -->
          <q-btn
            label="Create profile"
            no-caps
            color="secondary"
            class="q-mt-md q-mr-sm full-width shadow-12"
            unelevated
            :disable="
              this.v$.firstName.$invalid || this.v$.phoneNumber.$invalid
            "
            @click="finishAction()"
            size="16px"
          />
          <!-- <q-icon name="mdi-lock" round flat color="black" dense size="xs" class="q-ml-sm"/> -->
          <!-- <div class="col q-ml-sm"> <strong>Privacy: </strong>Name and profile picture are public. Phone number is only shared with movement admins.</div> -->
        </div>
        <!-- <q-btn label="Continue" no-caps color="secondary" class="q-my-xs q-mr-sm" :disable="this.v$.firstName.$invalid || this.v$.phoneNumber.$invalid" @click="finishAction()"/> -->
      </q-card-section>
    </q-card>
  </div>

  <!-- <q-card class="text-black">
    <q-card-section>
      <div class="text-bold">Private info</div>
      <div class="q-my-xs text-bold">
        <q-btn icon="mdi-lock" round flat color="black" dense size="sm">
          <q-menu :offset="[0, 6]" class="q-pa-md">
            <div style="max-width:240px">
              <div class="text-bold">How profiles work</div>
              <div>Your profile is only shared with admins of the movements your sign up for. You can always edit your profile later.</div>
              <q-btn :to="{name: 'Privacy'}" label="Privacy policy" color="black" outline no-caps size="sm" class="q-mt-md"/>
            </div>
          </q-menu>
        </q-btn>
        Only visible to movement admins.
      </div>
      <q-input
          label="☎️ Phone number"
          type="tel"
          outlined
          bg-color="white"
          color="black"
          class="q-mb-sm"
          v-model="phoneNumber"
          :error="this.v$.phoneNumber.$error"
          :errorMessage="mixin_mergeErrorMessages(this.v$.phoneNumber.$errors)"
        />
        <q-input
          label="📍 City"
          outlined
          bg-color="white"
          color="black"
          class="q-mb-sm"
        />
    </q-card-section>
  </q-card> -->
</template>
<script>
import ProfilePictureUploader from "components/ProfilePictureUploader";

import { geohashForLocation } from "geofire-common";
import { getAnalytics, logEvent } from "firebase/analytics";
const analytics = getAnalytics();

import { httpsCallable } from "firebase/functions";

import useVuelidate from "@vuelidate/core";

export default {
  components: { ProfilePictureUploader },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      firstName: this.$store.state.currentUser.validations.firstName,
      phoneNumber: this.$store.state.currentUser.validations.phoneNumber,
    };
  },
  mounted: function () {
    this.$nextTick(function () {
      this.getLocation();
    });
  },
  data() {
    return {
      // location: 'Rotterdam, Netherlands',
    };
  },
  computed: {
    firstName: {
      get() {
        return this.$store.state.currentUser.data.firstName;
      },
      set(value) {
        this.$store.commit("currentUser/update", { firstName: value });
      },
    },
    phoneNumber: {
      get() {
        return this.$store.state.currentUser.data.phoneNumber;
      },
      set(value) {
        this.$store.commit("currentUser/update", { phoneNumber: value });
      },
    },
    isMovementMember() {
      if (this.$store.state.currentUser.data.movements) {
        return this.$store.state.currentUser.data.movements.includes(
          this.$store.state.currentMovement.data.id
        );
      } else return false;
    },
  },
  methods: {
    finishAction() {
      this.$store.commit("currentUser/update", { profileCreated: true });
      this.$store.dispatch("currentUser/pushToDatabase");

      logEvent(analytics, "user_profile_created");
    },
    getLocation() {
      const getLocation = httpsCallable(
        this.$store.state.firebase.functions,
        "getLocation"
      );
      getLocation({ text: "test" }).then((result) => {
        const locationData = result.data;
        this.$store.commit("currentUser/update", {
          location: {
            ...locationData,
            geohash: geohashForLocation([locationData.lat, locationData.long]),
          },
        });
      });
    },
  },
};
</script>
