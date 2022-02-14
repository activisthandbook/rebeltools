<template>

  <q-card>
    <q-card-section class="q-gutter-y-sm" v-if="!userHasSignedUp">
      <h2>Get Started</h2>
      <p>Be the first to get access to Rebel Tools. Sign up for the waiting list:</p>
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
    <q-card-section v-else>
      <h2>Thank you for signing up, {{waitingListItem.firstName}}!</h2>
      <p>In the meantime, check out one of our other projects, Activist Handbook, the Wikipedia for activists</p>
      <q-btn label="Visit Activist Handbook" href="https://www.activisthandbook.org/en/home" no-caps color="secondary"/>
    </q-card-section>
  </q-card>
</template>
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
      userHasSignedUp: false,
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
  },
  methods: {
    saveToWaitingList () {
      const waitingListReference = collection(db, 'waitinglist')
      addDoc(waitingListReference, this.waitingListItem)
      this.userHasSignedUp = true
    }
  }
}
</script>
