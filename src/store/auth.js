/*
STORE MODULE: AUTHENTICATION 🔐
In this module, data is stored about the user this is currently signed in. This data is retrieved from the Firestore Authentication module.
*/
import { Notify } from 'quasar'
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, signOut } from 'firebase/auth'

import { getAnalytics, logEvent } from 'firebase/analytics'

export default {
  namespaced: true,
  state: {
    dataLoaded: false,
    data: null
  },
  mutations: {
    signin (state, newUser) {
      state.data = newUser
      state.dataLoaded = true
    }
  },
  actions: {

    /* 💌 SEND VERIFICATION EMAIL
    Docs: https://firebase.google.com/docs/auth/web/email-link-auth#send_an_authentication_link_to_the_users_email_address
    */
    sendVerificationEmail ({ state, commit }, email) {
      const auth = getAuth()

      const actionCodeSettings = {
        /* URL you want to redirect back to. The domain (www.example.com) for this URL must be in the authorized domains list in the Firebase Console. */
        url: window.location.href,
        handleCodeInApp: true
      }

      sendSignInLinkToEmail(auth, email, actionCodeSettings)
        .then(() => {
          /* ✅ SUCCESS: The link was successfully sent. Inform the user. Save the email locally so you don't need to ask the user for it again if they open the link on the same device. */
          window.localStorage.setItem('emailForSignIn', email)
          Notify.create({ message: 'Verification email sent', icon: 'mdi-email-check' })

          logEvent(getAnalytics(), 'verification_email_sent')

          return true
        })
        .catch((error) => {
          /* ❌ ERROR: Notify user of error (as a last resort). */
          Notify.create({ message: error.message, icon: 'mdi-alert' })

          throw new Error(error)
        })
    },

    /* 🔐 SIGN IN USING EMAIL LINK
    Docs: https://firebase.google.com/docs/auth/web/email-link-auth#completing_sign-in_in_a_web_page
    */
    async signInWithEmailLink () {
      const auth = getAuth()

      // Confirm the link is a sign-in with email link.
      if (isSignInWithEmailLink(auth, window.location.href)) {
        /* Additional state parameters can also be passed via URL. This can be used to continue the user's intended action before triggering the sign-in operation. */

        /* Get the email. This should be available if the user completes the flow on the same device where they started it. */
        let email = window.localStorage.getItem('emailForSignIn')

        if (!email) {
          /* LINK OPENED ON NEW DEVICE
          User opened the link on a different device. To prevent session fixation attacks, ask the user to provide the associated email again. For example: */
          email = window.prompt('Please provide your email for confirmation')

          // 👉 TO-DO: Make this more user friendly using Quasar dialog
        }

        // The client SDK will parse the code from the link for you.
        await signInWithEmailLink(auth, email, window.location.href)
          .then((result) => {
            /* ✅ SUCCESS
            - You can access the new user via result.user.
            - Additional user info profile not available via: result.additionalUserInfo.profile == null
            - You can check if the user is new or existing: result.additionalUserInfo.isNewUser */

            // Clear email from storage.
            window.localStorage.removeItem('emailForSignIn')

            // Notify the user that the login was succesful.
            Notify.create({ message: 'You are now signed in', icon: 'mdi-account-check' })

            logEvent(getAnalytics(), 'signin', {
              with: 'email-link'
            })

            return true
          })
          .catch((error) => {
            /* ❌ ERROR: Common errors could be invalid email and invalid or expired OTPs. */
            Notify.create({ message: error, icon: 'mdi-alert' })
          })
      }
    },

    /* 💔 SIGN OUT
    Docs: https://firebase.google.com/docs/reference/js/auth#signout
    */
    signOut ({ state, commit }) {
      const auth = getAuth()
      signOut(auth).then(() => {
        // Sign-out successful.
        logEvent(getAnalytics(), 'signout')
        window.location.reload()
      }).catch((error) => {
        // An error happened.
        Notify.create({ message: error, icon: 'mdi-alert' })
      })
    }

  }
}
