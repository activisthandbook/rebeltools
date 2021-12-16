import { boot } from 'quasar/wrappers'
import { initializeApp } from 'firebase/app'
import { getAnalytics, logEvent } from 'firebase/analytics'
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth'

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
  logEvent(analytics, 'test-a')

  const auth = getAuth()

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      store.commit('auth/signin', user)
      console.log(user)
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
