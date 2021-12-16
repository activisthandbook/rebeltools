<template>
  <h1>Settings</h1>
  <q-input label="First name" outlined v-model="currentUser.firstName" @blur="updateUser()"/>
  <q-input label="Last name" outlined v-model="currentUser.lastName" @blur="updateUser()"/>
</template>
<script>
import { getFirestore, doc, onSnapshot, updateDoc } from 'firebase/firestore'

const currentUserRef = doc(getFirestore(), 'users', 'id123')

export default {
  data () {
    return {
      currentUser: {
        firstName: null,
        lastName: null
      }
    }
  },
  mounted () {
    this.$nextTick(function () {
      onSnapshot(currentUserRef, (doc) => {
        this.currentUser = doc.data()
      })
    })
  },
  methods: {
    updateUser () {
      updateDoc(currentUserRef, this.currentUser)
    }
  }
}
</script>
