/*
STORE MODULE: CURRENT MOVEMENT 🌊
In this module, data is stored on the current movement that is viewed by the user.
*/

import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore'
import { setCssVar } from 'quasar'

export default {
  namespaced: true,
  state: {
    data: {
      name: null,
      path: null,
      primaryColor: null,
      secondaryColor: null,
      headline: null,
      description: null,
      primaryAction: {
        title: null,
        description: null
      }
    }
  },
  mutations: {
    update (state, movementData) {
      // Only update the fields that were changed
      state.data = Object.assign(state.data, movementData)
    }
  },
  actions: {
    fetchFromDatabase ({ state, commit }, movementID) {
      const q = query(collection(getFirestore(), 'movements'), where('path', '==', movementID))

      onSnapshot(q, (querySnapshot) => {
        const movements = []
        querySnapshot.forEach((doc) => {
          movements.push(doc.data())
        })
        commit('update', movements[0])

        // DYNAMICALLY CHANGE COLOURS
        setCssVar('primary', state.data.primaryColor)
        setCssVar('secondary', state.data.secondaryColor)
        setCssVar('accent', '#FFF8DB')
        setCssVar('dark', '#000000')
      })
    }
    // pushToDatabase ({ rootState }, userData) {
    //   const currentUserRef = doc(getFirestore(), 'users', rootState.auth.user.uid)

    //   updateDoc(currentUserRef, userData)
    // }
  }
}
