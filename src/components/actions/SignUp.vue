<template>

  <div v-if="!verificationEmailSent" class="q-gutter-y-sm">

    <h2>{{ title }}</h2>
    <div v-if="description">{{ description }}</div>

    <!-- LOADING: Show while user state is not known yet. -->
    <q-skeleton type="QInput" v-if="!$store.state.auth.dataLoaded"/>

    <!-- INPUT: Show if the user is not signed in. -->
    <q-input
      label="✉️ Email address"
      color="black"
      bg-color="white"
      outlined
      class="shadow-8 q-mb-sm"
      v-model="email"
      v-if="$store.state.auth.dataLoaded && $store.state.auth.data.isAnonymous"
      @keyup.enter="sendVerificationEmail()"
    >
      <template v-slot:append>
        <q-btn icon="mdi-arrow-right" color="secondary" round @click="sendVerificationEmail()">
          <q-tooltip>Sign up</q-tooltip>
        </q-btn>
      </template>
    </q-input>

    <!-- BUTTON: Show if the user is already signed in. -->
    <div class="q-gutter-sm items-center q-mt-md" v-if="$store.state.auth.dataLoaded && $store.state.auth.data.emailVerified">
      <q-btn :label="buttonLabel" color="white" text-color="primary" unelevated class="shadow-12 q-my-none" icon="mdi-check-circle-outline" rounded no-caps @click="saveSignup()" :loading="loading"/>
      <q-chip color="white" icon="mdi-account-group" class="text-bold q-my-sm" size="sm" outline square>
        24 others
      </q-chip>
      <div class="text-caption items-center flex" style="opacity:0.7">
        <q-btn icon="mdi-information" round flat dense size="sm" class="q-mr-xs">
          <q-popup-proxy class="q-pa-md" >
            <div style="max-width:210px">
              <div class="text-bold">Sign up as Joppe</div>
              <div>joppehoekstra@icloud.com</div>
              <div>+31 6 57 70 48 83</div>
              <q-btn icon="mdi-pencil" label="Edit profile" class="q-mt-sm" no-caps unelevated color="black"/><br/>
              <div  class="text-caption q-mt-md">By joining, you share your profile with the admins of this movement.</div>
              <q-btn :to="{name: 'Privacy'}" label="Learn more" color="black" outline no-caps size="sm"/>
            </div>
          </q-popup-proxy>
        </q-btn>
          Sign up with your Rebel Tools profile.
      </div>

    </div>

  </div>

  <q-item class="q-py-md q-mt-none" v-if="verificationEmailSent">
    <q-item-section>
      <h2>Check your email!</h2>
    <div>To confirm, click the Rebel Tools verification link.</div>
    </q-item-section>
    <q-item-section side>
      <q-icon name="mdi-email" size="52px" color="white">
      </q-icon>
    </q-item-section>
  </q-item>

</template>
<script>
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'
const db = getFirestore()

export default {
  props: {
    actionType: {
      type: String,
      required: true
    },
    actionID: {
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
  },
  data () {
    return {
      email: null,
      verificationEmailSent: false,
      loading: false
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.$store.dispatch('auth/signInWithEmailLink')
    })
  },
  methods: {
    sendVerificationEmail () {
      this.phase = 'verify-email'
      this.$store.dispatch('auth/sendVerificationEmail', this.email)
        .then((success) => {
          this.verificationEmailSent = true
        })
    },
    async saveSignup () {
      this.loading = true

      await addDoc(collection(db, 'actions'), {
        actionType: this.actionType,
        actionID: this.actionID,
        userID: this.$store.state.auth.data.uid,
        movementID: this.$store.state.currentMovement.data.id,
        createdAt: serverTimestamp()
      }).then(() => {
        this.loading = false
        this.$q.notify({ message: 'Signup succesful', icon: 'mdi-check' })
      })
    }

  }
}
</script>
