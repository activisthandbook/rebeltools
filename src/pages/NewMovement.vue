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
        <p class="text-bold">📢 What would you like to call your movement?</p>
        <q-input label="Name of movement" placeholder="Climate Justice Now!" outlined v-model="newMovement.name" required/>
        <q-input label="URL Path" placeholder="climate-justice-now" outlined v-model="newMovement.path" hint="Only use lowercase letters and dashes (my-movement)." class="q-mt-md" required/>
      </q-card-section>
    </q-card>
    <q-card>
      <q-card-section>
        <p class="text-bold">🎨 Customise your theme.</p>
        <q-input label="Primary colour" outlined v-model="newMovement.primaryColor" :rules="['anyColor']">
          <template v-slot:append>
            <q-btn icon="mdi-palette" class="cursor-pointer" v-bind:style="{ background: newMovement.primaryColor }" text-color="white">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-color v-model="newMovement.primaryColor" />
              </q-popup-proxy>
            </q-btn>
          </template>
        </q-input>
        <q-input label="Secondary colour" outlined v-model="newMovement.secondaryColor" :rules="['anyColor']">
          <template v-slot:append>
            <q-btn icon="mdi-palette" class="cursor-pointer" v-bind:style="{ background: newMovement.secondaryColor }" text-color="white">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-color v-model="newMovement.secondaryColor" />
              </q-popup-proxy>
            </q-btn>
          </template>
        </q-input>
      </q-card-section>
    </q-card>
    <q-btn label="Create movement" @click="createMovement()" no-caps color="primary" icon-right="mdi-arrow-right" :loading="loading" :disable="!newMovement.name || !newMovement.path || !newMovement.primaryColor || !newMovement.secondaryColor">
       <template v-slot:loading>
        Creating...
      </template>
    </q-btn>
  </div>
</template>
<script>
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { ref } from 'vue'

export default {
  data () {
    return {
      loading: false,
      newMovement: {
        name: null,
        path: null,
        primaryColor: ref('#0431EA'),
        secondaryColor: ref('#D70057'),
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
    }
  }
}
</script>
