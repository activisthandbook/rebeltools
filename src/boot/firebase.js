import { boot } from 'quasar/wrappers'
import { initializeApp } from 'firebase/app'
import { getAnalytics, logEvent, setUserId } from 'firebase/analytics'
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import { getPerformance } from 'firebase/performance'

import { Notify } from 'quasar'

// When hosting yourself, make sure to edit this configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAcEwD4BWj11X_sHNX8WMntp_XgiblsVk0',
  authDomain: 'rebel-tools.firebaseapp.com',
  databaseURL: 'https://rebel-tools.firebaseio.com',
  projectId: 'rebel-tools',
  storageBucket: 'rebel-tools.appspot.com',
  messagingSenderId: '30586848052',
  appId: '1:30586848052:web:96aaf411c4e364e05b5b61',
  measurementId: 'G-WH3GBH0P1V'
}

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ store }) => {
  // ..

  /* 🔥 INITIALISE FIREBASE
  Docs: https://firebase.google.com/docs/web/setup
  */
  const app = initializeApp(firebaseConfig)

  /* 📈 INITIALISE GOOGLE ANALYTICS
  Docs: https://firebase.google.com/docs/analytics
  */
  const analytics = getAnalytics(app)

  /* 🔐 FIREBASE AUTHENTICATION
  Docs: https://firebase.google.com/docs/auth
  */
  const auth = getAuth()

  onAuthStateChanged(auth, (user) => {
    if (user) {
      /* SIGNIN SUCCESFUL ✅
      User is signed in, see docs for a list of available properties:
      https://firebase.google.com/docs/reference/js/firebase.User */

      // Store the user data in Vuex
      store.commit('auth/signin', user)

      if (!store.state.auth.data.isAnonymous) {
        // Fetch additional data from database
        store.dispatch('currentUser/fetchFromDatabase')
      }

      /* Future logged events will be linked to the user ID:
      https://firebase.google.com/docs/analytics/userid */
      setUserId(analytics, user.uid)
    } else {
      /* NOT SIGNED IN ❌
      This may seem a bit counterintuitive, but we always want to make sure users are signed in. Even if they don't have an account, we will sign them in, but with an anonymous Firebase account. */
      signInAnonymously(auth)
        .then(() => {
          // Signed in with anonymous account
        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message
          Notify.create(errorMessage)
        })

      // Log 'signout' event to analytics
      logEvent(analytics, 'signout')

      // ..
    }
  })

  /* 📶 OFFLINE PERSISTANCE FIRESTORE
  Docs: https://firebase.google.com/docs/firestore/manage-data/enable-offline
  */
  enableIndexedDbPersistence(getFirestore())
    .catch((err) => {
      if (err.code === 'failed-precondition') {
        /* Multiple tabs open, persistence can only be enabled in one tab at a a time. */
      } else if (err.code === 'unimplemented') {
        /* The current browser does not support all of the features required to enable persistence */
      }
    })

  /* 🤖 RECAPTCHA APP CHECK
  Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this key is the counterpart to the secret key you set in the Firebase console.
  Docs: https://firebase.google.com/docs/app-check
  */
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('6LckPKsdAAAAALrvsVbXnI-j5doL4S_792D7jpb0'),

    /* Optional argument. If true, the SDK automatically refreshes App Check tokens as needed. */
    isTokenAutoRefreshEnabled: true
  })

  /* 🤖 PERFORNANCE MONITORING
  Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this key is the counterpart to the secret key you set in the Firebase console.
  Docs: https://firebase.google.com/docs/app-check
  */
  getPerformance(app)
})
