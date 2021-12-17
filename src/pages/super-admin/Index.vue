<!--
PAGE: SUPER ADMIN HOMEPAGE 🔴
This page is for administrators of the Rebel Tools platform. It allows them to get an overview of everything that users do.

Path: /super-admin
 -->
<template>
  <h1>Movements</h1>
  <q-list bordered>
    <q-item v-for="(movement, index) in movements" :key="index" :to="'/' + movement.path">
      <q-item-section>
        <q-item-label>{{ movement.name }}</q-item-label>
        <q-item-label caption lines="2">/{{ movement.path }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-btn icon="mdi-delete" flat round color="red"/>
      </q-item-section>
    </q-item>
  </q-list>
  <h1>Users</h1>
  <q-list bordered>
    <q-item v-for="(user, index) in users" :key="index">
      <q-item-section>
        <q-item-label>{{ user.firstName }} {{ user.lastName }}</q-item-label>
        <!-- <q-item-label caption lines="2">/{{ movement.path }}</q-item-label> -->
      </q-item-section>
      <q-item-section side>
        <q-btn icon="mdi-delete" flat round color="red"/>
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script>
import { getFirestore, collection, query, onSnapshot } from 'firebase/firestore'

export default {
  data () {
    return {
      movements: [],
      users: []
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.fetchMovementsFromDatabase()
      this.fetchUsersFromDatabase()
    })
  },
  methods: {
    fetchMovementsFromDatabase () {
      const q = query(collection(getFirestore(), 'movements'))

      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.movements.push(doc.data())
        })
      })
    },
    fetchUsersFromDatabase () {
      const q = query(collection(getFirestore(), 'users'))

      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.users.push(doc.data())
        })
      })
    }
  }
}
</script>
