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
          <h2>Movement profile</h2>
          <q-input label="First name" outlined v-model="firstName" @blur="save()"/>
          <q-input label="Last name" outlined v-model="lastName" @blur="save()"/>
          <q-input label="☎️ Phone number" outlined v-model="phoneNumber" @blur="save()"/>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>

export default {
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
    }
  },
  methods: {
    save () {
      this.$store.dispatch('currentUser/pushToDatabase')
    }
  }
}
</script>
