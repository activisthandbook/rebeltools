<template>
  <q-layout view="hHr lpR fFr" class="">
    <q-header class="bg-primary" >
      <q-toolbar>

        <q-toolbar-title @click="$router.push({name: 'Dashboard'})" class="cursor-pointer">
          Dashboard
        </q-toolbar-title>

        <q-btn outline label="Open page" icon="mdi-eye" :to="{name: 'Movement'}"/>

      </q-toolbar>
      <q-tabs inline-label outside-arrows>
        <q-route-tab icon="mdi-home" label="Home" :to="{name: 'Dashboard'}" />
        <q-route-tab icon="mdi-account-group" label="Community" :to="{name: 'Dashboard Community'}"/>
        <q-route-tab icon="mdi-calendar" label="Calendar" :to="{name: 'Dashboard Calendar'}"/>
        <q-route-tab icon="mdi-file-document" label="Page" :to="{name: 'Dashboard Page'}"/>
        <q-space />
         <q-separator vertical inset dark />
        <q-route-tab icon="mdi-apps" label="Apps" :to="{name: 'Dashboard Apps'}" alert="secondary"/>
      </q-tabs>
    </q-header>

    <q-page-container class="flex justify-center">
      <q-page padding class="q-pt-lg q-gutter-y-md full-width">
        <router-view />
        <p class="text-caption text-center q-mt-xl text-grey-6">Made with <span @click="$router.push('/')" class="cursor-pointer text-bold">Rebel Tools</span></p>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>

import { ref } from 'vue'

export default {
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
}
</script>
<style>
.q-page{
  max-width: 640px;
}
</style>
