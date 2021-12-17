/*
STORE MODULE: CURRENT USER 🙋‍♀️
In this module, data is stored about the user this is currently signed in. This data is retrieved from the Firestore 'users' collection.
*/

import { getFirestore, doc, onSnapshot, setDoc } from 'firebase/firestore'

export default {
  namespaced: true,
  state: {
    data: {
      firstName: null,
      lastName: null,
      anonymousUser: true
    }
  },
  mutations: {
    update (state, userData) {
      state.data = Object.assign(state.data, userData)
    }
  },
  actions: {
    fetchFromDatabase ({ rootState, commit }) {
      const currentUserRef = doc(getFirestore(), 'users', rootState.auth.user.uid)

      onSnapshot(currentUserRef, (doc) => {
        commit('update', doc.data())
      })
    },
    pushToDatabase ({ state, rootState }) {
      const currentUserRef = doc(getFirestore(), 'users', rootState.auth.user.uid)

      setDoc(currentUserRef, state.data, { merge: true })
    }
  }
}
