<!--
COMPONENT: SMART ACTION 🙌
This component allows users to sign up for movements and events.
1. When signed in, it shows an action button. When clicked, this component emits an 'action-taken' event.
2. When logged out, it shows an email signup field. In the verification link sent to their email address, there are parameters stored related to the action that is being taken. In other words: any action taken is only stored once the user opens the verification link.
 -->
<template>
  <div>
    <q-card dark class="bg-secondary q-my-lg shadow-6">
      <q-card-section class="q-gutter-y-sm" v-if="phase == 'action'">
        <h2>{{ title }}</h2>
        <div v-if="description">{{ description }}</div>

        <!-- LOADING: Show while user state is not known yet. -->
        <q-skeleton type="QInput" v-if="!$store.state.auth.user"/>

        <!-- INPUT: Show if the user is not signed in. -->
        <q-input label="✉️ Email address" color="black" bg-color="white" outlined class="shadow-8 q-mb-sm" v-model="email" v-if="$store.state.auth.user && $store.state.auth.user.isAnonymous">
          <template v-slot:append>
            <q-btn icon="mdi-arrow-right" color="secondary" round @click="sendVerificationEmail">
              <q-tooltip>Sign up</q-tooltip>
            </q-btn>
          </template>
        </q-input>

        <!-- BUTTON: Show if the user is already signed in. -->
        <div class="q-gutter-sm items-center" v-if="$store.state.auth.user && $store.state.auth.user.emailVerified">
          <q-btn :label="actionlabel" color="white" text-color="primary" unelevated class="shadow-12 q-my-sm" icon="mdi-check-circle-outline" rounded no-caps @click="signupButtonClicked()"/>
          <q-chip color="white" icon="mdi-account-group" class="text-bold q-my-sm" size="sm" outline square>
            {{ actionpeople }} others
          </q-chip>
        </div>

      </q-card-section>

      <q-card-section v-if="phase == 'verify-email'">
        <q-item class="q-py-md">
          <q-item-section>
            <h2>Check your email!</h2>
          <div>To confirm, click the Rebel Tools verification link.</div>
          </q-item-section>
          <q-item-section side>
            <q-icon name="mdi-email" size="52px" color="white">
            </q-icon>
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
    <q-dialog v-model="showNotificationsDialog" persistent>
      <q-card style="max-width: 400px">
        <q-card-section class="row items-center q-gutter-sm">
          <div class="text-bold">Would you like to receive our updates?</div>
          <div>We'll let you know whenever we're organising something cool.</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Maybe later" color="primary" no-caps v-close-popup />
          <q-btn label="Turn on notifications" color="primary" no-caps v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  name: 'smart-action',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    actionlabel: {
      type: String,
      default: 'Join us'
    },
    actionpeople: {
      type: Number,
      default: 0
    },
    actionparams: {
      type: String
    }
  },
  data () {
    return {
      showNotificationsDialog: false,
      phase: 'action',
      email: null,
      action: false
    }
  },
  mounted () {
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
      this.signin()
    })
  },
  methods: {

    signupButtonClicked () {
      this.$emit('signup')

      this.showNotificationsDialog = true
    },

    sendVerificationEmail () {
      this.phase = 'verify-email'
      this.$store.dispatch('auth/sendVerificationEmail', this.email)
        .then((success) => {
          this.phase = 'verify-email'
        })
    },

    async signin () {
      await this.$store.dispatch('auth/signInWithEmailLink')
        .then(() => {
          this.$emit('signup')
        })
        .catch(() => {
          // Do nothing
        })
    }

  }

}
</script>
