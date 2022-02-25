<!--
PAGE: SUPER ADMIN HOMEPAGE 🔴
This page is for administrators of the Rebel Tools platform. It allows them to get an overview of everything that users do.

Path: /super-admin
 -->
<template>
  <h1>Movements</h1>
  <q-card>
    <q-list separator>
    <q-item v-for="(movement, index) in movements" :key="index">
      <q-item-section>
        <q-item-label>{{ movement.name }}</q-item-label>
        <q-item-label caption lines="2">/{{ movement.path }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-btn icon="mdi-link" round flat no-caps :to="'/' + movement.path" dense/>
      </q-item-section>
      <q-item-section side>
        <q-btn icon="mdi-pencil" round flat no-caps @click="$router.push({ name: 'Dashboard', params: { movementID: movement.path } })" dense/>
      </q-item-section>
      <q-item-section side>
        <q-btn icon="mdi-delete" flat round @click="deleteMovement(movement)" dense/>
      </q-item-section>
    </q-item>
  </q-list>
  </q-card>
  <h1>Users</h1>
  <q-card>
    <q-list separator>
      <q-item v-for="(user, index) in users" :key="index">
        <q-item-section>
          <q-item-label>{{ user.firstName }} {{ user.lastName }}</q-item-label>
          <!-- <q-item-label caption lines="2">/{{ movement.path }}</q-item-label> -->
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
  <h1>Waiting list</h1>
  <q-card>
    <q-list separator>
      <q-item v-for="(waitingUser, index) in waitingList" :key="index">
        <q-item-section>
          <q-item-label>{{ waitingUser.firstName }} <span v-if="waitingUser.organisation">from {{ waitingUser.organisation }}</span></q-item-label>
          <q-item-label caption>{{ waitingUser.emailAddress }}</q-item-label>
          <q-item-label caption>{{ waitingUser.phoneNumber }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>
<script>
import { getFirestore, collection, query, onSnapshot, doc, deleteDoc } from 'firebase/firestore'

const db = getFirestore()

export default {
  data () {
    return {
      movements: [],
      users: [],
      waitingList: []
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.fetchMovementsFromDatabase()
      this.fetchUsersFromDatabase()
      this.fetchWaitingListFromDatabase()
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
        title: 'Danger zone 😰',
        message: "Are you sure you want to delete this movement? Type '" + movement.name + "' to confirm:",
        persistent: true,
        prompt: {
          model: '',
          isValid: val => val === movement.name,
          type: 'text'
        },
        ok: {
          label: 'Delete permanently',
          icon: 'mdi-delete',
          noCaps: true
        },
        cancel: {
          color: 'black',
          flat: true,
          noCaps: true
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
    },
    fetchWaitingListFromDatabase () {
      const q = query(collection(db, 'waitingList'))

      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.waitingList.push(doc.data())
        })
      })
    }
  }
}
</script>
