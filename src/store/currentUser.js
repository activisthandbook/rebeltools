/*
STORE MODULE: CURRENT USER 🙋‍♀️
In this module, data is stored about the user this is currently signed in. This data is retrieved from the Firestore 'users' collection.
*/
import { Notify } from 'quasar'

import { getFirestore, doc, onSnapshot, setDoc } from 'firebase/firestore'
import { required, helpers } from '@vuelidate/validators'

export default {
  namespaced: true,
  state: {
    dataLoaded: false,
    data: {
      isSuperADMIN: false
    },
    unsubscribe: null,
    validations: {
      firstName: {
        required: helpers.withMessage('Add your name.', required),
        $autoDirty: true
      },
      phoneNumber: {
        required: helpers.withMessage('Add your phone number.', required),
        $autoDirty: true
      }
    }
  },
  mutations: {
    update (state, userData) {
      // Only update the fields that were changed
      state.data = Object.assign(state.data, userData)
      state.dataLoaded = true
    },
    addSubscription (state, subscription) {
      state.unsubscribe = subscription
    },
    destroy (state) {
      state.dataLoaded = false
      state.data = {}
      state.unsubscribe()
    }
  },
  actions: {
    subscribeToDatabase ({ rootState, commit }) {
      const currentUserRef = doc(getFirestore(), 'users', rootState.auth.data.uid)

      onSnapshot(
        currentUserRef,
        (doc) => {
          commit('update', doc.data())
        },
        (error) => {
          Notify.create({
            message: error + ' (currentUser.js)',
            icon: 'mdi-alert'
          })
        }
      )
    },
    pushToDatabase ({ state, rootState }) {
      const currentUserRef = doc(getFirestore(), 'users', rootState.auth.data.uid)

      setDoc(currentUserRef, state.data, { merge: true }).then(() => {
        Notify.create({ message: 'Profile saved', icon: 'mdi-check' })
      }).catch(error => {
        Notify.create({
          message: error + ' (currentUser.js)',
          icon: 'mdi-alert'
        })
      })
    }
  }
}
