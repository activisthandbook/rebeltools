<!--
PAGE: NEW MOVEMENT 🌊
On this page, users can create a new movement.

Path: /new-movement
 -->
<template>
  <div  class="q-gutter-y-md">
    <h1>New movement</h1>
    <p>Create your own movement page using Rebel Tools.</p>
    <q-card>
      <q-card-section>
        <div class="q-gutter-sm">
          <div class="text-bold">📢 What would you like to call your movement?</div>
          <input-name v-model="newMovement.name" />
          <input-path v-model="newMovement.path"/>
        </div>
      </q-card-section>
    </q-card>
    <q-card>
      <q-card-section>
        <div class="q-gutter-sm">
          <div class="text-bold">🎨 Customise your theme.</div>
          <input-color label="Primary color" v-model="newMovement.primaryColor"/>
          <input-color label="Secondary color" v-model="newMovement.secondaryColor"/>
        </div>
      </q-card-section>
    </q-card>
    <q-btn label="Create movement" @click="createMovement()" no-caps icon-right="mdi-arrow-right" :loading="loading" :disable="!newMovement.name || !newMovement.path || !newMovement.primaryColor || !newMovement.secondaryColor" v-bind:style="{ background: newMovement.primaryColor }" text-color="white">
       <template v-slot:loading>
        Creating...
      </template>
    </q-btn>
  </div>
</template>
<script>
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'

// COMPONENTS
import inputName from '../components/movement/inputName'
import inputPath from '../components/movement/inputPath'
import inputColor from '../components/movement/inputColor'

export default {
  components: {
    inputName,
    inputPath,
    inputColor
  },
  data () {
    return {
      loading: false,
      newMovement: {
        name: null,
        path: null,
        primaryColor: '#0431EA',
        secondaryColor: '#D70057',
        admins: null,
        headline: "We're awesome rebels",
        description: "And we're here to change the world. You should most definitely join us.",
        primaryAction: {
          title: 'Join us',
          description: "We'd love to get to know you."
        }
      }
    }
  },
  methods: {
    createMovement () {
      this.loading = true
      this.newMovement.admins = [this.$store.state.auth.user.uid]
      addDoc(collection(getFirestore(), 'movements'), {
        createdAt: serverTimestamp(),
        ...this.newMovement
      }).then(() => {
        this.loading = false
        this.$router.push('/' + this.newMovement.path)
      })
    },
    test (event) {
      console.log(event)
    }
  }
}
</script>
