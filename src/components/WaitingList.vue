  <!-- TO-DO:
  STEP 1: ADD QUASAR COMPONENTS IN <TEMPLATE></TEMPLATE>
  Create a component that allows people to sign up for the Rebel Tools waiting list. This component will be shown on the homepage. It consists of the following elements:
  - A card, within which everything is wrapped.
  - An h2 heading saying 'Get started'
  - A paragraph saying 'Be the first to get access to Rebel Tools. Sign up for the waiting list:'
  - An input field for their first name
  - An input field for their email
  - An input field for their phone number
  - An input field for their organisation
  - A button to submit (labelled 'Join waiting list')

  STEP 2: VALIDATE USER INPUT WITH 'VUELIDATE'
  Each of the inputs needs to be validated (you should only be able to click the button once all fields are filled in.)
  - first name: required
  - email: required & is a valid email address
  - phone number: required
  - organisation: optional

  When someone clicks the button, the data needs to be sent to Firestore, into the collection 'waitinglist'. After the data has been added succesfully, show a different card saying their signup was succesful.

  Upate the Firestore security rules to allow anyone to add a document. Only the super admin should be able to read and update the documents. When creating a new document, the data needs to be validated again (see above for requirements.)
  -->

<template>

   <q-card>
    <q-card-section class="q-gutter-y-sm">
      <h2>Get Started</h2>
      <q-input
        label="First name"
        outlined
        color="secondary"
        v-model="waitingListItem.firstName"
        @blur="v$.waitingListItem.firstName.$touch"

        :error="v$.waitingListItem.firstName.$error"
        :errorMessage="mixin_mergeErrorMessages(v$.waitingListItem.firstName.$errors)"
      />

      <q-input
        label="Email address"
        outlined
        color="secondary"
        v-model="waitingListItem.emailAddress"
        @blur="v$.waitingListItem.emailAddress.$touch"

        :error="v$.waitingListItem.emailAddress.$error"
        :errorMessage="mixin_mergeErrorMessages(v$.waitingListItem.emailAddress.$errors)"
      />

      <q-input
        label="Phone number"
        outlined
        color="secondary"
        v-model="waitingListItem.phoneNumber"
        @blur="v$.waitingListItem.phoneNumber.$touch"

        :error="v$.waitingListItem.phoneNumber.$error"
        :errorMessage="mixin_mergeErrorMessages(v$.waitingListItem.phoneNumber.$errors)"
      />

      <q-input
        label="Organisation"
        outlined
        color="secondary"
        v-model="waitingListItem.organisation"

      />
      <q-btn
       color="secondary"
       no-caps
      label="Join waiting list"
      :disable="this.v$.waitingListItem.$invalid"
      @click="saveToWaitingList()"
    />
    </q-card-section>
  </q-card>

   <!--
     ADD COMPONENTS HERE
     Documentation: https://quasar.dev/vue-components
    -->

   <!-- EXAMPLE INPUT FIELD AND BUTTON WITH VALIDATION: -->
   <!--
     <q-input
       label="✉️ First name"
       v-model="waitingListItem.firstName"
       :error="this.v$.waitingListItem.emailAddress.$error"
       :errorMessage="mixin_mergeErrorMessages(this.v$.waitingListItem.emailAddress.$errors)"
    />
     <q-input
       label="✉️ Email address"
       v-model="waitingListItem.emailAddress"
       :error="this.v$.waitingListItem.emailAddress.$error"
       :errorMessage="mixin_mergeErrorMessages(this.v$.waitingListItem.emailAddress.$errors)"
     />
     <q-btn
       color="secondary"
       no-caps
      label="Join waiting list"
      :disable="this.v$.waitingListItem.$invalid"
      @click="saveToWaitingList()"
    />
  -->
<script>
// IMPORT EXTERNAL LIBRARIES LIKE THIS:
import useVuelidate from '@vuelidate/core'
import { required, helpers, email } from '@vuelidate/validators'

import { getFirestore, collection, addDoc } from 'firebase/firestore'
const db = getFirestore()

export default {

  // ACTIVATE VUELIDATE LIKE BELOW
  // Documentation: https://vuelidate-next.netlify.app/#getting-started-1

  setup () {
    return { v$: useVuelidate() }
  },

  // SAVE YOUR VARIABLES BELOW
  // Documentation: https://v3.vuejs.org/guide/data-methods.html#data-properties

  data () {
    return {
      waitingListItem: {
        emailAddress: '',
        firstName: '',
        phoneNumber: '',
        organisation: ''
      }
    }
  },
  validations () {
    return {
      waitingListItem: {
        firstName: {
          required: helpers.withMessage('Add your first name.', required)
        },
        emailAddress: {
          required: helpers.withMessage('Add your email address.', required),
          email: helpers.withMessage('Add a valid email address.', email)
        },
        phoneNumber: {
          required: helpers.withMessage('Add your phone number.', required)
        }
      }
    }
  }
}

export default {

// ACTIVATE VUELIDATE LIKE BELOW
// Documentation: https://vuelidate-next.netlify.app/#getting-started-1

setup () {
  return { v$: useVuelidate() }
},

// SAVE YOUR VARIABLES BELOW
// Documentation: https://v3.vuejs.org/guide/data-methods.html#data-properties

data () {
  return {
    something: 'asdf',
    waitingListItem: {
        emailAddress: '',
        dfa: 'sdf'
    }
  }
},

// DEFINE HOW EACH VARIABLE SHOULD BE VALIDATED
// Documentation: https://vuelidate-next.netlify.app/#getting-started-1

validations () {
  return {
    waitingListItem: {
      emailAddress: {
        required: helpers.withMessage('Add your email address.', required),
        email: helpers.withMessage('Not a valid email address.', email),
        $autoDirty: true
      }
    }
  }
},

// ADD YOUR METHOD FOR SAVING THE DATE IN FIRESTORE BELOW
// Documentation: https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document

// methods: {
//   saveToWaitingList () {
//     const waitingListReference = collection(db, 'waitingList')
//     addDoc(waitingListReference, this.waitingListItem)
//   }
// }

// Saving to the Firebase database won't actually work yet!
// You still need to update the security rules (see firestore.rules file)
// Documentation: https://firebase.google.com/docs/firestore/security/get-started

// }
</script>
