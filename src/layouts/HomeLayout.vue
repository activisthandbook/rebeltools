<!--
LAYOUT: HOME 🏡
This layout is used for public pages meant to motivate people to start using Rebel Tools.

Path: /*
 -->
<template>
  <q-layout view="hHh lpR fFf">

    <q-header bordered class="bg-white text-black non-selectable">
      <q-toolbar>
          <q-avatar square @click="$router.push({name: 'Home'})" class="cursor-pointer">
            <img src="../assets/logo.svg">
          </q-avatar>
        <q-toolbar-title @click="$router.push({name: 'Home'})" class="cursor-pointer">
          Rebel Tools
        </q-toolbar-title>
        <q-btn icon="mdi-github" label="Contribute" outline no-caps @click="openExternal('https://github.com/activisthandbook/rebeltools')"/>
      </q-toolbar>
    </q-header>

    <q-page-container class="flex justify-center">
      <q-page padding class="q-pt-lg q-pb-xl full-width">
        <router-view />
      </q-page>
    </q-page-container>

  </q-layout>
</template>
<script>
import { openURL } from 'quasar'

export default {
  methods: {
    openExternal: (link) => {
      openURL(link)
    }
  }
}
</script>
<style scoped>
.q-page{
  max-width: 640px;
}
</style>
