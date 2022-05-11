<template>
  <div class="party q-gutter-y-sm">
    <div v-if="!verificationEmailSent" class="q-gutter-y-sm">
      <div class="row q-col-gutter-sm items-center">
        <!-- INVITE PROFILE -->
        <div v-if="this.$route.query.invite">
          <q-chip
            v-if="inviteProfile.dataLoaded"
            class="q-ma-none q-pl-xs"
            color="white"
          >
            <avatar-image :userID="inviteProfile.data.id" :size="20" />
            <div class="q-ml-xs">
              <strong>{{ inviteProfile.data.firstName }}</strong> is inviting
              you to join
            </div>
          </q-chip>
        </div>
        <!-- Events show 'new event' with 2 or less signups. Movements show 'new movement' with 10 or less signups. -->
        <div
          v-if="
            (actionType === 'event' && countSignups > 2) ||
            (actionType === 'movement' && countSignups > 10)
          "
        >
          <q-chip
            text-color="white"
            icon="mdi-account-group"
            class="q-ma-none text-bold"
            style="background: rgba(255, 255, 255, 0.1)"
          >
            <span class="q-mx-xs">{{ countSignups }}</span>
            <span v-if="actionType === 'event'">participants</span>
            <span v-if="actionType === 'movement'">members</span>
          </q-chip>
        </div>
        <div v-else>
          <q-chip
            icon="mdi-star"
            style="background: rgba(255, 255, 255, 0.1)"
            text-color="white"
            class="q-ma-none"
          >
            <span v-if="actionType === 'event'">New event!</span>
            <span v-if="actionType === 'movement'">New movement!</span>
          </q-chip>
        </div>
      </div>

      <h2>{{ title }}</h2>
      <div v-if="description">{{ description }}</div>

      <!-- LOADING: Show while user state is not known yet. -->
      <q-skeleton type="QInput" v-if="!$store.state.auth.dataLoaded" />

      <!-- INPUT: Show if the user is not signed in. -->
      <q-input
        label="✉️ Email address"
        color="black"
        bg-color="white"
        outlined
        class="shadow-8 q-mb-sm"
        v-model="email"
        v-if="
          $store.state.auth.dataLoaded && $store.state.auth.data.isAnonymous
        "
        @keyup.enter="sendVerificationEmail()"
      >
        <template v-slot:append>
          <q-btn
            icon="mdi-arrow-right"
            color="secondary"
            round
            @click="sendVerificationEmail()"
          >
            <q-tooltip>Sign up</q-tooltip>
          </q-btn>
        </template>
      </q-input>

      <!-- BUTTON: Show if the user is already signed in. -->
      <div
        class="q-gutter-sm items-center q-mt-md"
        v-if="
          $store.state.auth.dataLoaded && $store.state.auth.data.emailVerified
        "
      >
        <q-btn
          :label="buttonLabel"
          color="white"
          text-color="primary"
          unelevated
          class="shadow-12 q-my-none"
          icon="mdi-check-circle-outline"
          no-caps
          @click="saveSignup()"
          :loading="loading"
        />
        <div class="text-caption items-center flex" style="opacity: 0.7">
          <q-btn
            icon="mdi-information"
            round
            flat
            dense
            size="sm"
            class="q-mr-xs"
          >
            <q-popup-proxy class="q-pa-md">
              <div style="max-width: 210px">
                <div class="text-bold">
                  Sign up with your Rebel Tools profile
                </div>
                <div class="text-caption">
                  By joining, you share your profile with the admins of this
                  movement.
                </div>
                <q-btn
                  icon="mdi-pencil"
                  label="Edit profile"
                  class="q-mt-sm"
                  no-caps
                  unelevated
                  color="black"
                /><br />
              </div>
            </q-popup-proxy>
          </q-btn>
          Sign up as
          <span v-if="$store.state.currentUser.data.firstName" class="q-ml-xs">
            {{ $store.state.currentUser.data.firstName }}
          </span>
          <span
            v-if="
              $store.state.currentUser.data.firstName &&
              $store.state.auth.data.email
            "
            class="q-ml-xs"
          >
            ({{ $store.state.auth.data.email
            }}<span v-if="$store.state.currentUser.data.phoneNumber"
              >, {{ $store.state.currentUser.data.phoneNumber }}</span
            >)
          </span>

          <span v-else class="q-ml-xs">{{ $store.state.auth.data.email }}</span>
        </div>
      </div>
    </div>

    <q-item class="q-py-md q-mt-none" v-if="verificationEmailSent">
      <q-item-section>
        <h2>Check your email!</h2>
        <div>To confirm, click the Rebel Tools verification link.</div>
      </q-item-section>
      <q-item-section side>
        <q-icon name="mdi-email" size="52px" color="white"> </q-icon>
      </q-item-section>
    </q-item>
  </div>
</template>
<script>
import AvatarImage from "components/AvatarImage";
import party from "party-js";
import { onSnapshot, getFirestore, doc } from "firebase/firestore";
const db = getFirestore();

export default {
  components: { AvatarImage },
  props: {
    actionType: {
      type: String,
      required: true,
    },
    actionID: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    buttonLabel: {
      type: String,
      default: "Join us",
    },
    countSignups: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      email: null,
      verificationEmailSent: false,
      loading: false,
      inviteProfile: {
        dataLoaded: false,
        data: {},
        dataOld: {}, // Used for tracking if user made changes (for saving to Firestore)
        error: null,
      },
    };
  },
  watch: {
    "$route.query.invite": {
      handler: function () {
        if (this.$route.query.invite) {
          this.fetchPublicProfileFromDatabase(this.$route.query.invite);
        }
      },
      immediate: true,
    },
  },
  methods: {
    async fetchPublicProfileFromDatabase(profileID) {
      const inviteProfileRef = doc(db, "publicProfiles", profileID);
      this.inviteProfile.dataLoaded = false;

      this.unsubscribe = await onSnapshot(inviteProfileRef, (querySnapshot) => {
        if (querySnapshot.exists()) {
          this.inviteProfile.data = querySnapshot.data();
          this.inviteProfile.dataLoaded = true;
        } else {
          this.inviteProfile.dataLoaded = true;
          this.inviteProfile.error = "Invite profile not found";
        }
      });
    },
    sendVerificationEmail() {
      this.party();
      this.phase = "verify-email";
      this.$store
        .dispatch("auth/sendVerificationEmail", {
          email: this.email,
          actionType: this.actionType,
          actionID: this.actionID,
          movementID: this.$store.state.currentMovement.data.id,
        })
        .then(() => {
          this.verificationEmailSent = true;
        });
    },
    async saveSignup() {
      this.party();

      const actionInstance = {
        actionType: this.actionType,
        actionID: this.actionID,
        movementID: this.$store.state.currentMovement.data.id,
      };

      if (this.$route.query.invite) {
        actionInstance.invite = this.$route.query.invite;
      }

      this.$store.dispatch("currentAction/addToDatabase", actionInstance);
    },
    party() {
      party.confetti(document.querySelector(".party"), {
        color: party.Color.fromHex(
          this.$store.state.currentMovement.data.primaryColor
        ),
      });
    },
  },
};
</script>
