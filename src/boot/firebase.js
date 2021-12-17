import { boot } from 'quasar/wrappers'
import { initializeApp } from 'firebase/app'
import { getAnalytics, logEvent } from 'firebase/analytics'
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'

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
  // something to do
  const app = initializeApp(firebaseConfig)

  const analytics = getAnalytics(app)

  // Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
  // key is the counterpart to the secret key you set in the Firebase console.
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('6LckPKsdAAAAALrvsVbXnI-j5doL4S_792D7jpb0'),

    // Optional argument. If true, the SDK automatically refreshes App Check
    // tokens as needed.
    isTokenAutoRefreshEnabled: true
  })

  const auth = getAuth()

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User

      store.commit('auth/signin', user) // Store the user data in Vuex

      if (!store.state.auth.user.isAnonymous) {
        store.dispatch('currentUser/fetchFromDatabase') // Fetch additional data from database
      }

      logEvent(analytics, 'signin')
      // ...
    } else {
      logEvent(analytics, 'logout')
      signInAnonymously(auth)
        .then(() => {
          // Signed in..
        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message
          console.log(errorMessage)
        })
    }
  })
})
