<!--
PAGE: SUPER ADMIN HOMEPAGE 🔴
This page is for administrators of the Rebel Tools platform. It allows them to get an overview of everything that users do.

Path: /super-admin
 -->
<template>
  <h1>Movements</h1>
  <q-list bordered separator>
    <q-item v-for="(movement, index) in movements" :key="index">
      <q-item-section>
        <q-item-label>{{ movement.name }}</q-item-label>
        <q-item-label caption lines="2">/{{ movement.path }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-btn icon="mdi-eye" label="Open" outline text-color="black" :to="'/' + movement.path"/>
      </q-item-section>
      <q-item-section side>
        <q-btn icon="mdi-delete" flat round color="red" @click="deleteMovement(movement)"/>
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
    </q-item>
  </q-list>
</template>
<script>
import { getFirestore, collection, query, onSnapshot, doc, deleteDoc } from 'firebase/firestore'

const db = getFirestore()

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
      const q = query(collection(db, 'movements'))

      onSnapshot(q, (querySnapshot) => {
        const movements = []
        querySnapshot.forEach((doc) => {
          movements.push(doc.data())
          movements[movements.length - 1].id = doc.id
        })
        this.movements = movements
      })
    },
    deleteMovement (movement) {
      this.$q.dialog({
        title: 'Do you want to delete ' + movement.name + '?',
        message: 'This action cannot be undone!',
        persistent: true,
        ok: {
          label: 'Delete',
          color: 'red'
        },
        cancel: {
          color: 'black',
          flat: true
        }
      }).onOk(async () => {
        await deleteDoc(doc(db, 'movements', movement.id))
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    fetchUsersFromDatabase () {
      const q = query(collection(db, 'users'))

      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.users.push(doc.data())
        })
      })
    }
  }
}
</script>
