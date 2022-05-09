<!--
COMPONENT: SMART ACTION 🙌
This component allows users to sign up for movements and events.
1. When signed in, it shows an action button. When clicked, this component emits an 'action-taken' event.
2. When logged out, it shows an email signup field. In the verification link sent to their email address, there are parameters stored related to the action that is being taken. In other words: any action taken is only stored once the user opens the verification link.
 -->
<template>
  <div>
    <q-card dark class="bg-secondary shadow-6">
      <q-card-section
        v-if="
          !$store.state.currentAction.dataLoaded ||
          (!$store.state.currentUser.dataLoaded &&
            !$store.state.auth.data.isAnonymous)
        "
        class="q-gutter-y-sm"
      >
        <q-skeleton type="rect" height="28.8px" />
        <q-skeleton type="text" height="20px" />
        <q-skeleton type="text" height="20px" />
        <q-skeleton type="QInput" class="q-mb-sm" />
      </q-card-section>

      <transition name="fade">
        <q-card-section
          v-if="
            $store.state.currentAction.dataLoaded &&
            ($store.state.currentUser.dataLoaded ||
              $store.state.auth.data.isAnonymous)
          "
          class="q-gutter-y-sm"
        >
          <sign-up
            v-if="$store.state.currentAction.error === 'action-not-found'"
            :actionType="action.actionType"
            :actionID="action.actionID"
            :title="action.title"
            :description="action.description"
            :buttonLabel="action.buttonLabel"
            :actionCount="action.actionCount"
          />
          <!-- <create-profile v-else-if="true"/> -->
          <create-profile
            v-else-if="!$store.state.currentUser.data.profileCreated"
          />
          <share-page :actionType="action.actionType" v-else />
          <!-- <enable-notifications v-else-if="!actions['enable-notifications'].completed"/> -->

          <!-- Reminder for people to scroll down for joining info on events pages -->
          <q-page-scroller
            v-if="
              action.actionType === 'event' &&
              $store.state.currentAction.error !== 'action-not-found'
            "
            reverse
            position="bottom"
            :scroll-offset="300"
            :offset="[0, 0]"
            expand
            class="fixed"
            style="z-index: 1"
          >
            <div
              class="col cursor-pointer q-pa-sm bg-white text-primary text-bold text-center shadow-5"
            >
              {{ $store.state.currentAction.error }}
              <q-icon
                name="mdi-arrow-down"
                class="bounce-arrow q-mr-xs"
              />Joining info
            </div>
          </q-page-scroller>
        </q-card-section>
      </transition>
    </q-card>

    <!-- <q-list bordered class="rounded-borders q-mb-lg" dense>

      <q-item-label header class="text-caption">
        Checklist
      </q-item-label>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="mdi-check-circle" color="secondary"/>
        </q-item-section>

        <q-item-section class="text-caption">Sign up</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="mdi-arrow-right-circle-outline"/>
        </q-item-section>

        <q-item-section  class="text-caption">Create profile</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="mdi-arrow-right-circle-outline"/>
        </q-item-section>

        <q-item-section  class="text-caption">Turn on notifications</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="mdi-arrow-right-circle-outline"/>
        </q-item-section>

        <q-item-section  class="text-caption">Sync calendar</q-item-section>
      </q-item>

    </q-list> -->
  </div>
</template>
<script>
// import { getFirestore, collection, onSnapshot, query, where } from 'firebase/firestore'
// const db = getFirestore()

import SignUp from "./actions/SignUp";
import CreateProfile from "./actions/CreateProfile";
import SharePage from "./actions/SharePage";

// import EnableNotifications from './actions/EnableNotifications'

export default {
  name: "smart-action",
  components: {
    SignUp,
    CreateProfile,
    // EnableNotifications
    SharePage,
  },
  props: {
    action: {
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
      actionCount: {
        type: Number,
        default: 0,
      },
    },
  },
  data() {
    return {
      actionDataLoaded: false,
      actionData: null,
      email: null,
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.$store.dispatch(
        "currentAction/subscribeToDatabase",
        this.action.actionID
      );
    });
  },
};
</script>
<style scoped>
.fade-enter-active {
  transition: max-height 0.5s, opacity 0.3s;
  max-height: 500px;
  overflow: hidden;
}

.fade-enter-from {
  max-height: 196.8px;
  opacity: 0.5;
}
</style>
