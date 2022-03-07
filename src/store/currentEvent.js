/*
STORE MODULE: CURRENT EVENT 🌊
In this module, data is stored on the current event that is viewed by the user.
*/
import { Notify } from 'quasar'

import { getFirestore, collection, query, where, onSnapshot, addDoc, serverTimestamp, limit } from 'firebase/firestore'
import { required, helpers } from '@vuelidate/validators'

export default {
  namespaced: true,
  state: {
    dataLoaded: false,
    data: {},
    unsubscribe: null,
    error: null,
    /* 🔴 IMPORTANT SECURITY NOTICE!
    The following validations only happen front-end, to provide a pleasant user experience. Make sure to validate all user input with the Firestore security rules as well!
    */
    validations: {
      title: {
        required: helpers.withMessage('Fill in a title for your event.', required),
        $autoDirty: true
      },
      address: {
        required: helpers.withMessage('Add an address', required),
        $autoDirty: true
      },
      onlineLink: {
        required: helpers.withMessage('Add a video call link', required),
        $autoDirty: true
      },
      startDate: {
        required: helpers.withMessage('Add a starting date.', required),
        $autoDirty: true
      },
      endDate: {
        required: helpers.withMessage('Add a ending date.', required),
        $autoDirty: true
      },
      path: {
        required: helpers.withMessage('Add a URL path.', required),
        isPath: helpers.withMessage('Only use lowercase letters and numbers, with hyphens in between: my-event-path', helpers.regex(/^[a-z|0-9]+(-[a-z|0-9]+)*$/)),
        $autoDirty: true
      },
      callToAction: {
        required: helpers.withMessage('Add a call to action.', required),
        $autoDirty: true
      },
      description: {
        required: helpers.withMessage('Add a description.', required),
        $autoDirty: true
      },
      prepare: {
        $autoDirty: true
      },
      followUp: {
        $autoDirty: true
      },
      document: {
        // TO DO: Validate that it is link
        $autoDirty: true
      }
    }
  },
  mutations: {
    update (state, eventData) {
      // Only update the fields that were changed
      state.data = Object.assign(state.data, eventData)
      state.dataLoaded = true
    },
    storeError (state, error) {
      state.error = error
      state.dataLoaded = true
    },
    registerSubscription (state, subscription) {
      state.unsubscribe = subscription
    },
    destroy (state) {
      state.dataLoaded = false
      state.data = {}
      state.unsubscribe()
    }
  },
  actions: {
    subscribeToDatabase ({ state, rootState, commit }, eventPath) {
      const q = query(
        collection(getFirestore(), 'calendar'),
        where('movementID', '==', rootState.currentMovement.data.id),
        where('path', '==', eventPath),
        limit(1)
      )
      console.log(q)
      commit('registerSubscription', onSnapshot(
        q,
        (querySnapshot) => {
          const events = []

          if (querySnapshot.docs[0]) {
            querySnapshot.forEach((doc) => {
              events.push({
                ...doc.data(),
                id: doc.id
              })
            })
            commit('update', events[0])
          } else {
            commit('storeError', 'event-not-found')
            Notify.create({
              message: 'Event not found',
              icon: 'mdi-alert'
            })
          }
        },
        (error) => {
          // In case of error
          console.log(error)
          commit('storeError', error)
          Notify.create({
            message: error + ' (currentEvent.js)',
            icon: 'mdi-alert'
          })
        }
      ))
    },
    async addToDatabase ({ commit }, event) {
      await addDoc(collection(getFirestore(), 'calendar'), {
        createdAt: serverTimestamp(),
        ...event
      }).then(() => {
        return true
      })
    }
  }
}
