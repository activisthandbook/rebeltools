/*
STORE MODULE: CURRENT MOVEMENT 🌊
In this module, data is stored on the current movement that is viewed by the user.
*/

import { Notify, setCssVar } from 'quasar'
import { getFirestore, collection, query, where, onSnapshot, addDoc, serverTimestamp, doc, setDoc } from 'firebase/firestore'
import { required, helpers } from '@vuelidate/validators'

import ColorContrastChecker from 'color-contrast-checker'
function hasEnoughContrast (value) {
  const ccc = new ColorContrastChecker()
  return ccc.isLevelAA(value, '#fff', 18)
}

export default {
  namespaced: true,
  state: {
    dataLoaded: false,
    data: {},
    /* 🔴 IMPORTANT SECURITY NOTICE!
    The following validations only happen front-end, to provide a pleasant user experience. Make sure to validate all user input with the Firestore security rules as well!
    */
    validations: {
      name: {
        required: helpers.withMessage('Fill in a name for your movement.', required),
        $autoDirty: true
      },
      path: {
        required: helpers.withMessage('Add a URL path.', required),
        isPath: helpers.withMessage('Only use lowercase letters and numbers, with hyphens in between: my-movement-path', helpers.regex(/^[a-z|0-9]+(-[a-z|0-9]+)*$/)),
        $autoDirty: true
      },
      headline: {
        required: helpers.withMessage('Add a headline for your page.', required),
        $autoDirty: true
      },
      primaryColor: {
        // 👉 TO-DO: Add some contrast validation here: https://www.npmjs.com/package/color-contrast-checker
        required: helpers.withMessage('Add a color code.', required),
        isColor: helpers.withMessage('Add a valid HEX color code.', helpers.regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/)),
        hasEnoughContrast: helpers.withMessage('Use more contrast.', hasEnoughContrast),
        $autoDirty: true
      },
      secondaryColor: {
        required: helpers.withMessage('Add a color code.', required),
        isColor: helpers.withMessage('Add a valid HEX color code.', helpers.regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/)),
        hasEnoughContrast: helpers.withMessage('Use more contrast.', hasEnoughContrast),
        $autoDirty: true
      },
      description: {
        required: helpers.withMessage('Add a description.', required),
        $autoDirty: true
      }
    }
  },
  mutations: {
    update (state, movementData) {
      // Only update the fields that were changed
      state.data = Object.assign(state.data, movementData)
      state.dataLoaded = true
    },
    addSubscription (state, subscription) {
      state.unsubscribe = subscription
    },
    destroy (state) {
      state.dataLoaded = false
      state.data = {}
      state.unsubscribe()
      console.log('movement destroyed')
    }
  },
  actions: {
    async fetchFromDatabase ({ state, commit }, movementPath) {
      // Only if we haven't yet loaded this movement's data, will we open up a new subscription
      if (state.data.path !== movementPath) {
        commit('addSubscription', onSnapshot(
          query(collection(getFirestore(), 'movements'), where('path', '==', movementPath)),

          (querySnapshot) => {
            const movements = []

            if (querySnapshot.docs[0]) {
              querySnapshot.forEach((doc) => {
                movements.push({
                  ...doc.data(),
                  id: doc.id
                })
              })

              commit('update', movements[0])

              // DYNAMICALLY CHANGE COLOURS
              setCssVar('primary', state.data.primaryColor)
              setCssVar('secondary', state.data.secondaryColor)
              setCssVar('accent', '#FFF8DB')
              setCssVar('dark', '#000000')
            } else {
              commit('update', { notFound: true })
            }
          },
          (error) => {
            // In case of error
            Notify.create({
              message: error + ' (currentMovement.js)',
              icon: 'mdi-alert'
            })
          }
        ))
      }
    },
    async addToDatabase ({ commit }, movement) {
      await addDoc(collection(getFirestore(), 'movements'), {
        createdAt: serverTimestamp(),
        ...movement
      }).then(() => {
        return true
      })
    },
    async pushToDatabase ({ state }) {
      const currentMovementRef = doc(getFirestore(), 'movements', state.data.id)

      await setDoc(currentMovementRef, state.data, { merge: true })
    }
  }
}
