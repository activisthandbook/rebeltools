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
            <img src="../assets/logo.svg" alt="Logo Rebel Tools">
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
        <footer class="text-body-2 q-gutter-y-md text-grey-8 q-mt-xl">
          <q-separator class="q-my-lg"/>
          <h2>Rebel Tools</h2>
          <div>
            <router-link to="/privacy" class="text-grey-8">Privacy</router-link> |
            <a href="https://github.com/activisthandbook/rebeltools/blob/main/LICENSE.md" class="text-grey-8">License</a>
          </div>
          <div class="q-gutter-y-sm">
            <div class="text-bold">Comparing with other platforms</div>
            <div><router-link to="/actionnetwork" class="text-grey-8">Action Network</router-link></div>
            <!-- <div><router-link to="/nationbuilder" class="text-grey-8">Nation Builder</router-link></div>
            <div><router-link to="/changeorg" class="text-grey-8">Change.org</router-link></div>
            <div><router-link to="/changeorg" class="text-grey-8">Wordpress</router-link></div> -->
          </div>
        </footer>
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
