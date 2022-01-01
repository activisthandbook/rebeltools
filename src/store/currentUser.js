/*
STORE MODULE: CURRENT USER 🙋‍♀️
In this module, data is stored about the user this is currently signed in. This data is retrieved from the Firestore 'users' collection.
*/

import { getFirestore, doc, onSnapshot, setDoc } from 'firebase/firestore'
import { required, helpers } from '@vuelidate/validators'

export default {
  namespaced: true,
  state: {
    dataLoaded: false,
    data: {},
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
    }
  },
  actions: {
    fetchFromDatabase ({ rootState, commit }) {
      const currentUserRef = doc(getFirestore(), 'users', rootState.auth.data.uid)

      onSnapshot(currentUserRef, (doc) => {
        commit('update', doc.data())
      })
    },
    pushToDatabase ({ state, rootState }) {
      const currentUserRef = doc(getFirestore(), 'users', rootState.auth.data.uid)

      setDoc(currentUserRef, state.data, { merge: true })
    }
  }
}
