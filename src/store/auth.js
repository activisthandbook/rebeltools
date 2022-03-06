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
    data: null,
    signedInWithEmailLink: false
  },
  mutations: {
    signin (state, newUser) {
      state.data = newUser
      state.dataLoaded = true
      // console.log(newUser)
    },
    signedInWithEmailLink (state) {
      state.signedInWithEmailLink = true
    },
    destroy (state) {
      state.dataLoaded = false
      state.data = null
    }
  },
  actions: {

    /* 💌 SEND VERIFICATION EMAIL
    Docs: https://firebase.google.com/docs/auth/web/email-link-auth#send_an_authentication_link_to_the_users_email_address
    */
    sendVerificationEmail ({ state, commit }, data) {
      const auth = getAuth()

      // console.log(window.location.origin + '/verify?continue=' + window.location.pathname)

      const actionCodeSettings = {
        /* URL you want to redirect back to. The domain (www.example.com) for this URL must be in the authorized domains list in the Firebase Console. */
        // url: window.location.href,
        url: window.location.origin + '/verify?continue=' + window.location.pathname + '&actionType=' + data.actionType + '&actionID=' + data.actionID + '&movementID=' + data.movementID,
        handleCodeInApp: true
      }

      sendSignInLinkToEmail(auth, data.email, actionCodeSettings)
        .then(() => {
          /* ✅ SUCCESS: The link was successfully sent. Inform the user. Save the email locally so you don't need to ask the user for it again if they open the link on the same device. */
          window.localStorage.setItem('emailForSignIn', data.email)
          Notify.create({ message: 'Verification email sent', icon: 'mdi-email-check' })

          logEvent(getAnalytics(), 'verification_email_sent')

          return true
        })
        .catch((error) => {
          /* ❌ ERROR: Notify user of error (as a last resort). */
          Notify.create({
            message: error.message + ' (auth.js)',
            icon: 'mdi-alert'
          })

          throw new Error(error)
        })
    },

    /* 🔐 SIGN IN USING EMAIL LINK
    Docs: https://firebase.google.com/docs/auth/web/email-link-auth#completing_sign-in_in_a_web_page
    */
    async signInWithEmailLink ({ state, commit }) {
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
            commit('signedInWithEmailLink')

            // Notify the user that the login was succesful.
            Notify.create({ message: 'You are now signed in', icon: 'mdi-account-check' })

            logEvent(getAnalytics(), 'signin', {
              with: 'email-link'
            })

            return true
          })
          .catch((error) => {
            /* ❌ ERROR: Common errors could be invalid email and invalid or expired OTPs. */
            Notify.create({
              message: error + ' (auth.js)',
              icon: 'mdi-alert'
            })
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
        commit('destroy')
        // window.location.reload()
      }).catch((error) => {
        // An error happened.
        Notify.create({
          message: error + ' (auth.js)',
          icon: 'mdi-alert'
        })
      })
    }

  }
}
