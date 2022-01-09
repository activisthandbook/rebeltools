<!--
COMPONENT: SMART ACTION 🙌
This component allows users to sign up for movements and events.
1. When signed in, it shows an action button. When clicked, this component emits an 'action-taken' event.
2. When logged out, it shows an email signup field. In the verification link sent to their email address, there are parameters stored related to the action that is being taken. In other words: any action taken is only stored once the user opens the verification link.
 -->
<template>
  <div>
    <q-card dark class="bg-secondary q-my-lg shadow-6">
      <q-card-section v-if="!signupDataLoaded || (!$store.state.currentUser.dataLoaded && !$store.state.auth.data.isAnonymous)" class="q-gutter-y-sm">
        <q-skeleton type="rect" height="28.8px"/>
        <q-skeleton type="text" height="20px"/>
        <q-skeleton type="text" height="20px"/>
        <q-skeleton type="QInput" class="q-mb-sm"/>
      </q-card-section>

      <transition name="fade">

        <q-card-section v-if="signupDataLoaded && ($store.state.currentUser.dataLoaded || $store.state.auth.data.isAnonymous)"  class="q-gutter-y-sm">
          <sign-up
            v-if="!signupData"
            :dataPath="signup.dataPath"
            :title="signup.title"
            :description="signup.description"
            :buttonLabel="signup.buttonLabel"
          />

          <create-profile v-else-if="!$store.state.currentUser.data.profileCreated"/>
          <share-page v-else/>
          <!-- <enable-notifications v-else-if="!actions['enable-notifications'].completed"/> -->
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
import { getFirestore, doc, onSnapshot } from 'firebase/firestore'
const db = getFirestore()

import SignUp from './actions/SignUp'
import CreateProfile from './actions/CreateProfile'
import SharePage from './actions/SharePage'

// import EnableNotifications from './actions/EnableNotifications'

export default {
  name: 'smart-action',
  components: {
    SignUp,
    CreateProfile,
    // EnableNotifications
    SharePage
  },
  props: {
    signup: {
      dataPath: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      buttonLabel: {
        type: String,
        default: 'Join us'
      }
    }
  },
  data () {
    return {
      signupDataLoaded: false,
      signupData: null,
      email: null
    }
  },
  mounted () {
    this.$nextTick(function () {
      onSnapshot(doc(db, this.signup.dataPath + '/signups/', this.$store.state.auth.data.uid), (doc) => {
        this.signupData = doc.data()
        this.signupDataLoaded = true
      })
    })
  }
}
</script>
<style scoped>
.fade-enter-active {
  transition: max-height .5s, opacity .3s;
  max-height: 500px;
  overflow: hidden
}

.fade-enter-from {
  max-height: 196.8px;
  opacity: .5;
}
</style>
