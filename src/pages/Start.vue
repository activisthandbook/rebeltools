<template>
  <q-card>
    <q-card-section v-if="phase == 'sign-in'">
      <h2>Get started</h2>
      <q-input type="email" outlined label="Email address" v-model="email"/>
      <q-btn @click="sendVerificationEmail" label="Sign in"/>
    </q-card-section>
    <q-card-section v-if="phase == 'verify-email'">
      <h2>Check your email</h2>
      <p>We just need to verify it's really you.</p>
    </q-card-section>
  </q-card>
</template>
<script>
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'

export default {
  data () {
    return {
      phase: 'sign-in',
      email: 'joppehoekstra@icloud.com'
    }
  },
  mounted () {
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered

      if (this.$store.state.auth.user.emailVerified) {
        // We are already signed in.
        this.$router.push({ name: 'Home' })
      } else {
        // We are not signed in yet
        this.signin()
      }
    })
  },
  methods: {

    sendVerificationEmail () {
      const auth = getAuth()
      const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: window.location.href,
        handleCodeInApp: true
      }

      sendSignInLinkToEmail(auth, this.email, actionCodeSettings)
        .then(() => {
          // The link was successfully sent. Inform the user.
          // Save the email locally so you don't need to ask the user for it again
          // if they open the link on the same device.
          window.localStorage.setItem('emailForSignIn', this.email)
          this.phase = 'verify-email'
        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message
          console.log(errorMessage)
        })
    },

    signin () {
      // Confirm the link is a sign-in with email link.
      const auth = getAuth()
      if (isSignInWithEmailLink(auth, window.location.href)) {
        // Additional state parameters can also be passed via URL.
        // This can be used to continue the user's intended action before triggering
        // the sign-in operation.
        // Get the email if available. This should be available if the user completes
        // the flow on the same device where they started it.
        let email = window.localStorage.getItem('emailForSignIn')
        if (!email) {
          // User opene d the link on a different device. To prevent session fixation
          // attacks, ask the user to provide the associated email again. For example:
          email = window.prompt('Please provide your email for confirmation')
        }
        // The client SDK will parse the code from the link for you.
        signInWithEmailLink(auth, email, window.location.href)
          .then((result) => {
            // Clear email from storage.
            window.localStorage.removeItem('emailForSignIn')
            // You can access the new user via result.user
            // Additional user info profile not available via:
            // result.additionalUserInfo.profile == null
            // You can check if the user is new or existing:
            // result.additionalUserInfo.isNewUser
          })
          .catch((error) => {
            // Some error occurred, you can inspect the code: error.code
            // Common errors could be invalid email and invalid or expired OTPs.
            console.log(error)
          })
      }
    }

  }

}
</script>
