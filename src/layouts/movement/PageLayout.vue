<!--
LAYOUT: MOVEMENT 🌊
This layout is used for all public movement pages (their homepage, events, community, etc).

Path: /:movementPath/*
 -->
<template>

  <div v-if="!this.$store.state.currentMovement.dataLoaded">
    <q-layout>
      <q-header class="bg-grey-2" bordered>
        <q-toolbar>
        </q-toolbar>
      </q-header>
      <q-page-container>
        <div class="fixed-center text-center">
          <q-circular-progress
            color="grey"
            indeterminate
            size="50px"
            class="q-ma-md"
          />
          <div class="text-grey">
            Loading movement...
          </div>
        </div>
      </q-page-container>
    </q-layout>
  </div>

  <q-layout view="hHr lpR fFr" v-else>
    <q-header class="bg-primary" bordered>
      <q-toolbar class="justify-between">

        <q-toolbar-title @click="$router.push({name: 'Movement'})" class="cursor-pointer">
          {{ movementName }}
        </q-toolbar-title>

        <q-btn dense flat round icon="mdi-menu" @click="rightDrawerOpen = true"/>

      </q-toolbar>
    </q-header>

    <q-drawer v-model="rightDrawerOpen" side="right" overlay behavior="mobile" elevated :width="280">
        <q-list class="q-mt-md">
          <q-item><h2>{{ movementName }}</h2></q-item>

          <q-item clickable v-ripple :to="{name: 'Movement'}" exact active-class="text-primary">
            <q-item-section avatar>
              <q-icon name="mdi-home" />
            </q-item-section>

            <q-item-section>
              Home
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple :to="{name: 'Events'}" active-class="text-primary">
            <q-item-section avatar>
              <q-icon name="mdi-calendar"/>
            </q-item-section>

            <q-item-section>
              Events
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple active-class="text-primary" :to="{name: 'Community'}">
            <q-item-section avatar>
              <q-icon name="mdi-account-group"/>
            </q-item-section>

            <q-item-section>
              Community
            </q-item-section>
          </q-item>

        </q-list>

        <q-separator inset class="q-mt-lg"/>

        <div class="q-mx-md q-mt-lg" v-if="$store.state.auth.dataLoaded && isAnonymous">
          <div class="q-mb-md text-bold">Already a member?</div>
          <q-btn label="Sign in" no-caps color="primary" :to="{name: 'Start'}"/>
        </div>

        <div class="q-mx-md q-my-lg" v-else-if="$store.state.auth.dataLoaded">
          <div class="q-mb-md text-bold">Welcome back<span v-if="$store.state.currentUser.data.firstName">, {{ $store.state.currentUser.data.firstName }}</span>!</div>
          <div class="q-gutter-sm">
            <q-btn label="Dashboard" icon="mdi-rocket-launch" color="primary" :to="{name: 'Dashboard'}" v-if="movementAdmins.includes($store.state.auth.data.uid)" no-caps/>

            <q-btn label="Sign out" color="primary" outline no-caps @click="$store.dispatch('auth/signOut')"/>
          </div>
          <div class="q-mt-lg" v-if="isSuperADMIN">
            <div class="q-mb-sm">You have superpowers, use them wisely 🌟</div>
            <q-btn icon="mdi-shield-check" label="Super admin" outline color="primary" :to="{name: 'Super admin'}" no-caps/>
          </div>
        </div>

    </q-drawer>

    <q-page-container class="flex justify-center">
      <q-page padding class="q-pt-lg q-gutter-y-md">
        <router-view />
        <p class="text-caption text-center q-mt-xl text-grey-6">Made with <span @click="$router.push('/')" class="cursor-pointer text-bold">Rebel Tools</span></p>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',
  data () {
    return {
      rightDrawerOpen: false
    }
  },
  computed: {
    movementName: {
      get () { return this.$store.state.currentMovement.data.name }
    },
    movementAdmins: {
      get () { return this.$store.state.currentMovement.data.admins }
    },
    isAnonymous: {
      get () { return this.$store.state.auth.data.isAnonymous }
    },
    isSuperADMIN: {
      get () { return this.$store.state.currentUser.data.isSuperADMIN }
    }
  }
})
</script>
<style scoped>
.q-page{
  max-width: 640px;
  width: 100%
}
.q-list .q-router-link--active, .q-list .q-router-link--exact-active {
  font-weight: 700;
}
</style>
