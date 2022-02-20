<template>
  <h2>Almost there...</h2>
  <!-- <div><span class="text-bold">Finish your Rebel Tools profile.</span> With your profile, you can easily sign up for movements, without having to fill in your details again.</div> -->
  <q-card flat class="text-black q-mt-md">
    <q-card-section>
      <div class="q-gutter-y-sm">
        <div class="text-bold">Finish your Rebel Tools profile.</div>
        <q-input
          label="👋 First name"
          type="fname"
          outlined
          bg-color="white"
          color="black"
          class="q-mb-sm "
          v-model="firstName"
          :error="this.v$.firstName.$error"
          :errorMessage="mixin_mergeErrorMessages(this.v$.firstName.$errors)"
        />
        <q-input
          label="☎️ Phone number"
          type="tel"
          outlined
          bg-color="white"
          color="black"
          class="q-mb-sm"
          v-model="phoneNumber"
          :error="this.v$.phoneNumber.$error"
          :errorMessage="mixin_mergeErrorMessages(this.v$.phoneNumber.$errors)"
        />
      </div>
      <div class="q-mt-sm q-gutter-sm items-center flex">
        <q-btn label="Save profile" no-caps color="secondary" class="q-my-xs q-mr-sm" :disable="this.v$.firstName.$invalid || this.v$.phoneNumber.$invalid" @click="finishAction()"/>

        <div class="text-caption q-my-xs text-bold">
          <q-btn icon="mdi-lock" round flat color="black" dense size="sm">
            <q-menu :offset="[0, 6]" class="q-pa-md">
              <div style="max-width:210px">
                <div class="text-bold">How profiles work</div>
                <div>Your profile is only shared with movements your sign up for. You can always edit your profile later.</div>
                <q-btn :to="{name: 'Privacy'}" label="Learn more" color="black" outline no-caps size="sm" class="q-mt-md" :disable="this.v$.firstName.$invalid || this.v$.phoneNumber.$invalid"/>
              </div>
            </q-menu>
          </q-btn>
          Only visible to movement admins.
        </div>

      </div>

    </q-card-section>
  </q-card>

</template>
<script>
import { getAnalytics, logEvent } from 'firebase/analytics'
const analytics = getAnalytics()

import useVuelidate from '@vuelidate/core'

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  validations () {
    return {
      firstName: this.$store.state.currentUser.validations.firstName,
      phoneNumber: this.$store.state.currentUser.validations.phoneNumber
    }
  },
  data () {
    return {
      options: [
        { label: 'Share my phone number (‭+31 6 57 70 48 83‬)', value: 'bat' },
        { label: 'Do not share', value: 'friend' }
      ],
      group: null
    }
  },
  computed: {
    firstName: {
      get () { return this.$store.state.currentUser.data.firstName },
      set (value) { this.$store.commit('currentUser/update', { firstName: value }) }
    },
    phoneNumber: {
      get () { return this.$store.state.currentUser.data.phoneNumber },
      set (value) { this.$store.commit('currentUser/update', { phoneNumber: value }) }
    }
  },
  methods: {
    finishAction () {
      this.$store.commit('currentUser/update', { profileCreated: true })
      this.$store.dispatch('currentUser/pushToDatabase')

      logEvent(analytics, 'user_profile_created')
    }
  }
}
</script>
