<template>

  <q-card>
    <q-card-section v-if="!userHasSignedUp">
      <div class="q-gutter-y-sm">

        <h2>Sign up</h2>
        <div>Be the first to get access to Rebel Tools. Sign up for the waiting list! Right now, we are only allowing a small group of beta testers.</div>
        <q-input
          label="💬 First name"
          placeholder="Greta"

          outlined
          stack-label
          color="secondary"
          v-model="waitingListItem.firstName"
          @blur="v$.waitingListItem.firstName.$touch"

          :error="v$.waitingListItem.firstName.$error"
          :errorMessage="mixin_mergeErrorMessages(v$.waitingListItem.firstName.$errors)"
        />

        <q-input
          label="📧 Email address"
          placeholder="my@email.com"

          v-show="waitingListItem.firstName"
          outlined
          stack-label
          color="secondary"
          v-model="waitingListItem.emailAddress"
          @blur="v$.waitingListItem.emailAddress.$touch"

          :error="v$.waitingListItem.emailAddress.$error"
          :errorMessage="mixin_mergeErrorMessages(v$.waitingListItem.emailAddress.$errors)"
        />

        <q-input
          label="☎️ Phone number"
          placeholder="+00 00 12345678"
          v-show="waitingListItem.firstName && waitingListItem.emailAddress"

          outlined
          stack-label
          color="secondary"
          v-model="waitingListItem.phoneNumber"
          @blur="v$.waitingListItem.phoneNumber.$touch"

          :error="v$.waitingListItem.phoneNumber.$error"
          :errorMessage="mixin_mergeErrorMessages(v$.waitingListItem.phoneNumber.$errors)"
        />

        <q-input
          label="👋 About you (optional)"
          placeholder="Tell us a bit about yourself! Are you involved with any activist movements?"
          type="textarea"
          v-show="waitingListItem.firstName  && waitingListItem.emailAddress  && waitingListItem.phoneNumber"

          stack-label
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

      </div>
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
    async saveToWaitingList () {
      const waitingListReference = collection(db, 'waitingList')
      await addDoc(waitingListReference, this.waitingListItem).then(() => {
        this.$q.notify({ message: 'Signed up for waiting list', icon: 'mdi-check' })
        this.userHasSignedUp = true
      }).catch(() => {
        this.$q.notify({ message: 'Oops, something went wrong', icon: 'mdi-alert' })
      })
    }
  }
}
</script>
