/*
STORE MODULE: CURRENT EVENT 🌊
In this module, data is stored on the current event that is viewed by the user.
*/

import { getFirestore, collection, query, where, onSnapshot, addDoc, serverTimestamp, doc, setDoc } from 'firebase/firestore'
import { required, helpers } from '@vuelidate/validators'

export default {
  namespaced: true,
  state: {
    dataLoaded: false,
    data: {},
    /* 🔴 IMPORTANT SECURITY NOTICE!
    The following validations only happen front-end, to provide a pleasant user experience. Make sure to validate all user input with the Firestore security rules as well!
    */
    validations: {
      title: {
        required: helpers.withMessage('Fill in a title for your event.', required),
        $autoDirty: true
      },
      date: {
        required: helpers.withMessage('Add a date.', required),
        $autoDirty: true
      },
      path: {
        required: helpers.withMessage('Add a URL path.', required),
        isPath: helpers.withMessage('Only use lowercase letters and numbers, with hyphens in between: my-event-path', helpers.regex(/^[a-z|0-9]+(-[a-z|0-9]+)*$/)),
        $autoDirty: true
      },
      description: {
        required: helpers.withMessage('Add a description.', required),
        $autoDirty: true
      }
    }
  },
  mutations: {
    update (state, eventData) {
      // Only update the fields that were changed
      state.data = Object.assign(state.data, eventData)
      state.dataLoaded = true
    }
  },
  actions: {
    fetchFromDatabase ({ rootState, commit }, eventID) {
      const q = query(collection(getFirestore(), 'calendar'), where('path', '==', eventID))

      onSnapshot(q, (querySnapshot) => {
        const events = []
        querySnapshot.forEach((doc) => {
          events.push({
            ...doc.data(),
            id: doc.id
          })
        })
        commit('update', events[0])
      })
    },
    async addToDatabase ({ commit }, event) {
      await addDoc(collection(getFirestore(), 'calendar'), {
        createdAt: serverTimestamp(),
        ...event
      }).then(() => {
        return true
      })
    },
    async pushToDatabase ({ state }) {
      const currentEventRef = doc(getFirestore(), 'calendar', state.data.id)

      await setDoc(currentEventRef, state.data, { merge: true })
    }
  }
}
