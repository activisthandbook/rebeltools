<template>
  <h2>Almost done...</h2>
  <!-- <div><span class="text-bold">Finish your Rebel Tools profile.</span> With your profile, you can easily sign up for movements, without having to fill in your details again.</div> -->
  <q-card flat class="text-black q-mt-md">
    <q-card-section>
      <div class="q-gutter-y-sm">
        <div class="text-bold" @click="getLocation()">Create Rebel Tools profile </div>

        <q-input
          label="💬 First name"
          type="fname"
          outlined
          bg-color="white"
          color="black"
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
          v-model="phoneNumber"
          :error="this.v$.phoneNumber.$error"
          :errorMessage="mixin_mergeErrorMessages(this.v$.phoneNumber.$errors)"
        />
        <!-- <q-chip square label="Rotterdam" icon-right="mdi-pencil" class="q-mx-none" color="grey-2"/> -->
        <q-banner class="bg-grey-3 rounded-borders flex">
          <q-avatar icon="mdi-account" color="secondary" text-color="white" size="64px" class="q-mr-md"/>
          <q-btn icon="mdi-upload" label="Upload picture" no-caps color="white" text-color="secondary"/>
        </q-banner>

        <q-checkbox v-model="acceptPrivacyPolicy" class="text-body2 non-selectable" color="secondary">
          <div class="q-ml-sm">
            <span class="text-bold">Accept privacy policy.</span> <span class="text-grey-8">Name and profile picture are public. Phone number is only shared with movement admins.</span>
          </div>
        </q-checkbox>

        <q-btn label="Continue" no-caps color="secondary" class="q-mt-md q-mr-sm" :disable="this.v$.firstName.$invalid || this.v$.phoneNumber.$invalid" @click="finishAction()"/>
          <!-- <q-icon name="mdi-lock" round flat color="black" dense size="xs" class="q-ml-sm"/> -->
          <!-- <div class="col q-ml-sm"> <strong>Privacy: </strong>Name and profile picture are public. Phone number is only shared with movement admins.</div> -->
      </div>
      <!-- <q-btn label="Continue" no-caps color="secondary" class="q-my-xs q-mr-sm" :disable="this.v$.firstName.$invalid || this.v$.phoneNumber.$invalid" @click="finishAction()"/> -->

    </q-card-section>
  </q-card>
  <!-- <q-card class="text-black">
    <q-card-section>
      <div class="text-bold">Private info</div>
      <div class="q-my-xs text-bold">
        <q-btn icon="mdi-lock" round flat color="black" dense size="sm">
          <q-menu :offset="[0, 6]" class="q-pa-md">
            <div style="max-width:240px">
              <div class="text-bold">How profiles work</div>
              <div>Your profile is only shared with admins of the movements your sign up for. You can always edit your profile later.</div>
              <q-btn :to="{name: 'Privacy'}" label="Privacy policy" color="black" outline no-caps size="sm" class="q-mt-md"/>
            </div>
          </q-menu>
        </q-btn>
        Only visible to movement admins.
      </div>
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
        <q-input
          label="📍 City"
          outlined
          bg-color="white"
          color="black"
          class="q-mb-sm"
        />
    </q-card-section>
  </q-card> -->
</template>
<script>
import { getAnalytics, logEvent } from 'firebase/analytics'
const analytics = getAnalytics()

import { httpsCallable } from 'firebase/functions'

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
  mounted: function () {
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
    })
  },
  data () {
    return {
      acceptPrivacyPolicy: false,
      location: 'Rotterdam, Netherlands',
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
    },
    getLocation () {
      const getLocation = httpsCallable(this.$store.state.firebase.functions, 'getLocation')
      getLocation({ text: 'test' })
        .then((result) => {
          const data = result.data
          console.log(data)
          this.$store.commit('currentUser/update', {
            location: data
          })
        })
      // const url = 'https://europe-west1-rebel-tools.cloudfunctions.net/getLocation'

      // fetch(url).then(resp => {
      //   return resp.json()
      // }).then(data => {
      //   console.log(data)
      // })
    }
  }
}
</script>
