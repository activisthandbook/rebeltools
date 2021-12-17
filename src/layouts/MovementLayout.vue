<!--
LAYOUT: MOVEMENT 🌊
This layout is used for all public movement pages (their homepage, events, community, etc).

Path: /:movementID/*
 -->
<template>

  <div v-if="!movementName" class="fixed-center text-center">
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

  <q-layout view="hHr lpR fFr" v-else>
    <q-header class="bg-secondary" >
      <q-toolbar>

        <q-toolbar-title @click="$router.push({name: 'Movement'})" class="cursor-pointer">
          {{ movementName }}
        </q-toolbar-title>

        <q-btn dense flat round icon="mdi-menu" @click="rightDrawerOpen = true">
          <q-tooltip>Menu</q-tooltip>
        </q-btn>

      </q-toolbar>
    </q-header>

    <q-drawer v-model="rightDrawerOpen" side="right" overlay behavior="mobile" elevated>
        <q-list>
          <q-item-label header>{{ movementName }}</q-item-label>

          <q-item clickable v-ripple class="text-bold" :to="{name: 'Movement'}" exact>
            <q-item-section avatar active-class="text-primary">
              <q-icon name="mdi-home" />
            </q-item-section>

            <q-item-section>
              Home
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple class="text-bold" :to="{name: 'Events'}" active-class="text-primary">
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

            <q-item-section class="text-bold">
              Community
            </q-item-section>
          </q-item>
        </q-list>

        <div class="q-mx-md q-mt-lg" v-if="isAnonymous">
          <h2 class="q-mb-md">Already a member?</h2>
          <p>Access the dashboard with your account:</p>
          <q-btn label="Log in" color="primary"/>
        </div>

        <div class="q-mx-md q-mt-lg" v-else>
          <h2 class="q-mb-md">Welcome back, {{ firstName }}!</h2>
          <p v-if="movementAdmins.includes(userUID)">Open the dashboard to manage your movement:</p>
          <div class="q-gutter-sm">
            <q-btn label="Dashboard" icon="mdi-view-dashboard" color="primary" :to="{name: 'Dashboard'}" v-if="movementAdmins.includes(userUID)"/>
            <q-btn label="Admin" color="primary" v-if="isSuperADMIN" :to="{name: 'Super admin'}"/>
            <q-btn label="Sign out" color="primary" outline/>
          </div>
        </div>

    </q-drawer>

    <q-page-container class="flex justify-center">
      <q-page padding class="q-pt-lg q-gutter-y-md">
        <router-view />
        <p class="text-caption text-center q-mt-xl text-grey-6">Made with <span @click="$router.push('/')" class="cursor-pointer text-bold">Rebel Tools</span></p>
      </q-page>
      <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="movementAdmins.includes(userUID)">
          <q-btn icon="mdi-pencil" color="secondary" fab :to="{name: 'Dashboard'}"/>
        </q-page-sticky>
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
    userUID: {
      get () { return this.$store.state.auth.user.uid }
    },
    firstName: {
      get () { return this.$store.state.currentUser.data.firstName }
    },
    isAnonymous: {
      get () { return this.$store.state.auth.user.isAnonymous }
    },
    isSuperADMIN: {
      get () { return this.$store.state.currentUser.data.isSuperADMIN }
    }
  }
})
</script>
<style>
.q-page{
  max-width: 640px;
  width: 100%
}
</style>
