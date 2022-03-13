/*
STORE: MAIN FILE 📂
In this file, the Vuex is initialised.

Documentation:
- https://vuex.vuejs.org/
- https://quasar.dev/quasar-cli/vuex-store
*/

import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

import firebase from './firebase'
import auth from './auth'
import currentUser from './currentUser'
import currentMovement from './currentMovement'
import currentEvent from './currentEvent'
import currentAction from './currentAction'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      firebase,
      auth,
      currentUser,
      currentMovement,
      currentEvent,
      currentAction
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })
  return Store
})
