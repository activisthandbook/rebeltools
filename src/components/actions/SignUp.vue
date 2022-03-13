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
      <q-chip text-color="white" icon="mdi-account-group" class="q-ma-sm text-bold" style="background:rgba(255,255,255,.1)" v-if="actionCount > 1">
        <span class="q-mx-xs">{{ actionCount }}</span>
        <span>sign ups</span>
      </q-chip>
      <q-chip v-else icon="mdi-star" label="New event!" style="background:rgba(255,255,255,.1)" text-color="white" class="q-ma-sm"/>
      <div class="text-caption items-center flex" style="opacity:0.7">
        <q-btn icon="mdi-information" round flat dense size="sm" class="q-mr-xs">
          <q-popup-proxy class="q-pa-md" >
            <div style="max-width:210px">
              <div class="text-bold">Sign up with your Rebel Tools profile</div>
              <div  class="text-caption">By joining, you share your profile with the admins of this movement.</div>
              <q-btn icon="mdi-pencil" label="Edit profile" class="q-mt-sm" no-caps unelevated color="black"/><br/>
            </div>
          </q-popup-proxy>
        </q-btn>
          Sign up as
          <span v-if="$store.state.currentUser.data.firstName" class="q-ml-xs">
            {{ $store.state.currentUser.data.firstName }}
          </span>
          <span v-if="$store.state.currentUser.data.firstName && $store.state.auth.data.email" class="q-ml-xs">
            ({{$store.state.auth.data.email}}<span v-if="$store.state.currentUser.data.phoneNumber">, {{$store.state.currentUser.data.phoneNumber}}</span>)
          </span>

          <span v-else class="q-ml-xs">{{$store.state.auth.data.email}}</span>
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
    },
    actionCount: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      email: null,
      verificationEmailSent: false,
      loading: false
    }
  },
  methods: {
    sendVerificationEmail () {
      this.phase = 'verify-email'
      this.$store.dispatch('auth/sendVerificationEmail', {
        email: this.email,
        actionType: this.actionType,
        actionID: this.actionID,
        movementID: this.$store.state.currentMovement.data.id
      })
        .then(() => {
          this.verificationEmailSent = true
        })
    },
    async saveSignup () {
      // this.loading = true
      console.log(this.actionType)
      console.log(this.actionID)
      this.$store.dispatch('currentAction/addToDatabase', {
        actionType: this.actionType,
        actionID: this.actionID,
        movementID: this.$store.state.currentMovement.data.id
      })
    }

  }
}
</script>
