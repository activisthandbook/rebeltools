<!--
PAGE: SETTINGS 🛠
On this page, users can change their personal settings.

Path: /settings
 -->
<template>
  <h1>Settings</h1>
  <q-input label="First name" outlined v-model="firstName" @blur="save()"/>
  <q-input label="Last name" outlined v-model="lastName" @blur="save()"/>
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
    }
  },
  methods: {
    updateLocally (e) {
      this.$store.commit('currentUser/update', e.target.value)
    },
    save () {
      this.$store.dispatch('currentUser/pushToDatabase')
    }
  }
}
</script>
