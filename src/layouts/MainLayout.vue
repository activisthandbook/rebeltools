<template>
  <q-layout view="hHr lpR fFr" class="">
    <q-header class="bg-secondary" >
      <q-toolbar>

        <q-toolbar-title @click="$router.push('/')" class="cursor-pointer">
          Activist Handbook
        </q-toolbar-title>

        <q-btn dense flat round icon="mdi-menu" @click="toggleRightDrawer">
          <q-tooltip>Menu</q-tooltip>
        </q-btn>

      </q-toolbar>
    </q-header>

    <q-drawer v-model="rightDrawerOpen" side="right" overlay behavior="mobile" elevated>
        <q-list>
          <q-item-label header>Activist Handbook</q-item-label>

          <q-item clickable v-ripple class="text-bold" :to="'/'" exact>
            <q-item-section avatar active-class="text-primary">
              <q-icon name="mdi-home" />
            </q-item-section>

            <q-item-section>
              Home
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple class="text-bold" :to="'events'" active-class="text-primary">
            <q-item-section avatar>
              <q-icon name="mdi-calendar"/>
            </q-item-section>

            <q-item-section>
              Events
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple active-class="text-primary">
            <q-item-section avatar>
              <q-icon name="mdi-account-group"/>
            </q-item-section>

            <q-item-section class="text-bold">
              Community
            </q-item-section>
          </q-item>
        </q-list>
        <!-- <div class="q-mx-md q-mt-lg">
          <h2 class="q-mb-md">Already a member?</h2>
          <p>Access the dashboard with your account:</p>
          <q-btn label="Log in" color="primary"/>
        </div> -->
        <div class="q-mx-md q-mt-lg">
          <h2 class="q-mb-md">Welcome back, Joppe!</h2>
          <p>Open the dashboard to manage your movement:</p>
          <div class="q-gutter-sm">
            <q-btn label="Dashboard" icon="mdi-view-dashboard" color="primary" :to="'dashboard'"/>
            <!-- <q-btn label="Admin" icon="mdi-database-cog" color="primary"/> -->
            <q-btn label="Sign out" color="primary" outline/>
          </div>

        </div>

    </q-drawer>

    <q-page-container class="flex justify-center">
      <q-page padding class="q-py-lg">
        <router-view />
      </q-page>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-fab
              icon="mdi-forum"
              color="secondary"
            >

            </q-fab>
          </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script>

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  setup () {
    const rightDrawerOpen = ref(false)

    return {
      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  }
})
</script>
<style>
.q-page{
  max-width: 640px;
}
</style>
