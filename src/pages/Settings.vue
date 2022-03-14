<!--
PAGE: SETTINGS 🛠
On this page, users can change their personal settings.

Path: /settings
 -->
<template>
  <div class="q-gutter-y-md">
    <h1>Settings</h1>
    <q-card>
      <q-card-section>
        <div class="q-gutter-y-sm">
          <div class="text-bold">Movement profile</div>
          <profile-picture-uploader v-if="$store.state.auth.dataLoaded"/>
          <q-input label="First name" outlined v-model="firstName" @blur="save()" color="secondary"/>
          <q-input label="Last name" outlined v-model="lastName" @blur="save()" color="secondary"/>
          <q-input label="☎️ Phone number" outlined v-model="phoneNumber" @blur="save()" color="secondary"/>
          <div class="text-caption q-mt-md">It is not yet possible to change your email or city.</div>
          <q-input label="✉️ Email address" outlined v-model="emailAddress" color="secondary" readonly/>
          <q-input label="📍 City" outlined v-if="location" v-model="location.city" color="secondary" readonly/>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import ProfilePictureUploader from 'components/ProfilePictureUploader'

export default {
  components: { ProfilePictureUploader },
  computed: {
    firstName: {
      get () { return this.$store.state.currentUser.data.firstName },
      set (value) { this.$store.commit('currentUser/update', { firstName: value }) }
    },
    lastName: {
      get () { return this.$store.state.currentUser.data.lastName },
      set (value) { this.$store.commit('currentUser/update', { lastName: value }) }
    },
    phoneNumber: {
      get () { return this.$store.state.currentUser.data.phoneNumber },
      set (value) { this.$store.commit('currentUser/update', { phoneNumber: value }) }
    },
    emailAddress: {
      get () { return this.$store.state.currentUser.data.emailAddress },
      set (value) { this.$store.commit('currentUser/update', { emailAddress: value }) }
    },
    location: {
      get () { return this.$store.state.currentUser.data.location },
      set (value) { this.$store.commit('currentUser/update', { location: value }) }
    }
  },
  methods: {
    save (event) {
      console.log(event)
      this.$store.dispatch('currentUser/pushToDatabase')
    }
  }
}
</script>
